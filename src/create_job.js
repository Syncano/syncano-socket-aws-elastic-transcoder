import Syncano from 'syncano-server';
import ElasticTranscoder from './utils/ElasticTranscoder';

export default (ctx) => {
  const {response} = Syncano(ctx);
  const awsElasticTranscoder = new ElasticTranscoder(ctx.config);

  return awsElasticTranscoder.callEndpoint('createJob', ctx.args, 'Job created.')
    .then((res) => {
      const {statusCode, ...data} = res;
      response.json(data, statusCode);
    })
    .catch((err) => {
      const { statusCode, error } = err;
      response.json(error, statusCode);
    });
};
