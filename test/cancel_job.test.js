import { assert } from 'chai';
import { run } from 'syncano-test';
import dotenv from 'dotenv';

import ElasticTranscoder from '../src/utils/ElasticTranscoder';

dotenv.config();

describe('cancel_job', () => {
  const config = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
  };

  const args = { Id: ''};

  before((done) => {
    const awsElasticTranscoder = new ElasticTranscoder(config);
    awsElasticTranscoder.doCall('listJobsByStatus', { Status: 'Submitted', Ascending: 'false' })
      .then((data) => {
        const jobs = data.Jobs;
        args.Id = jobs[0].Id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should cancel a job if valid Id of job supplied', (done) => {
    run('cancel_job', {args, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.property(res.data, 'Success');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should fail if invalid preset Id supplied', (done) => {
    const argsWithInvalidId = Object.assign({}, args, { Id: 'abcd'});
    run('delete_preset', {args: argsWithInvalidId, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 400);
        assert.property(res.data, 'message');
        assert.property(res.data, 'code');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
