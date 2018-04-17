import { assert } from 'chai';
import { run } from '@syncano/test';
import config from './utils/helpers';
import ElasticTranscoder from '../src/utils/ElasticTranscoder';

describe('read-job', () => {
  const args = { Id: '' };

  before((done) => {
    const awsElasticTranscoder = new ElasticTranscoder(config);
    awsElasticTranscoder.callEndpoint('listJobsByStatus',
      { Status: 'Complete', Ascending: 'false' })
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
    run('read-job', { args, config })
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
    const { Id, ...updatedArgs } = args;
    run('read-job', { args: updatedArgs, config })
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
