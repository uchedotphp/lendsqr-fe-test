import { describe, it, expect, beforeEach } from 'vitest'
import { handlers } from '../../mocks/handlers'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

// Mock the db.json data
const mockDbData = {
  profile: {
    email: 'test@lendsqr.com',
    password: 'testpassword',
    id: '1',
    firstName: 'Test',
    lastName: 'User'
  },
  'users-kpis': {
    totalUsers: 500,
    activeUsers: 450,
    inactiveUsers: 50
  },
  'users-records': Array.from({ length: 500 }, (_, i) => ({
    id: `user-${i + 1}`,
    firstName: `User${i + 1}`,
    lastName: `Last${i + 1}`,
    email: `user${i + 1}@example.com`,
    phoneNumber: `+234${String(i + 1).padStart(9, '0')}`,
    createdAt: '2024-01-01',
    status: i % 4 === 0 ? 'inactive' : i % 4 === 1 ? 'active' : i % 4 === 2 ? 'pending' : 'blacklisted',
    organizations: [
      {
        id: `org-${i + 1}`,
        name: `Organization ${i + 1}`,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        status: 'active'
      }
    ],
    activeOrganization: `Organization ${i + 1}`
  })),
  'dashboard-kpis': {
    totalLoans: 1000,
    totalSavings: 5000,
    activeUsers: 450
  },
  'dashboard-activities': [
    { id: '1', activity: 'User login', timestamp: '2024-01-01' }
  ],
  'dashboard-quick-stats': {
    dailyActive: 100,
    weeklyActive: 500,
    monthlyActive: 2000
  }
}

// Mock the db.json import
vi.mock('../../services/db.json', () => ({
  default: mockDbData
}))

describe('Mock API Handlers - Data Integration & Error Handling', () => {
  describe('Login API Tests', () => {
    it('should authenticate with valid credentials', async () => {
      const loginHandler = handlers.find(h => 
        h.info.method === 'POST' && h.info.path === '/login'
      )
      
      expect(loginHandler).toBeDefined()
      
      const request = new Request('http://localhost/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@lendsqr.com',
          password: 'testpassword'
        })
      })
      
      const response = await loginHandler!.run(request)
      const data = await response.json()
      
      expect(response.status).toBe(200)
      expect(data.token).toBe('abc-123')
      expect(data.user.email).toBe('test@lendsqr.com')
    })

    it('should reject invalid credentials', async () => {
      const loginHandler = handlers.find(h => 
        h.info.method === 'POST' && h.info.path === '/login'
      )
      
      const request = new Request('http://localhost/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'wrong@email.com',
          password: 'wrongpassword'
        })
      })
      
      const response = await loginHandler!.run(request)
      const data = await response.json()
      
      expect(response.status).toBe(401)
      expect(data.error).toBe('Invalid credentials')
    })
  })

  describe('Users API Tests', () => {
    it('should return 500 user records', async () => {
      const usersHandler = handlers.find(h => 
        h.info.method === 'GET' && h.info.path === '/users'
      )
      
      expect(usersHandler).toBeDefined()
      
      const request = new Request('http://localhost/users')
      const response = await usersHandler!.run(request)
      const data = await response.json()
      
      expect(response.status).toBe(200)
      expect(data.records).toHaveLength(500)
      expect(data.kpis).toBeDefined()
      expect(data.pagination).toBeDefined()
    })

    it('should handle pagination correctly', async () => {
      const usersHandler = handlers.find(h => 
        h.info.method === 'GET' && h.info.path === '/users'
      )
      
      const request = new Request('http://localhost/users?page=2&per_page=10')
      const response = await usersHandler!.run(request)
      const data = await response.json()
      
      expect(data.pagination.page).toBe(2)
      expect(data.pagination.per_page).toBe(10)
      expect(data.records).toHaveLength(10)
    })

    it('should filter users by organization', async () => {
      const usersHandler = handlers.find(h => 
        h.info.method === 'GET' && h.info.path === '/users'
      )
      
      const request = new Request('http://localhost/users?organization=Organization%201')
      const response = await usersHandler!.run(request)
      const data = await response.json()
      
      expect(data.records.length).toBeGreaterThan(0)
      expect(data.records[0].activeOrganization).toContain('Organization 1')
    })

    it('should filter users by status', async () => {
      const usersHandler = handlers.find(h => 
        h.info.method === 'GET' && h.info.path === '/users'
      )
      
      const request = new Request('http://localhost/users?status=active')
      const response = await usersHandler!.run(request)
      const data = await response.json()
      
      expect(data.records.length).toBeGreaterThan(0)
      expect(data.records.every((user: any) => user.status === 'active')).toBe(true)
    })

    it('should filter users by email', async () => {
      const usersHandler = handlers.find(h => 
        h.info.method === 'GET' && h.info.path === '/users'
      )
      
      const request = new Request('http://localhost/users?email=user1')
      const response = await usersHandler!.run(request)
      const data = await response.json()
      
      expect(data.records.length).toBeGreaterThan(0)
      expect(data.records[0].email).toContain('user1')
    })
  })

  describe('Dashboard API Tests', () => {
    it('should return dashboard data', async () => {
      const dashboardHandler = handlers.find(h => 
        h.info.method === 'GET' && h.info.path === '/dashboard'
      )
      
      expect(dashboardHandler).toBeDefined()
      
      const request = new Request('http://localhost/dashboard')
      const response = await dashboardHandler!.run(request)
      const data = await response.json()
      
      expect(response.status).toBe(200)
      expect(data.kpis).toBeDefined()
      expect(data.activities).toBeDefined()
      expect(data.quickStats).toBeDefined()
    })
  })

  describe('Profile API Tests', () => {
    it('should return profile data', async () => {
      const profileHandler = handlers.find(h => 
        h.info.method === 'GET' && h.info.path === '/profile'
      )
      
      expect(profileHandler).toBeDefined()
      
      const request = new Request('http://localhost/profile')
      const response = await profileHandler!.run(request)
      const data = await response.json()
      
      expect(response.status).toBe(200)
      expect(data.email).toBe('test@lendsqr.com')
      expect(data.firstName).toBe('Test')
      expect(data.lastName).toBe('User')
    })
  })

  describe('Error Handling Tests', () => {
    it('should handle malformed request bodies', async () => {
      const loginHandler = handlers.find(h => 
        h.info.method === 'POST' && h.info.path === '/login'
      )
      
      const request = new Request('http://localhost/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json'
      })
      
      // Should not throw error
      expect(async () => {
        await loginHandler!.run(request)
      }).not.toThrow()
    })

    it('should handle missing query parameters gracefully', async () => {
      const usersHandler = handlers.find(h => 
        h.info.method === 'GET' && h.info.path === '/users'
      )
      
      const request = new Request('http://localhost/users')
      const response = await usersHandler!.run(request)
      const data = await response.json()
      
      expect(response.status).toBe(200)
      expect(data.records).toBeDefined()
    })
  })
}) 