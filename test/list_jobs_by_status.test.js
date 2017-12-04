import { assert, expect } from 'chai';
import { run } from 'syncano-test';
import dotenv from 'dotenv';

dotenv.config();

describe('list_jobs_by_status', () => {
  const config = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
  };

  const args = {
    Status: 'Complete',
    Ascending: 'true'
  };

  it('should return list jobs with a specified status', (done) => {
    run('list_jobs_by_status', {args, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data, 'message', 'List of jobs with status \'Complete\'.');
        assert.property(res.data, 'Jobs');
        expect(res.data.Jobs).to.be.an.instanceof(Array);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return "MissingRequiredParameter" if Status parameter absent', (done) => {
    delete args.Status;
    run('list_jobs_by_status', {args, config})
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
