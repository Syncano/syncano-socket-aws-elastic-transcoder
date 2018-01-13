import Syncano from 'syncano-server';
import ElasticTranscoder from './utils/ElasticTranscoder';

export default (ctx) => {
  const { response } = Syncano(ctx);
  const awsElasticTranscoder = new ElasticTranscoder(ctx.config);

  return awsElasticTranscoder.callEndpoint(
    'listPipelines', ctx.args, 'List of pipelines.'
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