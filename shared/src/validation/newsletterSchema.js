"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsletterSchema = void 0;
const zod_1 = require("zod");
exports.newsletterSchema = zod_1.z.object({
    email: zod_1.z.email("Invalid email format").max(255),
});
