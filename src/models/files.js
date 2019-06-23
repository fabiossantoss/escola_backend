const mongoose = require('mongoose');
const aws = require('aws-sdk');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const s3 = new aws.S3();

const Files = mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    size: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);
// eslint-disable-next-line func-names
Files.pre('save', function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

// eslint-disable-next-line func-names
Files.pre('remove', function () {
  if (process.env.STORAGE_TYPE === 's3') {
    return s3
      .deleteObject({
        Bucket: process.env.Bucket,
        Key: this.key,
      })
      .promise();
  }
  return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key));
});

module.exports = mongoose.model('Files', Files);
