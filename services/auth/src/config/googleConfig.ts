import {google} from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const gooogle_clint_id = process.env.client_id;
const google_client_secret = process.env.client_secret;


const oauth2clint = new google.auth.OAuth2(gooogle_clint_id, google_client_secret);
