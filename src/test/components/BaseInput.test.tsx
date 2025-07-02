import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import BaseInput from '../../components/ui/inputs/BaseInput'

// Test schema
const TestSchema = z.object({
  testField: z.string().min(1, 'This field is required')
})

type TestFormData = z.infer<typeof TestSchema>

// Test component wrapper
const TestComponent = ({ name = 'testField', ...props }: any) => {
  const { control } = useForm<TestFormData>({
    resolver: zodResolver(TestSchema),
    mode: 'onChange'
  })

  return (
    <BaseInput
      control={control}
      name={name}
      {...props}
    />
  )
}

describe('BaseInput Component - Form Integration & Visual States', () => {
  describe('Visual Fidelity Tests', () => {
    it('should render input with correct structure', () => {
      render(<TestComponent />)
      
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input).toHaveClass('input__textfield')
    })

    it('should apply custom className', () => {
      render(<TestComponent className="custom-class" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('custom-class')
    })

    it('should render with disabled state', () => {
      render(<TestComponent disabled />)
      
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
    })
  })

  describe('Form Validation Tests - Positive & Negative Scenarios', () => {
    it('should show error message when validation fails', async () => {
      render(<TestComponent />)
      
      const input = screen.getByRole('textbox')
      
      // Trigger validation by blurring empty field
      fireEvent.focus(input)
      fireEvent.blur(input)
      
      await waitFor(() => {
        expect(screen.getByText('This field is required')).toBeInTheDocument()
      })
    })

    it('should hide error message when validation passes', async () => {
      render(<TestComponent />)
      
      const input = screen.getByRole('textbox')
      
      // Enter valid value
      fireEvent.change(input, { target: { value: 'valid input' } })
      fireEvent.blur(input)
      
      await waitFor(() => {
        expect(screen.queryByText('This field is required')).not.toBeInTheDocument()
      })
    })

    it('should not show error when field is focused', async () => {
      render(<TestComponent />)
      
      const input = screen.getByRole('textbox')
      
      // Trigger validation
      fireEvent.focus(input)
      fireEvent.blur(input)
      
      await waitFor(() => {
        expect(screen.getByText('This field is required')).toBeInTheDocument()
      })
      
      // Focus again - error should be hidden
      fireEvent.focus(input)
      expect(screen.queryByText('This field is required')).not.toBeInTheDocument()
    })
  })

  describe('User Interaction Tests', () => {
    it('should handle focus and blur events', () => {
      render(<TestComponent />)
      
      const input = screen.getByRole('textbox')
      
      // Test focus
      fireEvent.focus(input)
      expect(input).toHaveClass('input__textfield--focus')
      
      // Test blur
      fireEvent.blur(input)
      expect(input).not.toHaveClass('input__textfield--focus')
    })

    it('should handle hover events', () => {
      render(<TestComponent />)
      
      const input = screen.getByRole('textbox')
      
      // Test mouse enter
      fireEvent.mouseEnter(input)
      expect(input).toHaveClass('input__textfield--hover')
      
      // Test mouse leave
      fireEvent.mouseLeave(input)
      expect(input).not.toHaveClass('input__textfield--hover')
    })

    it('should handle input changes', async () => {
      render(<TestComponent />)
      
      const input = screen.getByRole('textbox')
      const testValue = 'test input value'
      
      fireEvent.change(input, { target: { value: testValue } })
      
      await waitFor(() => {
        expect(input).toHaveValue(testValue)
      })
    })
  })

  describe('Accessibility Tests', () => {
    it('should have proper ARIA attributes', () => {
      render(<TestComponent aria-label="Test input" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-label', 'Test input')
    })

    it('should be keyboard navigable', () => {
      render(<TestComponent />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('tabIndex', '0')
    })
  })

  describe('Error State Visual Tests', () => {
    it('should apply error styling when validation fails', async () => {
      render(<TestComponent />)
      
      const input = screen.getByRole('textbox')
      
      // Trigger validation error
      fireEvent.focus(input)
      fireEvent.blur(input)
      
      await waitFor(() => {
        expect(input).toHaveClass('input__textfield--error-state')
      })
    })

    it('should show error message with correct styling', async () => {
      render(<TestComponent />)
      
      const input = screen.getByRole('textbox')
      
      // Trigger validation error
      fireEvent.focus(input)
      fireEvent.blur(input)
      
      await waitFor(() => {
        const errorMessage = screen.getByText('This field is required')
        expect(errorMessage).toHaveClass('input__textfield--error-state-text')
      })
    })
  })
}) 