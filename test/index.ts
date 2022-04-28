
import {TsExpressApplication} from "../src"

import {
    crossOrigin,
    jwtAuth,
    roleAuth,
    resultHandler
} from "./middleware"

let App = new TsExpressApplication({
    interceptors: [crossOrigin, jwtAuth],
    resultHandler: resultHandler
});

App.start().catch();


