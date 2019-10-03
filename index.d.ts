import {Response} from "express-serve-static-core";

declare module "express-serve-static-core" {
    export interface Response {
        promiseRender: (view: string, options?: object) => Promise<string>;
    }
}
declare function promiseRender(): void;

export default promiseRender;