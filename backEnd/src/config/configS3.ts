import aws from 'aws-sdk'

export default new aws.S3({
    accessKeyId: 'hh',
    secretAccessKey: 'gg',
    region: 'sa-east-1',
    sslEnabled: false//process.env.USE_SSL ? true : false
});

