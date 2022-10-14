# Upload to GAM
This script will upload any templates with an `ad.json` containing a `nativeStyleId` property to GAM, replacing the corresponding generated HTML & CSS.

It's written in python because Google does not offer a JS SDK.

## Requirements
- Python 3.x
- An OAuth2 client id and secret

## Running locally
```bash
$ cd scripts/upload-to-gam
$ cp .env.example .env # fill this in
$ pip install -r requirements.txt
$ python upload.py
```
