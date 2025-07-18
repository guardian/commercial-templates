import argparse
import os
import tempfile
from dotenv import load_dotenv
import json
from googleads import ad_manager, common, oauth2
import datetime
from termcolor import cprint

load_dotenv()

template_dir = os.path.realpath(
    os.path.join(os.path.dirname(os.path.abspath(__file__)),
                 "../../build-static")
)

config = {
    "application_name": os.environ.get("GAM_APPLICATION_NAME"),
    "network_code": os.environ.get("GAM_NETWORK_CODE")
}
html_prefix = "<!-- DO NOT EDIT -- FILE GENERATED AND DEPLOYED AUTOMATICALLY FROM https://github.com/guardian/commercial-templates ON {} -->".format(
    datetime.datetime.now().strftime("%m/%d/%Y")
)
css_prefix = "/* DO NOT EDIT -- FILE GENERATED AND DEPLOYED AUTOMATICALLY FROM https://github.com/guardian/commercial-templates ON {} */".format(
    datetime.datetime.now().strftime("%m/%d/%Y")
)

# Uploads a native style template to GAM given a directory name
def upload_template(
    native_style_service: common.GoogleSoapService, root: str, dir: str
):
    # Check for required files and report specific missing files
    required_files = ["ad.json", "index.html", "style.css"]
    missing_files = []

    for file in required_files:
        file_path = os.path.join(root, dir, file)
        if not os.path.exists(file_path):
            missing_files.append(file)

    if missing_files:
        cprint(
            '[!] ERROR: Template "%s" is missing required files: %s. All templates must have ad.json, index.html, and style.css for automatic deployment to GAM.'
            % (dir, ", ".join(missing_files)),
            "red",
        )
        return False
    try:
        info_json = open(os.path.join(root, dir, "ad.json"), "r").read()
        html = open(os.path.join(root, dir, "index.html"), "r").read()
        css = open(os.path.join(root, dir, "style.css"), "r").read()
    except Exception as e:
        cprint(
            '[!] ERROR: Failed to read files for template "%s": %s'
            % (dir, str(e)),
            "red",
        )
        return False

    try:
        templateInfo = json.loads(info_json)
    except json.JSONDecodeError as e:
        cprint(
            '[!] ERROR: Invalid JSON in ad.json for template "%s": %s'
            % (dir, str(e)),
            "red",
        )
        return False

    # Validate required fields in ad.json
    if "nativeStyleId" not in templateInfo:
        cprint(
            '[!] ERROR: Template "%s" ad.json is missing required field "nativeStyleId"'
            % dir,
            "red",
        )
        return False

    if not templateInfo["nativeStyleId"]:
        cprint(
            '[!] ERROR: Template "%s" ad.json has empty "nativeStyleId"'
            % dir,
            "red",
        )
        return False

    html = html_prefix + html
    css = css_prefix + css

    statement = ad_manager.StatementBuilder(
        version="v202505", where="id = %s" % templateInfo["nativeStyleId"]
    )

    response = native_style_service.getNativeStylesByStatement(
        statement.ToStatement())

    if "results" in response and len(response["results"]):
        style = response["results"][0]
        cprint(
            '[✔️] Native style "%s" with ID "%d" was found for template "%s".'
            % (style["name"], style["id"], dir),
            "green",
        )
        style["htmlSnippet"] = html
        style["cssSnippet"] = css

        print('[i] Updating native style "%s".' % (style["name"]))
        try:
            native_style_service.updateNativeStyles([style])
        except Exception as e:
            cprint("[!] Error updating native style: %s" % e, "red")
            return False

        cprint('[✔️] Native style "%s" was updated.' %
               (style["name"]), "green")
        return True
    else:
        cprint(
            '[!] ERROR: No native styles found to update for "%s" with nativeStyleId "%s". Please check the nativeStyleId in ad.json.'
            % (dir, templateInfo["nativeStyleId"]),
            "red",
        )
        return False


def main(native_style_service: common.GoogleSoapService):
    # Check if template directory exists
    if not os.path.exists(template_dir):
        cprint(
            '[!] ERROR: Template directory "%s" does not exist. Please run the build process first.'
            % template_dir,
            "red",
        )
        exit(1)

    if not os.listdir(template_dir):
        cprint(
            '[!] ERROR: Template directory "%s" is empty. Please run the build process first.'
            % template_dir,
            "red",
        )
        exit(1)

    failed_templates = []
    successful_templates = []

    for root, dirs, files in os.walk(template_dir):
        for dir in dirs:
            result = upload_template(native_style_service, root, dir)
            if result is False:
                failed_templates.append(dir)
            elif result is True:
                successful_templates.append(dir)

    # Report final results
    if successful_templates:
        cprint(f'\n[✔️] Successfully deployed {len(successful_templates)} template(s):', "green")
        for template in successful_templates:
            cprint(f'  - {template}', "green")

    if failed_templates:
        cprint(f'\n[!] Failed to deploy {len(failed_templates)} template(s):', "red")
        for template in failed_templates:
            cprint(f'  - {template}', "red")
        cprint('\n[!] DEPLOYMENT FAILED: Common causes:', "red")
        cprint('[!] - Missing required files (ad.json, index.html, style.css)', "red")
        cprint('[!] - Invalid ad.json format or missing nativeStyleId', "red")
        cprint('[!] - Invalid nativeStyleId that doesn\'t exist in GAM', "red")
        cprint('[!] Please fix these issues before merging.', "red")
        exit(1)
    else:
        cprint('\n[✔️] All templates deployed successfully!', "green")


if __name__ == "__main__":
    key_json = os.environ.get("SERVICE_ACCOUNT_KEY_FILE")

    if key_json is None:
        cprint("[!] SERVICE_ACCOUNT_KEY_FILE is not set in .env", "red")
        exit(1)

    fd, key_file = tempfile.mkstemp()

    try:
        with os.fdopen(fd, 'w') as tmp:
            tmp.write(key_json)

        oauth2_client = oauth2.GoogleServiceAccountClient(
            key_file, oauth2.GetAPIScope('ad_manager'))

        ad_manager_client = ad_manager.AdManagerClient(
            oauth2_client, config['application_name'], config['network_code'])

        native_style_service = ad_manager_client.GetService(
            "NativeStyleService", version="v202505"
        )

        main(native_style_service)
    finally:
        os.remove(key_file)
