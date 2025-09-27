import { config } from "dotenv";

config()

const rawPort = process.env.PORT
const port = rawPort && !isNaN(parseInt(rawPort)) ? parseInt(rawPort) : 8000

const jwtSecret = process.env.JWT_SECRET


export {port, jwtSecret}