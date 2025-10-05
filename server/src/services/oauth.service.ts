import ErrorHandler from "../utils/errorHandler";
import { IGmail } from "../types/user.types";
import userService from "./user.service";
import gmailService from "./gmail.service";
import { getGmailClient, getOAuthClient } from "../config/oauth";

const oauthService = {

    async getOAuthUrl(){

        const auth = getOAuthClient() 
        
        const SCOPES = [
            "https://www.googleapis.com/auth/gmail.send",
            "https://www.googleapis.com/auth/gmail.readonly"
        ];

        const url = auth.generateAuthUrl({
            access_type: "offline",
            prompt : "consent",
            scope: SCOPES,
        })

        return url
    },
    async handleOAuthCallback(code : string, userId : string){

        const auth = getOAuthClient()

        if (!code) throw new ErrorHandler("Missing Code", 400) 
        if(!userId) throw new ErrorHandler("Missing user id", 400)

        const { tokens } = await auth.getToken(code);

        const gmail = await getGmailClient(userId , {access_token : tokens.access_token as string , refresh_token : tokens.refresh_token as string})
        const profile = await gmail.users.getProfile({userId : "me"})
        const connectedEmail = profile.data.emailAddress

        const historyId = await gmailService.watchGmail(gmail)
         
    
        const payload : IGmail = {
            connectedEmail : connectedEmail!,
            accessToken : tokens.access_token!,
            refreshToken : tokens.refresh_token!,
            historyId : historyId!
        }
        const updated = await userService.update(userId, {gmail : payload})
        return "Gmail Connected, You can redirect to dashboard" 
    },

 }

export default oauthService
