import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const googleClientId = process.env.client_id;
const googleClientSecret = process.env.client_secret;

export const oauth2Client = new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
);
