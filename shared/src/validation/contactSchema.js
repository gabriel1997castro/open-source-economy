"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactFormSchema = void 0;
const zod_1 = require("zod");
exports.contactFormSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").max(255),
    email: zod_1.z.email("Invalid email format").max(255),
    linkedin: zod_1.z.url("Invalid LinkedIn URL").optional().or(zod_1.z.literal("")),
    message: zod_1.z.string().min(10, "Message must be at least 10 characters"),
});
