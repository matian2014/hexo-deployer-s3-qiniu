
const fs = require('hexo-fs');

const qiniuUploader = require('hexo-deployer-s3-qiniu/lib/qiniu-uploader');

module.exports = function (args) {
  var log = this.log;
  var publicDir = this.config.public_dir;

  if (!Object.prototype.hasOwnProperty.call(args, 'overwrite')) args.overwrite = false;

  // Parse configuration
  let bucket = args.bucket
  let client_key = args.client_key
  let client_secret = args.client_secret
  let overwrite = args.overwrite

  if (!bucket || !client_key || !client_secret) {
    var help = "";
    help += 'You have to configure the deployment settings in _config.yml first\n';
    help += 'Example:\n';
    help += '  deploy:\n';
    help += '    - type: s3-qiniu\n';
    help += '      bucket: <s3 bucket>\n';
    help += '      client_key: [client key]\n';
    help += '      client_secret: [client secret]\n';
    help += '      overwrite: <true|false>  // Optional. If true will overwrite remote files on S3. Default: false\n\n';
    help += 'For more help, you can check the docs: ' + ('http://hexo.io/docs/deployment.html');

    log.log(help);
    return;
  }

  fs.listDirSync(publicDir).forEach(file => {
    qiniuUploader.upload(bucket, client_key, client_secret, publicDir, file, overwrite)
      .then(({ data, resp }) => {
        if (resp.statusCode === 200) {
          //console.log(data);
        } else {
          console.log("file ${file} upload fail", resp.statusCode, data);
        }
      })
      .catch((err) => {
        log.log("file ${file} upload error", err);
      });
  })
};
