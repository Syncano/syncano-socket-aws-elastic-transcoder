import { assert } from 'chai';
import { run } from 'syncano-test';
import config from './utils/helpers';

describe('create-preset', () => {
  const args = {
    Name: 'presetTest',
    Description: 'Use for published videos',
    Container: 'mp4',
    Audio: {
      Codec: 'AAC',
      CodecOptions: {
        Profile: 'AAC-LC'
      },
      SampleRate: '44100',
      BitRate: '96',
      Channels: '2'
    }
  };

  it('should create preset if valid parameters supplied', (done) => {
    run('create-preset', { args, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res.data, 'message', 'Preset created.');
        assert.property(res.data, 'Preset');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should fail if arguments without audio, video and thumbnail settings', (done) => {
    const { Audio, ...updatedArgs } = args;
    run('create-preset', { args: updatedArgs, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 400);
        assert.property(res.data, 'message');
        assert.propertyVal(res.data, 'code', 'ValidationException');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
