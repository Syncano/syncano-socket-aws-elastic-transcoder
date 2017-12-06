import { assert } from 'chai';
import { run } from 'syncano-test';
import config from './utils/helpers';
import ElasticTranscoder from '../src/utils/ElasticTranscoder';

describe('update_pipeline_notifications', () => {
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
    const {Id, ...updatedArgs} = args;
    run('update_pipeline_notifications', {args: updatedArgs, config})
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
