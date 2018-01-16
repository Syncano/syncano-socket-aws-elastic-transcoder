# aws-elastic-transcoder
[![CircleCI](https://circleci.com/gh/Syncano/syncano-socket-aws-elastic-transcoder.svg?style=svg)](https://circleci.com/gh/Syncano/syncano-socket-aws-elastic-transcoder)

Socket for Amazon Elastic Transcoder integration to Syncano

### Install

```
syncano-cli add aws-elastic-transcoder
```

### Socket Documentation
[Link to aws-elastic-transcoder socket documentation](https://syncano.io/#/sockets/aws-elastic-transcoder)

## Endpoints
#### create-job
This endpoint does the job of transcoding. A job converts a file into up to 30 formats.

[Aws create-job guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/create-job.html)

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| PipelineId  | string   | Pipeline to use for transcoding | 151196414944
| Inputs   | array   | Information about the files that you're transcoding | ``` [ {"Key": "name of the file to transcode"} ]```
| Outputs   | array   | List containing the text of the input documents | ``` [ {"Key": "name of the file to transcode", "PresetId": "preset to use for the job",} ]```
| OutputKeyPrefix | array   | Prefix for file names in Amazon S3 bucket | transcoded/
| Playlists     | array   | Fragmented MP4/MPEG-TS Outputs Only (Optional). |
| UserMetadata  | object   |User-defined metadata that you want to associate with an Elastic Transcoder job (Optional).| 

#### read-job
This endpoint gets the detailed information about a job

[Aws read-job guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/read-job.html)

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| Id  | string   | The identifier of the job for which you want to get detailed information | 151196414944


#### cancel-job
This endpoint cancels a job that Elastic Transcoder has not begun to process

[Aws cancel-job guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/cancel-job.html)

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| Id  | string   | The identifier of the job that you want to cancel | 151196414944

#### list-jobs-by-pipeline
This endpoint gets a list of the jobs currently in a pipeline

[Aws list-jobs-by-pipeline guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/list-jobs-by-pipeline.html)

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| PipelineId  | string   | ID of the pipeline for which you want to get job information | 151194944meeow
| Ascending  | string   | Enter 'true' to list jobs in a chronological order and 'false' for the reverse order. | "true"
| PageToken  | string   | When more than one page of results returned, use PageToken in subsequent GET requests to get each successive page of result | 151196414944

#### list-jobs-by-status
This endpoint gets a list of the jobs that have a specified status

[Aws list-jobs-by-status guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/list-jobs-by-status.html)

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| Status  | string   | Specify status of job: Submitted, Progressing, Complete, Canceled, or Error. | Complete
| Ascending  | string   | Enter 'true' to list jobs in a chronological order and 'false' for the reverse order. | "true"
| PageToken  | string   | When more than one page of results returned, use PageToken in subsequent GET requests to get each successive page of result | 151196414944

#### create-pipeline
This endpoint creates a pipeline with settings that you specify

[Aws create-pipeline guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/create-pipeline.html)

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| Name  | string   | Pipeline name | AwsPipeline
| InputBucket  | string   | Amazon S3 bucket that contains files to transcode | AwsInputBucket
| OutputBucket  | string   | The Amazon S3 bucket in which you want Elastic Transcoder to save the transcoded files | AwsOutputBucket
| Role  | string   | IAM ARN role that you want Elastic Transcoder to use to create the pipeline | arn:aws:iam::123456789012:role/Elastic_Transcoder_Default_Role
| AwsKmsKeyArn  | string   | AWS-KMS key arn of the AWS-KMS key you want to use with this pipeline | 
| Notifications  | object   | The topic ARN for the Amazon Simple Notification Service (Amazon SNS) topic that you want to notify to report job status | ``` { "Progressing":"", "Completed":"",  "Warning":"", "Error":"arn:aws:sns:us-east-1:111222333444:ET_Errors" }```
| ContentConfig  | object   | Specifies information about the Amazon S3 bucket in which you want to save transcoded files | 
| ThumbnailConfig  | object   | Specifies information about the S3 bucket you want to save thumbnail files. (Use this plus ContentConfig, or use OutputBucket) | 

#### list-pipelines
This endpoint gets list of the pipelines associated with the current AWS account

[Aws list-pipelines guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/list-pipelines.html)

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| Ascending  | string   | Enter 'true' to list jobs in a chronological order and 'false' for the reverse order. | "true"
| PageToken  | string   | When more than one page of results returned, use PageToken in subsequent GET requests to get each successive page of result | 151196414944

#### read-pipeline
This endpoint gets the detailed information about a pipeline

[Aws read-pipeline guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/get-pipeline.html)

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| Id  | string   | The identifier of the pipeline to get detailed information | 15118734meeow

#### update-pipeline
This endpoint updates a pipeline with settings that you specify

[Aws update-pipeline guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/update-pipeline.html)

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| Id  | string   | The ID of the pipeline that you want to update | 1111111111111-abcde1
| Name  | string   | Pipeline name | AwsPipeline
| InputBucket  | string   | Amazon S3 bucket that contains files to transcode | AwsInputBucket
| OutputBucket  | string   | The Amazon S3 bucket in which you want Elastic Transcoder to save the transcoded files | AwsOutputBucket
| Role  | string   | IAM ARN role that you want Elastic Transcoder to use to create the pipeline | arn:aws:iam::123456789012:role/Elastic_Transcoder_Default_Role
| AwsKmsKeyArn  | string   | AWS-KMS key arn of the AWS-KMS key you want to use with this pipeline | 
| Notifications  | object   | The topic ARN for the Amazon Simple Notification Service (Amazon SNS) topic that you want to notify to report job status | ``` { "Progressing":"", "Completed":"",  "Warning":"", "Error":"arn:aws:sns:us-east-1:111222333444:ET_Errors" }```
| ContentConfig  | object   | Specifies information about the Amazon S3 bucket in which you want to save transcoded files | 
| ThumbnailConfig  | object   | Specifies information about the S3 bucket you want to save thumbnail files. (Use this plus ContentConfig, or use OutputBucket) | 

#### update-pipeline-status
Use this endpoint to pause or reactivate a pipeline, so the pipeline stops or restarts processing jobs

[Aws update-pipeline-status guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/update-pipeline-status.html)

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| Id  | string   | The ID of the pipeline that you want to change status | 1111111111111-abcde1
| Status  | string   | The desired status of the pipeline (Active, Paused) | Active

#### update-pipeline-notifications
Use this endpoint to update only Amazon Simple Notification Service (Amazon SNS) notifications for a pipeline.

[Aws update-pipeline-notifications guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/update-pipeline-notifications.html)

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| Id  | string   | The identifier of the pipeline to change notification settings | 1111111111111-abcde1
| Notifications | string   | The desired status of the pipeline (Active, Paused) | ``` { "Progressing":"", "Completed":"",  "Warning":"", "Error":"arn:aws:sns:us-east-1:111222333444:ET_Errors" }```

#### delete-pipeline
This endpoint removes a pipeline

[Aws delete-pipeline guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/delete-pipeline.html)

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| Id  | string   | The identifier of the pipeline to remove | 15118734meeow

#### pipeline-check-role
This endpoint tests the settings for a pipeline to ensure that Elastic Transcoder can create and process jobs

[Aws pipeline-check-role guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/test-pipeline-role.html)

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| InputBucket  | string   | Amazon S3 bucket that contains files to transcode | AwsInputBucket
| OutputBucket  | string   | The Amazon S3 bucket that Elastic Transcoder writes transcoded media files to | AwsOutputBucket
| Role  | string   | The IAM Amazon Resource Name (ARN) for the role that you want Elastic Transcoder to test | arn:aws:iam::123456789012:role/Elastic_Transcoder_Default_Role
| Topics  | array   | The ARNs of one or more Amazon Simple Notification Service (Amazon SNS) topics that you want the action to send a test notification to | ``` [ "arn:aws:sns:us-east-1:111222333444:ETS_Errors", "arn:aws:sns:us-east-1:111222333444:ETS_Progressing" ]```


#### create-preset
This endpoint creates a preset with settings that you specify

[Aws create-preset guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/create-preset.html)

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| Name  | string   | Pipeline name | DefaultPreset
| Description  | string   | A description of the preset | Use for published videos
| Container  | string   | he container type for the output file. Valid values include flac, flv, fmp4, gif, mp3, mp4, mpg, mxf, oga, ogg, ts, and webm | flv
| Video  | object   | Object that specifies the video parameters |
| Audio  | string   | Object that specifies the audio parameters | 
| Thumbnail  | object   | Object that specifies the thumbnail parameters if any |

#### read-preset
This endpoint gets the detailed information about a pipeline

[Aws read-preset guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/get-preset.html)

*_Parameters_*

| Name     | Type     | Description  | Example
| ------- |---------| ------------| ---------
| Id  | string   | The identifier of the preset to get detailed information | 5555555555555-abcde5

#### list-presets
This endpoint gets list of the presets associated with the current AWS account

[Aws list-presets guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/list-presets.html)

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| Ascending  | string   | Enter 'true' to list jobs in a chronological order and 'false' for the reverse order. | "true"
| PageToken  | string   | When more than one page of results returned, use PageToken in subsequent GET requests to get each successive page of result | 151196414944

#### delete-preset
This endpoint removes a pipeline

[Aws delete-preset guide](https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/delete-preset.html)

*_Parameters_*

| Name          | Type     | Description  | Example
| ------------- |---------| ------------| ---------
| Id  | string   | The identifier of the preset to delete | 5555555555555-abcde5


## Contributing

#### How to Contribute
  * Fork this repository
  * Clone from your fork
  * Make your contributions (Make sure your work is well tested)
  * Create Pull request from the fork to this repo

#### Setting up environment variables
  * Create a `.env` on parent folder
  * Copy contents of `.env-sample` file to newly created `.env` file and assign appropriate values to the listed variables.

#### Testing
  * Tests are written in the `test` directory
  * Use the command `npm test` to run tests