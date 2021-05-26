import { S3 } from 'aws-sdk';

const s3 = new S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET,
    region: process.env.REACT_APP_AWS_REGION,
  });

export async function awslistObjects(
Bucket, 
data = [],
ContinuationToken = undefined) {
    const response = await s3.listObjectsV2({ Bucket, ContinuationToken }).promise();
    
    if(response.Contents.length) data.push(...response.Contents);

    if (response.IsTruncated) {
        return awslistObjects(Bucket, data, response.NextContinuationToken);
    }
    return data;
}