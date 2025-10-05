import { GoogleGenAI } from "@google/genai";
import { geminiKey } from "../constant";


const ai = new GoogleGenAI({apiKey : geminiKey})


export default ai
