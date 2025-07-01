import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'

// Example test - you can delete this file after understanding the setup
describe('Example Test', () => {
  it('should render a simple component', () => {
    render(
      <BrowserRouter>
        <div data-testid="test-element">Hello World</div>
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('test-element')).toBeInTheDocument()
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
}) 