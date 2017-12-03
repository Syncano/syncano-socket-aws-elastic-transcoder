import { assert } from 'chai';
import { run } from 'syncano-test';

import dotenv from 'dotenv';

import ElasticTranscoder from '../src/utils/ElasticTranscoder';

dotenv.config();

describe('create_pipeline', () => {
  const config = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
  };

  const args = { Id: ''};

  before((done) => {
    const awsElasticTranscoder = new ElasticTranscoder(config);
    return awsElasticTranscoder.doCall('createPipeline', {})
      .then((data) => {
        const pipelines = data.Pipelines;
        args.Id = pipelines[pipelines.length - 1].Id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return information about pipeline if Id of pipeline supplied', (done) => {
    run('read_pipeline', {args, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data, 'message', 'Pipeline created.');
        assert.property(res.data, 'Pipeline');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return "MissingRequiredParameter" as code parameter if Id parameter empty', (done) => {
    const argsWithoutID = Object.assign({}, args, { Id: '' });
    run('read_pipeline', {args: argsWithoutID, config})
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
