import Syncano from 'syncano-server';
import ElasticTranscoder from './utils/ElasticTranscoder';

export default (ctx) => {
  const {response} = Syncano(ctx);

  const awsElasticTranscoder = new ElasticTranscoder(ctx.config);

  return awsElasticTranscoder.doCall('deletePreset', ctx.args.Id)
    .then((res) => {
      return response.json(res);
    })
    .catch((err) => {
      return response.json(err, 400);
    });
};
