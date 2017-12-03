import Syncano from 'syncano-server';
import ElasticTranscoder from './utils/ElasticTranscoder';

export default (ctx) => {
  const {response} = Syncano(ctx);

  const awsElasticTranscoder = new ElasticTranscoder(ctx.config);

  return awsElasticTranscoder.doCall('listPipelines', ctx.args)
    .then((data) => {
      data.message = 'List of pipelines.';
      return response.json(data);
    })
    .catch((err) => {
      const statusCode = (err.statusCode) ? err.statusCode : 400;
      return response.json(err, statusCode);
    });
};
