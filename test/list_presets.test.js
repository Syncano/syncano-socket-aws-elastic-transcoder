import { assert, expect } from 'chai';
import { run } from 'syncano-test';
import dotenv from 'dotenv';

dotenv.config();

describe('list_presets', () => {
  const config = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
  };

  const args = {
    Ascending: 'true'
  };

  it('should return list presets associated with AWS account', (done) => {
    run('list_presets', {args, config})
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
