import { assert } from 'chai';
import { run } from 'syncano-test';
import config from './utils/helpers';
import ElasticTranscoder from '../src/utils/ElasticTranscoder';

describe('read-preset', () => {
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

  it('should return information about preset if valid Id of preset supplied', (done) => {
    run('read-preset', { args, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data.Preset, 'Id', args.Id);
        assert.property(res.data, 'Preset');
        assert.property(res.data, 'message');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return message "Preset not found" if Id parameter empty', (done) => {
    const argsWithEmptyId = Object.assign({}, args, { Id: '' });
    run('read-preset', { args: argsWithEmptyId, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 404);
        assert.propertyVal(res.data, 'message', 'Preset not found.');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return "MissingRequiredParameter" if Id parameter absent', (done) => {
    const { Id, ...updatedArgs } = args;
    run('read-preset', { args: updatedArgs, config })
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
