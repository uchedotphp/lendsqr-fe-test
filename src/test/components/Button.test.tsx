import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../../components/ui/buttons/Button'

describe('Button Component - Visual States & User Interactions', () => {
  describe('Visual Fidelity Tests', () => {
    it('should render button with correct structure', () => {
      render(<Button>Click me</Button>)
      
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('base-button')
    })

    it('should apply custom className', () => {
      render(<Button className="custom-class">Click me</Button>)
      
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toHaveClass('custom-class')
    })

    it('should render with disabled state styling', () => {
      render(<Button disabled>Click me</Button>)
      
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toBeDisabled()
      expect(button).toHaveClass('base-button--disabled')
    })

    it('should render with correct button type', () => {
      render(<Button type="submit">Submit</Button>)
      
      const button = screen.getByRole('button', { name: /submit/i })
      expect(button).toHaveAttribute('type', 'submit')
    })
  })

  describe('User Interaction Tests', () => {
    it('should handle click events', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      
      const button = screen.getByRole('button', { name: /click me/i })
      fireEvent.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should not trigger click when disabled', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} disabled>Click me</Button>)
      
      const button = screen.getByRole('button', { name: /click me/i })
      fireEvent.click(button)
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('should handle keyboard events', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      
      const button = screen.getByRole('button', { name: /click me/i })
      fireEvent.keyDown(button, { key: 'Enter' })
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility Tests', () => {
    it('should have proper ARIA attributes', () => {
      render(<Button aria-label="Custom button">Click me</Button>)
      
      const button = screen.getByRole('button', { name: /custom button/i })
      expect(button).toHaveAttribute('aria-label', 'Custom button')
    })

    it('should be keyboard navigable', () => {
      render(<Button>Click me</Button>)
      
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toHaveAttribute('tabIndex', '0')
    })

    it('should not be focusable when disabled', () => {
      render(<Button disabled>Click me</Button>)
      
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toHaveAttribute('tabIndex', '-1')
    })
  })

  describe('Content Rendering Tests', () => {
    it('should render text content correctly', () => {
      render(<Button>Login Button</Button>)
      
      expect(screen.getByText('Login Button')).toBeInTheDocument()
    })

    it('should render React children correctly', () => {
      render(
        <Button>
          <span data-testid="icon">🚀</span>
          <span>Launch</span>
        </Button>
      )
      
      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(screen.getByText('Launch')).toBeInTheDocument()
    })
  })

  describe('Props Handling Tests', () => {
    it('should pass through additional props', () => {
      render(
        <Button data-testid="custom-button" data-custom="value">
          Click me
        </Button>
      )
      
      const button = screen.getByTestId('custom-button')
      expect(button).toHaveAttribute('data-custom', 'value')
    })

    it('should handle different button types', () => {
      const { rerender } = render(<Button type="button">Button</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
      
      rerender(<Button type="submit">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
      
      rerender(<Button type="reset">Reset</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset')
    })
  })
}) 