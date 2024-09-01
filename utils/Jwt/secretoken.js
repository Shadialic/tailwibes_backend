import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); 

export const createSecretToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET_KEY, {
    expiresIn: 3 * 24 * 60 * 60, 
  });
};
