import Syncano from 'syncano-server';
import ElasticTranscoder from './utils/ElasticTranscoder';

export default (ctx) => {
  const {response} = Syncano(ctx);

  const awsElasticTranscoder = new ElasticTranscoder(ctx.config);

  return awsElasticTranscoder.doCall('listJobsByStatus', ctx.args)
    .then((data) => {
      return response.json({ message: `List of jobs with status ${ctx.args.Status}.`, data });
    })
    .catch((err) => {
      return response.json(err, 400);
    });
};
