import { assert } from 'chai';
import { run } from '@syncano/test';
import config from './utils/helpers';
import ElasticTranscoder from '../src/utils/ElasticTranscoder';

describe('delete-pipeline', () => {
  const args = { Id: '' };

  before((done) => {
    const awsElasticTranscoder = new ElasticTranscoder(config);
    awsElasticTranscoder.callEndpoint('listPipelines', { Ascending: 'false' })
      .then((data) => {
        const pipelines = data.Pipelines;
        args.Id = pipelines[0].Id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should delete pipeline and return success true if valid pipeline Id supplied', (done) => {
    run('delete-pipeline', { args, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data, 'Success', 'true');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should fail if invalid pipeline Id supplied', (done) => {
    const argsWithInvalidId = Object.assign({}, args, { Id: 'abcd' });
    run('delete-pipeline', { args: argsWithInvalidId, config })
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
