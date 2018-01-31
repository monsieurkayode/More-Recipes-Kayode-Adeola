import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

import db from '../models/index';

dotenv.config();

const Recipe = db.Recipe;
const User = db.User;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const reviewNotification = (req, res, next) => {
  Recipe
    .findOne({
      where: { id: req.params.recipeId },
      include: {
        model: User,
        attributes: ['email']
      }
    })
    .then((recipe) => {
      const mailOptions = {
        to: recipe.User.email,
        from: 'More-Recipes <monsieurkayode@gmail.com>',
        subject: 'You have a new notification',
        text: `from ${req.decoded.user.username}`,
        html: `<strong>${req.decoded.user.username}
        commented on your recipe post
        </strong>
        <p>${req.body.comment}</p>
        `,
      };

      sgMail.send(mailOptions);
      next();
    });
};

export default reviewNotification;
