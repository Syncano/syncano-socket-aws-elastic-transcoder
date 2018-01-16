import { assert, expect } from 'chai';
import { run } from 'syncano-test';
import config from './utils/helpers';

describe('list-jobs-by-status', () => {
  const args = {
    Status: 'Complete',
    Ascending: 'true'
  };

  it('should return jobs list with a specified status', (done) => {
    run('list-jobs-by-status', { args, config })
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
    const { Status, ...updatedArgs } = args;
    run('list-jobs-by-status', { args: updatedArgs, config })
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
