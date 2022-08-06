import dotenv from "dotenv";
import Joi from "joi";
import { logger } from "./logger";

dotenv.config();

interface Config {
  MODE: "development" | "production";
  SERVER_HOST: string;
  SERVER_PORT: string;
  MONGO_URI: string;
  API_VERSION: string;
}

const schema = Joi.object<Config, true>({
  MODE: Joi.string().valid(...["development", "production"]),
  SERVER_HOST: Joi.string().required(),
  SERVER_PORT: Joi.string().required(),
  MONGO_URI: Joi.string().required(),
  API_VERSION: Joi.string().required(),
});

const result = schema.validate(process.env, {
  stripUnknown: true,
});

if (result.error) {
  logger.error("Environment variables are not valid!");
  throw result.error.message;
}

export const config = result.value;
