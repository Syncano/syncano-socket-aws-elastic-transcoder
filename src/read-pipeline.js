import Syncano from '@syncano/core';
import ElasticTranscoder from './utils/ElasticTranscoder';

export default (ctx) => {
  const { response } = new Syncano(ctx);
  const awsElasticTranscoder = new ElasticTranscoder(ctx.config);

  return awsElasticTranscoder.callEndpoint(
    'readPipeline', ctx.args, 'Pipeline details.', false, 'Pipeline', 'Pipeline not found.'
  )
    .then((res) => {
      const { statusCode, ...data } = res;
      response.json(data, statusCode);
    })
    .catch((err) => {
      const { statusCode, error } = err;
      response.json(error, statusCode);
    });
};
