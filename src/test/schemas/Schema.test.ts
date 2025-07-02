import { describe, it, expect } from 'vitest'
import { LoginSchema, StatusSchema, UserRoleSchema, UserProfileSchema } from '../../schemas/Schema'

describe('Schema Validation Tests - Positive & Negative Scenarios', () => {
  describe('LoginSchema Tests', () => {
    it('should validate correct login data', () => {
      const validData = {
        email: 'test@lendsqr.com',
        password: 'validpassword123'
      }

      const result = LoginSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email format', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'validpassword123'
      }

      const result = LoginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('valid email address')
      }
    })

    it('should reject password that is too short', () => {
      const invalidData = {
        email: 'test@lendsqr.com',
        password: '123'
      }

      const result = LoginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 4 character')
      }
    })

    it('should reject empty email', () => {
      const invalidData = {
        email: '',
        password: 'validpassword123'
      }

      const result = LoginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject empty password', () => {
      const invalidData = {
        email: 'test@lendsqr.com',
        password: ''
      }

      const result = LoginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('StatusSchema Tests', () => {
    it('should accept valid status values', () => {
      const validStatuses = ['inactive', 'active', 'pending', 'blacklisted']
      
      validStatuses.forEach(status => {
        const result = StatusSchema.safeParse(status)
        expect(result.success).toBe(true)
      })
    })

    it('should reject invalid status values', () => {
      const invalidStatuses = ['invalid', 'unknown', 'deleted', '']
      
      invalidStatuses.forEach(status => {
        const result = StatusSchema.safeParse(status)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('UserRoleSchema Tests', () => {
    it('should accept valid role values', () => {
      const validRoles = ['admin', 'user', 'guest']
      
      validRoles.forEach(role => {
        const result = UserRoleSchema.safeParse(role)
        expect(result.success).toBe(true)
      })
    })

    it('should reject invalid role values', () => {
      const invalidRoles = ['superuser', 'moderator', 'anonymous', '']
      
      invalidRoles.forEach(role => {
        const result = UserRoleSchema.safeParse(role)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('UserProfileSchema Tests', () => {
    it('should validate complete user profile', () => {
      const validProfile = {
        id: 'user-123',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phoneNumber: '+2341234567890',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        status: 'active' as const,
        imgUrl: 'https://example.com/avatar.jpg',
        role: 'user' as const,
        activeOrganization: 'Lendsqr',
        organizations: [
          {
            id: 'org-1',
            name: 'Lendsqr',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            status: 'active' as const
          }
        ]
      }

      const result = UserProfileSchema.safeParse(validProfile)
      expect(result.success).toBe(true)
    })

    it('should validate user profile without optional fields', () => {
      const minimalProfile = {
        id: 'user-123',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phoneNumber: '+2341234567890',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        status: 'active' as const,
        organizations: []
      }

      const result = UserProfileSchema.safeParse(minimalProfile)
      expect(result.success).toBe(true)
    })

    it('should reject profile with invalid email', () => {
      const invalidProfile = {
        id: 'user-123',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'invalid-email',
        phoneNumber: '+2341234567890',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        status: 'active' as const,
        organizations: []
      }

      const result = UserProfileSchema.safeParse(invalidProfile)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('valid email address')
      }
    })

    it('should reject profile with invalid status', () => {
      const invalidProfile = {
        id: 'user-123',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phoneNumber: '+2341234567890',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        status: 'invalid-status',
        organizations: []
      }

      const result = UserProfileSchema.safeParse(invalidProfile)
      expect(result.success).toBe(false)
    })

    it('should reject profile with missing required fields', () => {
      const incompleteProfile = {
        id: 'user-123',
        firstName: 'John',
        // Missing lastName, username, email, etc.
        status: 'active' as const,
        organizations: []
      }

      const result = UserProfileSchema.safeParse(incompleteProfile)
      expect(result.success).toBe(false)
    })
  })

  describe('Edge Cases Tests', () => {
    it('should handle very long email addresses', () => {
      const longEmail = 'a'.repeat(100) + '@example.com'
      const data = {
        email: longEmail,
        password: 'validpassword123'
      }

      const result = LoginSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should handle very long passwords', () => {
      const longPassword = 'a'.repeat(1000)
      const data = {
        email: 'test@lendsqr.com',
        password: longPassword
      }

      const result = LoginSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should handle minimum valid password length', () => {
      const minPassword = '1234' // Exactly 4 characters
      const data = {
        email: 'test@lendsqr.com',
        password: minPassword
      }

      const result = LoginSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should handle password with exactly 3 characters (invalid)', () => {
      const shortPassword = '123' // Exactly 3 characters
      const data = {
        email: 'test@lendsqr.com',
        password: shortPassword
      }

      const result = LoginSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })
}) 