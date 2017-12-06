import { assert } from 'chai';
import { run } from 'syncano-test';
import config from './utils/helpers';
import ElasticTranscoder from '../src/utils/ElasticTranscoder';

describe('cancel_job', () => {
  const args = { Id: ''};

  before((done) => {
    const awsElasticTranscoder = new ElasticTranscoder(config);
    awsElasticTranscoder.callEndpoint('listJobsByStatus',
      { Status: 'Submitted', Ascending: 'false' })
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
