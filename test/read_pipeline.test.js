import { assert } from 'chai';
import { run } from 'syncano-test';
import config from './utils/helpers';
import ElasticTranscoder from '../src/utils/ElasticTranscoder';

describe('read_pipeline', () => {
  const args = { Id: ''};

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

  it('should return information about pipeline if Id of pipeline supplied', (done) => {
    run('read_pipeline', {args, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data.Pipeline, 'Id', args.Id);
        assert.property(res.data, 'message');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return message "Pipeline not found" if Id parameter empty', (done) => {
    const argsWithEmptyId = Object.assign({}, args, { Id: ''});
    run('read_pipeline', {args: argsWithEmptyId, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 404);
        assert.propertyVal(res.data, 'message', 'Pipeline not found.');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return "MissingRequiredParameter" if Id parameter absent', (done) => {
    const {Id, ...updatedArgs} = args;
    run('read_pipeline', {args: updatedArgs, config})
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
