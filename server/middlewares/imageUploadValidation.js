import multer from 'multer';
import isEmpty from 'lodash/isEmpty';

const imageUploadValidation = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    if (!isEmpty(file)) {
      const isPhoto = file.mimetype.startsWith('image/');
      if (isPhoto) {
        return next(null, true);
      }
      return next({ message: 'File type is invalid' }, false);
    }
    next();
  }
};

export default imageUploadValidation;
