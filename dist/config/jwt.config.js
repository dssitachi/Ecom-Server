"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const app_config_1 = require("./app.config");
exports.jwtConfig = {
    useFactory: () => {
        return {
            secret: (0, app_config_1.default)().appSecret,
            signOptions: { expiresIn: '1d' }
        };
    }
};
//# sourceMappingURL=jwt.config.js.map