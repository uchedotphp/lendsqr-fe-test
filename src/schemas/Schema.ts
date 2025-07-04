import * as z from "zod/v4";

export const LoginSchema = z.object({
    email: z.email('Email must be a valid email address').min(1),
    password: z.string('Password is required').min(4, 'Password must be at least 4 character long'),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const StatusSchema = z.enum(['inactive', 'active', 'pending', 'blacklisted']);
export type StatusSchemaType = z.infer<typeof StatusSchema>;

export const UserRoleSchema = z.enum(['admin', 'user', 'guest']);
export type UserRoleSchemaType = z.infer<typeof UserRoleSchema>;

export const UserProfileSchema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    status: StatusSchema,
    createdAt: z.string(),
    organizations: z.array(z.string()).optional(),
    activeOrganization: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
});
export type UserProfileSchemaType = z.infer<typeof UserProfileSchema>;
