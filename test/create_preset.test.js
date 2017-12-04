import { assert } from 'chai';
import { run } from 'syncano-test';
import dotenv from 'dotenv';

dotenv.config();

describe('create_preset', () => {
  const config = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
  };

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
    run('create_preset', {args, config})
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
    delete args.Audio;
    run('create_preset', {args, config})
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
