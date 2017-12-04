import { assert } from 'chai';
import { run } from 'syncano-test';
import dotenv from 'dotenv';

import ElasticTranscoder from '../src/utils/ElasticTranscoder';

dotenv.config();

describe('update_pipeline', () => {
  const config = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
  };

  const args = {
    Id: '',
    Notifications: {
      Progressing: '',
      Completed: '',
      Warning: '',
      Error: ''
    }
  };

  before((done) => {
    const awsElasticTranscoder = new ElasticTranscoder(config);
    awsElasticTranscoder.doCall('listPipelines', { Ascending: 'false' })
      .then((data) => {
        const pipelines = data.Pipelines;
        args.Id = pipelines[0].Id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should update pipeline settings if valid parameters supplied', (done) => {
    run('update_pipeline', {args, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data, 'message', 'Pipeline updated.');
        assert.property(res.data, 'Pipeline');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should fail if pipeline Id parameter empty', (done) => {
    const argsWithEmptyId = Object.assign({}, args, { Id: ''});
    run('update_pipeline', {args: argsWithEmptyId, config})
      .then((res) => {
        assert.property(res.data, 'message');
        assert.property(res.data, 'code');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
