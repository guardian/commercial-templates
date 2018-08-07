#!/usr/bin/env bash

DIR=$(dirname "$0")
cd "${DIR}/../.."

npm run build

purge_cache () {
    PATH="$1"
    curl -X PURGE "https://support.code.dev-theguardian.com${PATH}"
    curl -X PURGE "https://support.theguardian.com${PATH}"
}

upload_build_file () {
    FILE="$1"
    aws s3 cp \
        --profile membership \
        --region eu-west-1 \
        --acl public-read "./build/epic-optimize/web/${FILE}" "s3://reader-revenue-components/epic/control/${FILE}" \
        --cache-control 60 \
        --metadata '{"surrogate-control":"86400"}'
    purge_cache "/epic/control/${FILE}"
}

upload_image () {
    FILE="paypal-and-credit-card.png"
    aws s3 cp \
        --profile membership \
        --region eu-west-1 \
        --acl public-read "./src/epic-optimize/images/${FILE}" "s3://reader-revenue-components/epic/control/${FILE}" \
        --cache-control 60 \
        --metadata '{"surrogate-control":"86400"}'
    purge_cache "/epic/control/${FILE}"
}

upload_build_file "index.html"
upload_build_file "index.css"
upload_image
