import { google } from "googleapis"
import userService from "../../services/user.service";
import { IUser } from "../../types/user.types";
import ErrorHandler from "../../utils/errorHandler";

const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI!;

const getOAuthClient = () => {

    const auth = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    )
    return auth
}

const getGmailClient = async (userId: string, tokens?: { access_token: string, refresh_token: string }) => {
    let auth = getOAuthClient();

    if (tokens) {
        auth.setCredentials(tokens);
    } else {
        const user: IUser = await userService.getById(userId);
        if (!user.gmail) throw new Error("User not connected to Gmail");
        auth.setCredentials({
            access_token: user.gmail.accessToken,
            refresh_token: user.gmail.refreshToken,
        });
    }

    return google.gmail({ version: "v1", auth });
}

export { getGmailClient, getOAuthClient } 
