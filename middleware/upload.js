const {Storage} = require("@google-cloud/storage")
const multer = require("multer");


const upload = multer({
    storage: multer.memoryStorage(),
}).single('file');

const storage = new Storage({
    credentials: JSON.parse(process.env.GCS_SERVICE_ACCOUNT)
})

const bucketName = process.env.BUCKET_NAME
const bucket = storage.bucket(bucketName)


module.exports = {
    upload,
    bucket,
}