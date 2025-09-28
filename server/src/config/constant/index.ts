import { config } from "dotenv";
import ErrorHandler from "../../utils/errorHandler";

config()

const rawPort = process.env.PORT
const port = rawPort && !isNaN(parseInt(rawPort)) ? parseInt(rawPort) : 8000

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) throw new ErrorHandler("JWT secret is not present in .env", 400)

const secret = jwtSecret.toString()


export { port, secret}
