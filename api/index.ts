import "dotenv/config";
import { createApp } from "../server/app";

const app = await createApp();

export default app;
