
DIR=$(dirname "$0")
cd "${DIR}/../.."

npm run build

upload_build_file () {
    FILE="$1"
    aws s3 cp --profile membership --region eu-west-1 --acl public-read "./build/epic-optimize/web/${FILE}" "s3://reader-revenue-components/epic/v1/${FILE}"
}

upload_image () {
    FILE="paypal-and-credit-card.png"
    aws s3 cp --profile membership --region eu-west-1 --acl public-read "./src/epic-optimize/images/${FILE}" "s3://reader-revenue-components/epic/v1/${FILE}"
}

upload_build_file "index.html"
upload_build_file "index.css"
upload_image
