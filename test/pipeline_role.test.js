import { assert, expect } from 'chai';
import { run } from 'syncano-test';

import dotenv from 'dotenv';

dotenv.config();

describe('test_role', () => {
  const config = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
  };

  const args = {
    InputBucket: process.env.INPUT_BUCKET,
    OutputBucket: process.env.OUTPUT_BUCKET,
    Role: process.env.IAM_ROLE,
    Topics: []
  };

  it('should have a property of "Success" if all parameters valid', (done) => {
    run('pipeline_role', {args, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        expect(res.data.Messages).to.be.an.instanceof(Array);
        assert.property(res.data, 'Success');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return "ValidationException" if InputBucket parameter empty', (done) => {
    const argsWitEmptyInputBucket = Object.assign({}, args, { InputBucket: ''});
    run('pipeline_role', {args: argsWitEmptyInputBucket, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 400);
        assert.propertyVal(res.data, 'code', 'ValidationException');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return "MissingRequiredParameter" if Topics parameter absent', (done) => {
    delete args.Topics;
    run('pipeline_role', {args, config})
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
