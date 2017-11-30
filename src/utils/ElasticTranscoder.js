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
   * Do the request to AWS ElasticTranscoder
   *
   * @param {string} endpoint
   * @param {Object} params
   * @returns {Promise}
   */
  doCall(endpoint, params) {
    return new Promise((resolve, reject) => {
      this.ElasticTranscoder[endpoint](params)
        .promise()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default ElasticTranscoder;
