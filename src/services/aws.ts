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
        console.error(err);
        reject({
          message: "Image uploading failed please try uploading later !",
        });
      }
      resolve(data.Location);
    });
  });
};
