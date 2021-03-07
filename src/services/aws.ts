import S3 from "aws-sdk/clients/s3";

export const uploadToAWS = (key: string, body: Buffer) => {
  const s3 = new S3();
  return new Promise<string>((resolve, reject) => {
    const params: S3.PutObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: body,
      ACL: "public-read",
    };
    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Image uploading failed");
        reject(err);
      }
      resolve(data.Location);
    });
  });
};

export const deleteFromAWS = (key: string) => {
  const s3 = new S3();
  const params: S3.DeleteObjectRequest = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  };
  return s3.deleteObject(params).promise();
};

export const deleteFolderFromAWS = async (folder: string) => {
  const s3 = new S3();
  const listParams: S3.ListObjectsV2Request = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Prefix: folder,
  };

  const listedObjects = await s3.listObjectsV2(listParams).promise();

  if (!listedObjects.Contents) return;

  if (listedObjects.Contents.length === 0) return;

  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Delete: { Objects: [] as any },
  };

  listedObjects.Contents.forEach((content: any) => {
    deleteParams.Delete.Objects.push({ Key: content.Key });
  });

  await s3.deleteObjects(deleteParams).promise();

  if (listedObjects.IsTruncated) await deleteFolderFromAWS(folder);
};
