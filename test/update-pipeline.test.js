import { assert } from 'chai';
import { run } from '@syncano/test';
import config from './utils/helpers';

import ElasticTranscoder from '../src/utils/ElasticTranscoder';

describe('update-pipeline', () => {
  const args = {
    Id: '',
    Notifications: {
      Progressing: '',
      Completed: '',
      Warning: '',
      Error: ''
    }
  };

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

  it('should update pipeline settings if valid parameters supplied', (done) => {
    run('update-pipeline', { args, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data, 'message', 'Pipeline updated.');
        assert.property(res.data, 'Pipeline');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should fail if pipeline Id parameter empty', (done) => {
    const argsWithEmptyId = Object.assign({}, args, { Id: '' });
    run('update-pipeline', { args: argsWithEmptyId, config })
      .then((res) => {
        assert.property(res.data, 'message');
        assert.property(res.data, 'code');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
