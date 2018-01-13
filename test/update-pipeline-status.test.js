import { assert } from 'chai';
import { run } from 'syncano-test';
import config from './utils/helpers';
import ElasticTranscoder from '../src/utils/ElasticTranscoder';

describe('update-pipeline-status', () => {
  const args = { Id: '', Status: 'Paused' };

  before((done) => {
    const awsElasticTranscoder = new ElasticTranscoder(config);
    awsElasticTranscoder.callEndpoint('listPipelines', { Ascending: 'false' })
      .then((data) => {
        const pipelines = data.Pipelines;
        args.Id = pipelines[0].Id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  before((done) => {
    const awsElasticTranscoder = new ElasticTranscoder(config);
    awsElasticTranscoder.callEndpoint('listPipelines', { Ascending: 'false' })
      .then((data) => {
        const pipelines = data.Pipelines;
        args.Id = pipelines[0].Id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return information about pipeline with status paused if parameters valid', (done) => {
    run('update-pipeline-status', { args, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data.Pipeline, 'Status', 'Paused');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return "MissingRequiredParameter" if Status parameter absent', (done) => {
    const { Status, ...updatedArgs } = args;
    run('update-pipeline-status', { args: updatedArgs, config })
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
