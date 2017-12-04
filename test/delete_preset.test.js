import { assert } from 'chai';
import { run } from 'syncano-test';
import dotenv from 'dotenv';

import ElasticTranscoder from '../src/utils/ElasticTranscoder';

dotenv.config();

describe('delete_preset', () => {
  const config = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
  };

  const args = { Id: ''};

  before((done) => {
    const awsElasticTranscoder = new ElasticTranscoder(config);
    awsElasticTranscoder.doCall('listPresets', { Ascending: 'false' })
      .then((data) => {
        const presets = data.Presets;
        args.Id = presets[0].Id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should delete preset and return success true if valid preset Id supplied', (done) => {
    run('delete_preset', {args, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data, 'Success', 'true');
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
