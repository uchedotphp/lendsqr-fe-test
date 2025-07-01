import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import NotFound from '../NotFound'

// Mock the GoBack component
vi.mock('@components/goback/GoBack', () => ({
  default: ({ label }: { label: string }) => (
    <button data-testid="go-back-button">{label}</button>
  ),
}))

describe('NotFound', () => {
  it('should render with default props', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Page not found')).toBeInTheDocument()
    expect(screen.getByText(/The page you're looking for doesn't exist/)).toBeInTheDocument()
    expect(screen.getByTestId('go-back-button')).toBeInTheDocument()
    expect(screen.getByText('Go Back')).toBeInTheDocument()
  })

  it('should render with custom message', () => {
    const customMessage = 'Custom error message'
    
    render(
      <BrowserRouter>
        <NotFound message={customMessage} />
      </BrowserRouter>
    )

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText(customMessage)).toBeInTheDocument()
    expect(screen.getByTestId('go-back-button')).toBeInTheDocument()
  })

  it('should not render back button when showBackButton is false', () => {
    render(
      <BrowserRouter>
        <NotFound showBackButton={false} />
      </BrowserRouter>
    )

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Page not found')).toBeInTheDocument()
    expect(screen.queryByTestId('go-back-button')).not.toBeInTheDocument()
  })

  it('should render with both custom props', () => {
    const customMessage = 'Something went wrong'
    
    render(
      <BrowserRouter>
        <NotFound 
          message={customMessage} 
          showBackButton={false} 
        />
      </BrowserRouter>
    )

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText(customMessage)).toBeInTheDocument()
    expect(screen.queryByTestId('go-back-button')).not.toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )

    // Check for proper heading structure
    const h1 = screen.getByRole('heading', { level: 1 })
    const h2 = screen.getByRole('heading', { level: 2 })
    
    expect(h1).toHaveTextContent('404')
    expect(h2).toHaveTextContent('Page not found')
  })
}) 