import Syncano from 'syncano-server';
import ElasticTranscoder from './utils/ElasticTranscoder';

export default (ctx) => {
  const {response} = Syncano(ctx);

  const awsElasticTranscoder = new ElasticTranscoder(ctx.config);

  return awsElasticTranscoder.doCall('updatePipeline', ctx.args)
    .then((data) => {
      data.message = 'Pipeline updated.';
      return response.json(data);
    })
    .catch((err) => {
      return response.json(err, 400);
    });
};
