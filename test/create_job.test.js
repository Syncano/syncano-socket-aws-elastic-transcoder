import { assert } from 'chai';
import { run } from 'syncano-test';
import dotenv from 'dotenv';

import ElasticTranscoder from '../src/utils/ElasticTranscoder';

dotenv.config();

describe('create_job', () => {
  const config = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
  };

  const args = {
    Inputs: [
      {
        Key: process.env.VIDEO_KEY
      }
    ],
    Outputs: [
      {
        Key: 'vid1_test1.mp4',
        PresetId: '1351620000001-000040'
      },
      {
        Key: 'vid1_test2.mp4',
        PresetId: '1351620000001-000050'
      }
    ],
    PipelineId: ''
  };

  before((done) => {
    const awsElasticTranscoder = new ElasticTranscoder(config);
    awsElasticTranscoder.doCall('listPipelines', { Ascending: 'false' })
      .then((data) => {
        const pipelines = data.Pipelines;
        args.PipelineId = pipelines[0].Id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should create job if valid parameters supplied', (done) => {
    run('create_job', {args, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data, 'message', 'Job created.');
        assert.property(res.data.Job, 'Id');
        assert.property(res.data.Job, 'Inputs');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should fail if arguments without PipelineId parameter', (done) => {
    delete args.PipelineId;
    run('create_job', {args, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 400);
        assert.property(res.data, 'message');
        assert.propertyVal(res.data, 'code', 'MissingRequiredParameter');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
