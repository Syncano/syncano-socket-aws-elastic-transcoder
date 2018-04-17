import { assert } from 'chai';
import { run } from '@syncano/test';
import config from './utils/helpers';
import ElasticTranscoder from '../src/utils/ElasticTranscoder';

describe('delete-preset', () => {
  const args = { Id: '' };

  before((done) => {
    const awsElasticTranscoder = new ElasticTranscoder(config);
    awsElasticTranscoder.callEndpoint('listPresets', { Ascending: 'false' })
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
    run('delete-preset', { args, config })
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
    const argsWithInvalidId = Object.assign({}, args, { Id: 'abcd' });
    run('delete-preset', { args: argsWithInvalidId, config })
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
