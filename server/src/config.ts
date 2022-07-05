import "dotenv/config";
import Joi from "joi";

let config: IConfig | undefined;

export const GetConfig = (): IConfig => {
  if (config) {
    return config;
  }

  const envConfig = {
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
  };

  const validation = ConfigSchema.validate(envConfig, { abortEarly: false });

  if (validation.error) {
    console.error(
      "GetConfig configuration validation errors found",
      validation.error
    );
    throw new Error("Configuration Invalid");
  }

  console.debug("Configuration parsed: ", validation.value);

  config = validation.value;

  return validation.value;
};

const ConfigSchema = Joi.object({
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  PORT: Joi.number().default(3000).optional(),
}).required();

export interface IConfig {
  DATABASE_NAME: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  PORT: number;
}
