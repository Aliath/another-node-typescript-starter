import dotenv from 'dotenv';

dotenv.config();

export const config = {
  serverPort: process.env.PORT,
};
