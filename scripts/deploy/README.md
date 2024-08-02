# Deploy to GAM

This script will attempt to upload all commercial templates to GAM, replacing the corresponding generated HTML & CSS.

The script checks for the presence of an `ad.json` file in the template directory. This file must contain the key `nativeStyleId`, specifying the ID for the corresponding [native style][native-style] in GAM.

[native-style]: https://support.google.com/admanager/answer/13404315?hl=en&ref_topic=7032550&sjid=6297647672569553146-EU

## Requirements

- Python 3.x
- An OAuth2 client id and secret

## Running locally

```bash
$ cd scripts/deploy
$ cp .env.example .env # fill this in
$ pipenv install
$ pipenv run python deploy.py
```
