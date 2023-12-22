/**
 * @typedef {object} PublishPhotoArgs
 * @property {string} caption
 * @property {string} imageURL
 * @property {string} location
 * @property {file} file
 */

const FormData = require("form-data");
const PhotoPostModel = require("../../model/PhotoPostModel/PhotoPostModel");
const axios = require("axios").default


async function getAllPhotoLabels(){

    const photoList = await PhotoPostModel.findAll();


        const result = photoList.map((photo) => {
            return photo.getDataValue("label");
        })

        return {
            "labels": result,
        };
}

async function getAllPhotoPost(args){
    if (args.label) {
        const photoList = await PhotoPostModel.findAll({
            where: {
                label: args.label
            }
        })

        const result = photoList.map((photo) => {
            return {
                photoPostId: photo.getDataValue("photoPostId"),
                caption: photo.getDataValue("caption"),
                label: photo.getDataValue("label"),
                location: photo.getDataValue("location"),
                imageURL: photo.getDataValue("imageURL")
            }
        })

        return result;
        
    } else {
        const photoList = await PhotoPostModel.findAll();

        const result = photoList.map((photo) => {
            return {
                photoPostId: photo.getDataValue("photoPostId"),
                caption: photo.getDataValue("caption"),
                label: photo.getDataValue("label"),
                location: photo.getDataValue("location"),
                imageURL: photo.getDataValue("imageURL")
            }
        })

        return result;
    }
}

/**@param {string} photoPostId */
async function getPhotoPostDetail(photoPostId){
    const photoPost = await PhotoPostModel.findOne({
        where: {
            photoPostId: photoPostId,
        }
    })
    
    if (!photoPost) {
        throw new Error("Photo Not Found")
    }

    return {
        photoPostId: photoPost.getDataValue("photoPostId"),
        label: photoPost.getDataValue("label"),
        caption: photoPost.getDataValue("caption"),
        imageURL: photoPost.getDataValue("imageURL"),
        location: photoPost.getDataValue("location")
    }
}

/**@param {PublishPhotoArgs} args */
async function publishPhotoPost(args){

    const url = 'https://ml-service-4unnqhcxkq-uc.a.run.app/api/v1/food-image-prediction'

    const formData = new FormData();

    formData.append('file',args.buffer,{filename: args.originalname})

    
    const labelPrediction = await axios.post(url,formData, {headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log(labelPrediction['data']['food_name'])
    const photoPost = await PhotoPostModel.create({
        caption: args.caption,
        label: labelPrediction['data']['food_name'],
        location: args.location,
        imageURL: args.imageURL
    });

    return photoPost;
    
}

module.exports = {
    getAllPhotoPost,
    getPhotoPostDetail,
    publishPhotoPost,
    getAllPhotoLabels,
}