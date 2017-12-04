import { assert } from 'chai';
import { run } from 'syncano-test';

import dotenv from 'dotenv';

import ElasticTranscoder from '../src/utils/ElasticTranscoder';

dotenv.config();

describe('read_pipeline', () => {
  const config = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
  };

  const args = { Id: ''};

  before((done) => {
    const awsElasticTranscoder = new ElasticTranscoder(config);
    awsElasticTranscoder.doCall('listPipelines', { Ascending: 'false' })
      .then((data) => {
        const pipelines = data.Pipelines;
        args.Id = pipelines[0].Id;
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
        assert.propertyVal(res.data.Pipeline, 'Id', args.Id);
        assert.property(res.data, 'message');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return message "Pipeline not found" if Id parameter empty', (done) => {
    const argsWithEmptyId = Object.assign({}, args, { Id: ''});
    run('read_pipeline', {args: argsWithEmptyId, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 404);
        assert.propertyVal(res.data, 'message', 'Pipeline not found.');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return "MissingRequiredParameter" if Id parameter absent', (done) => {
    delete args.Id;
    run('read_pipeline', {args, config})
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
