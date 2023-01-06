export const yaml = {
    "parallelExecution": 1,
    "timeout": 30000,
    "apiExecutor": [
      {
        "reportTitle": "API Testing POSTMAN Collection folder structure.",
        "env": "dev",
        "virtualanSpecPath": "src/test/resources/postman/folders",
        "outputDir": "target/folders",
        "cucumblanProperties": {
          "service.api": "https://live.virtualandemo.com/api",
          "virtualan.data.load": "folders_postman.json;",
          "virtualan.data.type": "POSTMAN",
          "virtualan.data.heading": "Test processing multiple folder in Postman collection."
        },
        "apiHeader": {
          "headerList": [
            {
              "X-API-KEY": "abc123"
            },
            {
              "X-API-Test1": 123
            },
            {
              "X-API-Test2": "test2"
            }
          ],
          "overwrite": true
        },
        "execution": "GENERATE"
      }
    ]
  }