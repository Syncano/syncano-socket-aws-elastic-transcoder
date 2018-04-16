import { assert } from 'chai';
import { run } from '@syncano/test';
import config from './utils/helpers';
import ElasticTranscoder from '../src/utils/ElasticTranscoder';

describe('create-job', () => {
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
    awsElasticTranscoder.callEndpoint('listPipelines', { Ascending: 'false' })
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
    run('create-job', { args, config })
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
    const { PipelineId, ...updatedArgs } = args;
    run('create-job', { args: updatedArgs, config })
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
