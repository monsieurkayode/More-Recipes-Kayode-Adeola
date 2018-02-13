import multer from 'multer';

import cloudinary from '../config/cloudinary.config';
import imageUploadValidation from '../middlewares/imageUploadValidation';

/**
 * @function uploadImage
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * @returns {object} server response
 */
export const uploadImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  if (req.file && req.file.size > 1200000) {
    return res.status(413).send({
      status: 'fail',
      message: 'Image too large, you can upload files up to 1MB'
    });
  }
  const { buffer } = req.file;
  cloudinary.uploader.upload_stream(({ error, secure_url }) => {
    if (error) {
      res.status(503).send({
        status: 'fail',
        message: 'There was an error uploading your image'
      });
    } else {
      req.upload = secure_url; // eslint-disable-line
      next();
    }
  }).end(buffer);
};

const imageUploader = columnName => ({
  validateImage: multer(imageUploadValidation).single(columnName),
});

export default imageUploader;
