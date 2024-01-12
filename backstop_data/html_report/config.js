report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_CAPI_Single_PaidFor_0_document_0_desktop.png",
        "test": "../bitmaps_test/20240112-124211/backstop_default_CAPI_Single_PaidFor_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_CAPI_Single_PaidFor_0_document_0_desktop.png",
        "label": "CAPI Single PaidFor",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:7777/csr/capi-single-paidfor",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 2.108095646000216,
          "misMatchPercentage": "2.11",
          "analysisTime": 191
        },
        "diffImage": "../bitmaps_test/20240112-124211/failed_diff_backstop_default_CAPI_Single_PaidFor_0_document_0_desktop.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_CAPI_Multiple_PaidFor_0_document_0_desktop.png",
        "test": "../bitmaps_test/20240112-124211/backstop_default_CAPI_Multiple_PaidFor_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_CAPI_Multiple_PaidFor_0_document_0_desktop.png",
        "label": "CAPI Multiple PaidFor",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:7777/csr/capi-multiple-paidfor",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 1.7776602744876857,
          "misMatchPercentage": "1.78",
          "analysisTime": 266
        },
        "diffImage": "../bitmaps_test/20240112-124211/failed_diff_backstop_default_CAPI_Multiple_PaidFor_0_document_0_desktop.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});