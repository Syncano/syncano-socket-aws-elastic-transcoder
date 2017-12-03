import { assert } from 'chai';
import { run } from 'syncano-test';

import dotenv from 'dotenv';

dotenv.config();

describe('create_pipeline', () => {
  const config = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
  };

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
