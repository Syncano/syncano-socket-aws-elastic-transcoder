import { assert, expect } from 'chai';
import { run } from '@syncano/test';
import 'dotenv/config';
import config from './utils/helpers';

describe('pipeline-check-role', () => {
  const { INPUT_BUCKET, OUTPUT_BUCKET, IAM_ROLE } = process.env;
  const args = {
    InputBucket: INPUT_BUCKET,
    OutputBucket: OUTPUT_BUCKET,
    Role: IAM_ROLE,
    Topics: []
  };

  it('should have a property of "Success" if all parameters valid', (done) => {
    run('pipeline-check-role', { args, config })
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
    const argsWitEmptyInputBucket = Object.assign({}, args, { InputBucket: '' });
    run('pipeline-check-role', { args: argsWitEmptyInputBucket, config })
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
    const { Topics, ...updatedArgs } = args;
    run('pipeline-check-role', { args: updatedArgs, config })
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
