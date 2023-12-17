const {Storage} = require("@google-cloud/storage")
const multer = require("multer");


const upload = multer({
    storage: multer.memoryStorage(),
}).single('file');

const storage = new Storage({
    keyFilename:"backend-capstone-406208-c6bed76849f3.json",
})

const bucketName = process.env.BUCKET_NAME
const bucket = storage.bucket(bucketName)


module.exports = {
    upload,
    bucket,
}