import Syncano from 'syncano-server';
import ElasticTranscoder from './utils/ElasticTranscoder';

export default (ctx) => {
  const {response} = Syncano(ctx);
  const awsElasticTranscoder = new ElasticTranscoder(ctx.config);

  return awsElasticTranscoder.callEndpoint(
    'listJobsByStatus', ctx.args, `List of jobs with status '${ctx.args.Status}'.`
  )
    .then((res) => {
      const {statusCode, ...data} = res;
      response.json(data, statusCode);
    })
    .catch((err) => {
      const { statusCode, error } = err;
      response.json(error, statusCode);
    });
};
