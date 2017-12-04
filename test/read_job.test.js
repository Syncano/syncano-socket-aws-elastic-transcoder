import { assert } from 'chai';
import { run } from 'syncano-test';

import dotenv from 'dotenv';

import ElasticTranscoder from '../src/utils/ElasticTranscoder';

dotenv.config();

describe('read_job', () => {
  const config = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
  };

  const args = { Id: ''};

  before((done) => {
    const awsElasticTranscoder = new ElasticTranscoder(config);
    awsElasticTranscoder.doCall('listJobsByStatus', { Status: 'Complete', Ascending: 'false' })
      .then((data) => {
        const jobs = data.Jobs;
        args.Id = jobs[0].Id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return information about job if valid Id of job supplied', (done) => {
    run('read_job', {args, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data.Job, 'Id', args.Id);
        assert.property(res.data, 'message');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return "MissingRequiredParameter" if Id parameter absent', (done) => {
    delete args.Id;
    run('read_job', {args, config})
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
