import { assert } from 'chai';
import { run } from 'syncano-test';
import dotenv from 'dotenv';

import ElasticTranscoder from '../src/utils/ElasticTranscoder';

dotenv.config();

describe('update_pipeline_notifications', () => {
  const config = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
  };

  const args = {
    Id: '',
    Notifications: {
      Progressing: '',
      Completed: '',
      Warning: '',
      Error: 'arn:aws:sns:eu-west-1:111222333444:ETS_Errors'
    }
  };

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

  it('should return information about pipeline with notification updated if parameters valid',
    (done) => {
      run('update_pipeline_notifications', {args, config})
        .then((res) => {
          assert.propertyVal(res, 'code', 200);
          assert.propertyVal(
            res.data.Pipeline.Notifications, 'Error',
            'arn:aws:sns:eu-west-1:111222333444:ETS_Errors'
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

  it('should return "MissingRequiredParameter" if Id parameter absent', (done) => {
    delete args.Id;
    run('update_pipeline_notifications', {args, config})
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
