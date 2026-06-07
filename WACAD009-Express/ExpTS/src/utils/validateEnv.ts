import {
    cleanEnv,
    port,
    str
} from "envalid";

export function validateEnv() {
    return cleanEnv(process.env, {
        PORT: port(),
        LOG_DIR: str(),
        LOG_FORMAT: str()
    });
}