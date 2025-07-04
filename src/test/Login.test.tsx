import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import Login from '../pages/auth/Login'
import React from 'react'

// Mock environment variables
vi.mock('import.meta.env', () => ({
  env: {
    VITE_LOGIN_EMAIL: 'test@lendsqr.com',
    VITE_LOGIN_PASS: 'testpassword'
  }
}))

// Mock react-router navigation
const mockNavigate = vi.fn()
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('Login Component - Visual Fidelity & User Experience', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    // Clear localStorage before each test
    localStorage.clear()
  })

  describe('Visual Fidelity Tests', () => {
    it('should render login form with correct structure', () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )

      // Check for essential visual elements
      expect(screen.getByText('Welcome!')).toBeInTheDocument()
      expect(screen.getByText('Enter details to login.')).toBeInTheDocument()
      expect(screen.getByText('LOG IN')).toBeInTheDocument()
      expect(screen.getByText('forgot password?')).toBeInTheDocument()
    })

    it('should render Lendsqr logo in mobile view', () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )

      // Logo should be present in mobile view (hide-desktop class)
      const logoElement = document.querySelector('.hide-desktop')
      expect(logoElement).toBeInTheDocument()
    })

    it('should render form inputs with proper labels and placeholders', () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )

      // Check for email and password inputs
      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const passwordInput = screen.getByLabelText(/password/i)
      
      expect(emailInput).toBeInTheDocument()
      expect(passwordInput).toBeInTheDocument()
    })
  })

  describe('Form Validation Tests - Positive & Negative Scenarios', () => {
    it('should validate email format correctly', async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )

      const emailInput = screen.getByRole('textbox', { name: /email/i })

      // Test invalid email format
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
      fireEvent.blur(emailInput)

      await waitFor(() => {
        expect(screen.getByText(/email must be a valid email address/i)).toBeInTheDocument()
      })

      // Test valid email format
      fireEvent.change(emailInput, { target: { value: 'valid@email.com' } })
      fireEvent.blur(emailInput)

      await waitFor(() => {
        expect(screen.queryByText(/email must be a valid email address/i)).not.toBeInTheDocument()
      })
    })

    it('should validate password length correctly', async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )

      const passwordInput = screen.getByLabelText(/password/i)

      // Test password too short
      fireEvent.change(passwordInput, { target: { value: '123' } })
      fireEvent.blur(passwordInput)

      await waitFor(() => {
        expect(screen.getByText(/password must be at least 4 character long/i)).toBeInTheDocument()
      })

      // Test valid password length
      fireEvent.change(passwordInput, { target: { value: 'validpassword' } })
      fireEvent.blur(passwordInput)

      await waitFor(() => {
        expect(screen.queryByText(/password must be at least 4 character long/i)).not.toBeInTheDocument()
      })
    })

    it('should enable submit button only when form is valid', async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /log in/i })

      // Initially button should be disabled
      expect(submitButton).toBeDisabled()

      // Fill with valid data
      fireEvent.change(emailInput, { target: { value: 'test@lendsqr.com' } })
      fireEvent.change(passwordInput, { target: { value: 'testpassword' } })

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })
    })
  })

  describe('User Interaction Tests', () => {
    it('should handle successful login with valid credentials', async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /log in/i })

      // Fill form with valid credentials
      fireEvent.change(emailInput, { target: { value: 'test@lendsqr.com' } })
      fireEvent.change(passwordInput, { target: { value: 'testpassword' } })

      // Submit form
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true })
      })
    })

    it('should display error message for invalid credentials', async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /log in/i })

      // Fill form with invalid credentials
      fireEvent.change(emailInput, { target: { value: 'wrong@email.com' } })
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })

      // Submit form
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Invalid email or password')).toBeInTheDocument()
      })

      // Should not navigate
      expect(mockNavigate).not.toHaveBeenCalled()
    })

    it('should toggle password visibility', async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )

      const passwordInput = screen.getByLabelText(/password/i)
      const toggleButton = screen.getByRole('button', { name: /show/i })

      // Initially password should be hidden
      expect(passwordInput).toHaveAttribute('type', 'password')

      // Click show button
      fireEvent.click(toggleButton)

      await waitFor(() => {
        expect(passwordInput).toHaveAttribute('type', 'text')
        expect(screen.getByRole('button', { name: /hide/i })).toBeInTheDocument()
      })

      // Click hide button
      fireEvent.click(screen.getByRole('button', { name: /hide/i }))

      await waitFor(() => {
        expect(passwordInput).toHaveAttribute('type', 'password')
        expect(screen.getByRole('button', { name: /show/i })).toBeInTheDocument()
      })
    })
  })

  describe('Responsive Design Tests', () => {
    it('should maintain form functionality on different screen sizes', () => {
      // Test mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })

      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )

      // Form should still be functional on mobile
      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /log in/i })

      expect(emailInput).toBeInTheDocument()
      expect(passwordInput).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()

      // Test desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      })

      // Re-render for desktop
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )

      // Form should still be functional on desktop
      expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
    })
  })

  describe('Error Handling Tests', () => {
    it('should handle form submission errors gracefully', async () => {
      // Mock console.error to prevent test noise
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /log in/i })

      // Fill with invalid data to trigger validation errors
      fireEvent.change(emailInput, { target: { value: 'invalid' } })
      fireEvent.change(passwordInput, { target: { value: '123' } })

      // Submit form
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Invalid email or password')).toBeInTheDocument()
      })

      consoleSpy.mockRestore()
    })
  })
}) 