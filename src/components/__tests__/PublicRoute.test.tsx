import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import PublicRoute from '../PublicRoute'

// Mock the auth service
vi.mock('@services/auth', () => ({
  isAuthenticated: vi.fn(),
}))

const mockIsAuthenticated = vi.mocked(await import('@services/auth')).isAuthenticated

const TestComponent = () => <div data-testid="public-content">Public Content</div>

describe('PublicRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render children when user is not authenticated', () => {
    mockIsAuthenticated.mockReturnValue(false)

    render(
      <BrowserRouter>
        <PublicRoute>
          <TestComponent />
        </PublicRoute>
      </BrowserRouter>
    )

    expect(screen.getByTestId('public-content')).toBeInTheDocument()
  })

  it('should not render children when user is authenticated', () => {
    mockIsAuthenticated.mockReturnValue(true)

    render(
      <BrowserRouter>
        <PublicRoute>
          <TestComponent />
        </PublicRoute>
      </BrowserRouter>
    )

    expect(screen.queryByTestId('public-content')).not.toBeInTheDocument()
  })

  it('should handle multiple children correctly', () => {
    mockIsAuthenticated.mockReturnValue(false)

    render(
      <BrowserRouter>
        <PublicRoute>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </PublicRoute>
      </BrowserRouter>
    )

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
  })
}) 