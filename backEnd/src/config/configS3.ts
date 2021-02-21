import aws from 'aws-sdk'

export default new aws.S3({
    accessKeyId: 'AKIAUTKVQMYVKYIWIZX7',
    secretAccessKey: '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',
    region: 'sa-east-1',
    sslEnabled: false//process.env.USE_SSL ? true : false
});

