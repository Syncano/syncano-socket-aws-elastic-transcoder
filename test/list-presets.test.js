import { assert, expect } from 'chai';
import { run } from 'syncano-test';
import config from './utils/helpers';

describe('list-presets', () => {
  const args = {
    Ascending: 'true'
  };

  it('should return list presets associated with AWS account', (done) => {
    run('list-presets', { args, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data, 'message', 'List of presets.');
        expect(res.data.Presets.length > 0).to.equal(true);
        assert.property(res.data, 'Presets');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
