import AWS from 'aws-sdk';

/**
 * ElasticTranscoder Class
 * @class
 */
class ElasticTranscoder {
  /**
   * Constructor initializes AWS ElasticTranscoder
   * @param {object} AWSParameters
   * @constructor
   */
  constructor(AWSParameters) {
    this.ElasticTranscoder = new AWS.ElasticTranscoder({
      accessKeyId: AWSParameters.AWS_ACCESS_KEY_ID,
      secretAccessKey: AWSParameters.AWS_SECRET_ACCESS_KEY,
      region: AWSParameters.AWS_REGION
    });
  }

  /**
   * Do the request for endpoint
   * @param {string} endpoint
   * @param {object} params
   * @param {string} responseMessage
   * @param {boolean} keySuccess
   * @param {string} paramCheck
   * @param {string} responseNotFound
   * @returns {Object} response result
   */
  callEndpoint(endpoint, params, responseMessage = '', keySuccess = false, paramCheck = '',
    responseNotFound = '') {
    return new Promise((resolve, reject) => {
      this.ElasticTranscoder[endpoint](params)
        .promise()
        .then((res) => {
          if (paramCheck && !res[paramCheck]) {
            resolve({message: responseNotFound, statusCode: 404});
          }
          if (responseMessage) {
            res.message = responseMessage;
          }
          if (keySuccess) {
            res.Success = 'true';
          }
          resolve({ ...res, statusCode: 200 });
        })
        .catch((error) => {
          const statusCode = (error.statusCode) ? error.statusCode : 400;
          reject({ error, statusCode });
        });
    });
  }
}

export default ElasticTranscoder;
