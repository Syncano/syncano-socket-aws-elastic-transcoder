import { assert, expect } from 'chai';
import { run } from 'syncano-test';
import config from './utils/helpers';
import ElasticTranscoder from '../src/utils/ElasticTranscoder';

describe('list-jobs-by-pipeline', () => {
  const args = {
    PipelineId: '',
    Ascending: 'true'
  };

  before((done) => {
    const awsElasticTranscoder = new ElasticTranscoder(config);
    awsElasticTranscoder.callEndpoint('listPipelines', {})
      .then((data) => {
        const pipelines = data.Pipelines;
        args.PipelineId = pipelines[0].Id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return list jobs that you assigned to a pipeline', (done) => {
    run('list-jobs-by-pipeline', { args, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data, 'message', 'List of jobs in pipeline.');
        assert.property(res.data, 'Jobs');
        expect(res.data.Jobs).to.be.an.instanceof(Array);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return "MissingRequiredParameter" if PipelineId parameter absent', (done) => {
    const { PipelineId, ...updatedArgs } = args;
    run('list-jobs-by-pipeline', { args: updatedArgs, config })
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
