import os
from dotenv import load_dotenv
import json
from googleads import ad_manager, common
import datetime

load_dotenv()

template_dir = os.path.realpath(
    os.path.join(os.path.dirname(os.path.abspath(__file__)),
                 "../../build-static")
)

config = {
    "application_name": os.environ.get("GAM_APPLICATION_NAME"),
    "network_code": os.environ.get("GAM_NETWORK_CODE"),
    "client_id": os.environ.get("GAM_CLIENT_ID"),
    "client_secret": os.environ.get("GAM_CLIENT_SECRET"),
    "refresh_token": os.environ.get("GAM_REFRESH_TOKEN"),
}

config_yaml = """
ad_manager:
  application_name: {application_name}
  network_code: {network_code}
  client_id: {client_id}
  client_secret: {client_secret}
  refresh_token: {refresh_token}
""".format(
    **config
)

html_prefix = "<!-- DO NOT EDIT -- FILE GENERATED AND UPLOADED AUTOMATICALLY FROM https://github.com/guardian/commercial-templates ON {} -->".format(
    datetime.datetime.now().strftime("%m/%d/%Y")
)
css_prefix = "/* DO NOT EDIT -- FILE GENERATED AND UPLOADED AUTOMATICALLY FROM https://github.com/guardian/commercial-templates ON {} */".format(
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
        print(
            'Skipping "%s" because index.html, style.css, or ad.json was missing.' % dir
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
        print(
            'Native style with ID "%d" and name "%s" was found.'
            % (style["id"], style["name"])
        )
        style["htmlSnippet"] = html
        style["cssSnippet"] = css

        print('Updating native style "%s" with ID "%d".' % (dir, style["id"]))
        try:
            native_style_service.updateNativeStyles([style])
        except Exception as e:
            print("Error updating native style: %s" % e)
            return

        print(
            'Native style with ID "%d" and name "%s" was updated.'
            % (style["id"], style["name"])
        )
    else:
        print(
            'No native styles found to update for "%s" with nativeStyleId "%s"'
            % (dir, templateInfo["nativeStyleId"])
        )


def main(native_style_service: common.GoogleSoapService):
    for root, dirs, files in os.walk(template_dir):
        for dir in dirs:
            upload_template(native_style_service, root, dir)


if __name__ == "__main__":
    ad_manager_client = ad_manager.AdManagerClient.LoadFromString(config_yaml)

    native_style_service = ad_manager_client.GetService(
        "NativeStyleService", version="v202305"
    )

    main(native_style_service)
