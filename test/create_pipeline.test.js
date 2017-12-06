import { assert } from 'chai';
import { run } from 'syncano-test';
import config from './utils/helpers';

describe('create_pipeline', () => {
  const args = {
    Name: 'pipelineTest',
    InputBucket: process.env.INPUT_BUCKET,
    OutputBucket: process.env.OUTPUT_BUCKET,
    Role: process.env.IAM_ROLE
  };

  it('should create pipeline if valid parameters supplied', (done) => {
    run('create_pipeline', {args, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data, 'message', 'Pipeline created.');
        assert.property(res.data, 'Pipeline');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should fail if arguments without pipeline name', (done) => {
    const argsWithoutPipelineName = Object.assign({}, args, { Name: '' });
    run('create_pipeline', {args: argsWithoutPipelineName, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 400);
        assert.property(res.data, 'message');
        assert.propertyVal(res.data, 'code', 'ValidationException');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
