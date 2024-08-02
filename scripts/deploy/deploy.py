import argparse
import os
import tempfile
from dotenv import load_dotenv
import json
from googleads import ad_manager, common, oauth2
import datetime
from termcolor import cprint

parser = argparse.ArgumentParser(
    prog='CommercialTemplateDeployer',
    description='Deploys commercial templates to GAM.')

parser.add_argument('--legacy', action='store_true',
                    help='Deploys legacy templates')

args = parser.parse_args()

load_dotenv()

template_dir = os.path.realpath(
    os.path.join(os.path.dirname(os.path.abspath(__file__)),
                 "../../build-static")
)

legacy_template_dir = os.path.realpath(
    os.path.join(os.path.dirname(os.path.abspath(__file__)),
                 "../../legacy/build")
)

legacy_template_types = ['web', 'app', 'amp']

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
    try:
        info_json = open(os.path.join(root, dir, "ad.json"), "r").read()

        html = open(os.path.join(root, dir, "index.html"), "r").read()

        css = open(os.path.join(root, dir, "style.css"), "r").read()
    except:
        cprint(
            '[!] Skipping "%s" because index.html, style.css, or ad.json was missing.'
            % dir,
            "yellow",
        )
        return

    templateInfo = json.loads(info_json)

    html = html_prefix + html
    css = css_prefix + css

    statement = ad_manager.StatementBuilder(
        version="v202208", where="id = %s" % templateInfo["nativeStyleId"]
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
            return

        cprint('[✔️] Native style "%s" was updated.' %
               (style["name"]), "green")
    else:
        cprint(
            '[i] No native styles found to update for "%s" with nativeStyleId "%s"'
            % (dir, templateInfo["nativeStyleId"]),
            "yellow",
        )


def main(native_style_service: common.GoogleSoapService):
    if (args.legacy):
        for root, dirs, files in os.walk(legacy_template_dir):
            for dir in dirs:
                for type in legacy_template_types:
                    if (dir == 'fabric-custom-xl'):
                        upload_template(native_style_service,
                                        root, dir + '/' + type)
    else:
        for root, dirs, files in os.walk(template_dir):
            for dir in dirs:
                upload_template(native_style_service, root, dir)


if __name__ == "__main__":
    key_json = os.environ.get("SERVICE_ACCOUNT_KEY_FILE") or ""

    fd, key_file = tempfile.mkstemp()

    try:
        with os.fdopen(fd, 'w') as tmp:
            tmp.write(key_json)

        oauth2_client = oauth2.GoogleServiceAccountClient(
            key_file, oauth2.GetAPIScope('ad_manager'))

        ad_manager_client = ad_manager.AdManagerClient(
            oauth2_client, config['application_name'], config['network_code'])

        native_style_service = ad_manager_client.GetService(
            "NativeStyleService", version="v202405"
        )

        main(native_style_service)
    finally:
        os.remove(key_file)
