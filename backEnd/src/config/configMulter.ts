import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import multerS3 from 'multer-s3'
import S3 from '../config/configS3'

const allowedMovieMimes = [
    'video/gif',
    'video/mp4',
    'video/ogg',
    'video/wmv',
    'video/x-flv',
    'video/avi',
    'video/mkv',
    'video/x-matroska',
    'video/avchd',
    'video/mov',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/gif',
];

const allowedPictureMimes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/gif',
];

const localStorage = multer.diskStorage({
    destination: (req, file, done) => {
        if (allowedPictureMimes.includes(file.mimetype))
            return done(null, path.resolve(__dirname, '../data', 'public', 'pictures'));

        if (allowedMovieMimes.includes(file.mimetype))
            return done(null, path.resolve(__dirname, '../data', 'private', 'movies'));

        return done(null, path.resolve(__dirname, '../data', 'private', 'others'));
    },
    filename: (req, file, done) => {
        crypto.randomBytes(16, (err, hash) => {
            if (err)
                return done(err, '');

            const fileExt = file.originalname.split('.');

            file.originalname = `${hash.toString("hex")}.${fileExt[fileExt.length - 1]}`;
            return done(null, file.originalname);
        });
    }
});

const S3Storage = multerS3({
    s3: S3,
    bucket: 'yourvideotape2',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
            if (err)
                cb(err);

            var folder = 'Others';
            if (allowedPictureMimes.includes(file.mimetype)) {
                folder = 'Pictures';
            } else if (allowedMovieMimes.includes(file.mimetype)) {
                folder = 'Movies';
            }

            const fileExt = file.originalname.split('.');

            const fileName = `${folder}/${hash.toString("hex")}.${fileExt[fileExt.length - 1]}`;

            file.originalname = `${hash.toString("hex")}.${fileExt[fileExt.length - 1]}`;

            cb(null, fileName);
        });
    },
})

const uploads = {
    local: multer({ storage: localStorage }),
    S3: multer({ storage: (process.env.SMODE == 'PROD' ? S3Storage : localStorage) })
};

export default uploads;