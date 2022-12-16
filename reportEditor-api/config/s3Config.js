const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");

const bucketName = process.env.BUCKET_NAME;

const s3BucketEndpoint = new AWS.Endpoint(process.env.STORAGE_END_POINT);
const s3 = new AWS.S3({
  endpoint: s3BucketEndpoint,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
});

exports.uploadImg = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    ACL: "public-read",
  };
  const response = await s3.upload(uploadParams).promise();
  fs.unlinkSync(file.path);
  return response;
};

exports.deleteFile = async (fileKey) => {
  const params = {
    Bucket: bucketName,
    Key: fileKey,
  };
  return s3.deleteObject(params).promise();
};

function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3
    .getObject(downloadParams)
    .createReadStream()
    .on("error", (err) => {});
}
exports.getFileStream = getFileStream;