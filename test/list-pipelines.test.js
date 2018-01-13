import { assert, expect } from 'chai';
import { run } from 'syncano-test';
import config from './utils/helpers';

describe('list-pipelines', () => {
  const args = {
    Ascending: 'true'
  };

  it('should return list pipelines associated with AWS account', (done) => {
    run('list-pipelines', { args, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data, 'message', 'List of pipelines.');
        expect(res.data.Pipelines.length > 0).to.equal(true);
        assert.property(res.data, 'Pipelines');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
