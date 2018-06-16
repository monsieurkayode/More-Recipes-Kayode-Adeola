import express from 'express';
import auth from '../middlewares/auth';
import {
  signup,
  changePassword,
  updateUserProfile,
  getUserDetails
} from '../controllers/user';
import signin from '../controllers/login';
import {
  basicValidation,
  validateUsername,
  emailValidation,
  validUser,
  trimSpaces,
  validateProfileUpdate
} from '../middlewares/userValidation';
import imageUploader, { uploadImage } from '../middlewares/uploadImage';

const router = express.Router();
const baseUrl = '/api/v1/users';

const { validateImage } = imageUploader('imageUrl');


router.post(`${baseUrl}/signin`, signin);

router.post(`${baseUrl}/signup`,
  trimSpaces, basicValidation, validateUsername, emailValidation, signup
);

router.get(`${baseUrl}/profile`,
  auth, getUserDetails
);

router.patch(`${baseUrl}/updateprofile`,
  auth, validateImage, validateProfileUpdate, uploadImage, updateUserProfile
);

router.put(`${baseUrl}/changepassword`, auth, validUser, changePassword);

export default router;
