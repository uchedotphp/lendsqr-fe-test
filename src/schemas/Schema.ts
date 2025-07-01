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
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    email: z.email(),
    phoneNumber: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    status: StatusSchema,
    imgUrl: z.string().optional(),
    role: UserRoleSchema.optional(),
    activeOrganization: z.string().optional(),
    organizations: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            createdAt: z.string(),
            updatedAt: z.string(),
            status: StatusSchema,
        })
    ),
});
export type UserProfileSchemaType = z.infer<typeof UserProfileSchema>;
