#!/usr/bin/env bash

DIR=$(dirname "$0")
cd "${DIR}/../.."

npm run build

upload_file () {
    # TODO: arguments could be more intuitive
    # e.g. "./build/epic-no-optimize/web/index.html" "/epic/iframe-or-not/index.html"
    FILE="$1"
    FILE_DIR="$2"
    UPLOAD_PATH="$3"
    
    aws s3 cp \
        --profile membership \
        --region eu-west-1 \
        --acl public-read "${FILE_DIR}/${FILE}" "s3://reader-revenue-components/${UPLOAD_PATH}/${FILE}" \
        --cache-control 60 \
        --metadata '{"surrogate-control":"86400"}'
    
    curl -X PURGE "https://support.code.dev-theguardian.com/${UPLOAD_PATH}/${FILE}"
    curl -X PURGE "https://support.theguardian.com/${UPLOAD_PATH}/${FILE}"
}

upload_file "index.html"                 "./build/epic-no-optimize/web"  "epic/iframe-or-not"
upload_file "index.css"                  "./build/epic-no-optimize/web"  "epic/iframe-or-not"
upload_file "paypal-and-credit-card.png" "./src/epic-no-optimize/images" "epic/iframe-or-not"
