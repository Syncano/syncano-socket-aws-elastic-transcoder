import Syncano from '@syncano/core';
import ElasticTranscoder from './utils/ElasticTranscoder';

export default (ctx) => {
  const { response } = new Syncano(ctx);
  const awsElasticTranscoder = new ElasticTranscoder(ctx.config);

  return awsElasticTranscoder.callEndpoint('listPresets', ctx.args, 'List of presets.')
    .then((res) => {
      const { statusCode, ...data } = res;
      response.json(data, statusCode);
    })
    .catch((err) => {
      const { statusCode, error } = err;
      response.json(error, statusCode);
    });
};
