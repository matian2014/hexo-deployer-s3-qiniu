

const qiniu = require('qiniu');

function upload(bucket, ak, sk, dir, filename, overwriteRemote) {
  let uploadToken = getToken(ak, sk, bucket, overwriteRemote, filename);
  const config = new qiniu.conf.Config();
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  return formUploader
    .putFile(uploadToken, filename, dir + "/" + filename, putExtra);
}

const getToken = (ak, sk, bucket, overwrite, fileKey) => {
  const mac = new qiniu.auth.digest.Mac(ak, sk);
  const options = {
    scope: overwrite ? bucket + ":" + fileKey : bucket,
    returnBody:
      '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  return uploadToken;
}


module.exports = {
  upload: upload,
}