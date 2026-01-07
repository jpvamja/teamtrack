import Joi from "joi";

export const createOrganizationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
});

export const inviteMemberSchema = Joi.object({
    orgId: Joi.string().required(),
    userId: Joi.string().required(),
});
