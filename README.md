# hexo-deployer-s3-qiniu

[Hexo](http://hexo.io/) deployer plugin for [qiniu](https://portal.qiniu.com/) S3.

## Installation

``` bash
$ npm install hexo-deployer-s3-qiniu --save
```

## Options

You can configure this plugin in `_config.yml`.

``` yaml
# You can use this:
deploy:
  type: s3-qiniu
    bucket: <S3 bucket>
    client_key: <client key>
    client_secret: <client secret>
    overwrite: false // Optional if true will overwrite remote files on S3. Default: false
```

## Contributors
- Connor Ma ([Connor](https://github.com/matian2014))

## License

MIT
