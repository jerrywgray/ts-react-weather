declare namespace NodeJS {
    export interface ProcessEnv {
       // [key: string]: string | undefined;
        NODE_ENV: "production" | "development";
        ANALYZE: "true" | "false";
    }
}
