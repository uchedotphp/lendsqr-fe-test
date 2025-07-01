import { describe, it, expect, beforeEach, vi } from 'vitest'
import { 
  isAuthenticated, 
  removeToken, 
  logout 
} from '../auth'

// Mock the localStorage utility
const localStorageMock = {
  get: vi.fn(),
  set: vi.fn(),
  removeItem: vi.fn(),
}

vi.mock('@utils/helpers', () => ({
  localStorage: localStorageMock,
}))

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
})

describe('Auth Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.get.mockReturnValue(null)
    localStorageMock.set.mockImplementation(() => {})
    localStorageMock.removeItem.mockImplementation(() => {})
  })

  describe('isAuthenticated', () => {
    it('should return true when both token and user data exist', () => {
      localStorageMock.get
        .mockReturnValueOnce('valid-token')
        .mockReturnValueOnce({ id: 1, name: 'Test User' })

      const result = isAuthenticated()

      expect(result).toBe(true)
    })

    it('should return false when token exists but no user data', () => {
      localStorageMock.get
        .mockReturnValueOnce('valid-token')
        .mockReturnValueOnce(null)

      const result = isAuthenticated()

      expect(result).toBe(false)
    })

    it('should return false when no token exists', () => {
      localStorageMock.get.mockReturnValue(null)

      const result = isAuthenticated()

      expect(result).toBe(false)
    })
  })

  describe('removeToken', () => {
    it('should remove both token and user data from localStorage', () => {
      removeToken()

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('userProfile')
    })
  })

  describe('logout', () => {
    it('should remove auth data and redirect to login', () => {
      logout()

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('userProfile')
      expect(window.location.href).toBe('/login')
    })
  })
}) 