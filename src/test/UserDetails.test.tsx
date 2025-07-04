import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import UserDetails from '../pages/users/UserDetails'

// Mock fetch globally
global.fetch = vi.fn()

// Mock localStorage
const localStorageMock = {
  get: vi.fn(),
  set: vi.fn(),
  clear: vi.fn()
}

vi.mock('../utils/helpers', () => ({
  localStorage: localStorageMock
}))

describe('UserDetails Component - Data Integration & User Experience', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.get.mockClear()
    localStorageMock.set.mockClear()
  })

  describe('Data Fetching Tests', () => {
    it('should fetch and display user details from API when not in localStorage', async () => {
      const mockUserData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'Grace',
        lastName: 'Efiom',
        email: 'grace.efiom@example.com',
        phoneNumber: '+2347063596425',
        status: 'active',
        username: 'grace_efiom',
        createdAt: '2023-01-26T05:19:35.770Z',
        organizations: ['Bank A'],
        activeOrganization: 'Bank A'
      }

      localStorageMock.get.mockReturnValue(null)
      ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserData
      })

      render(
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      )

      // Check that fetch was called
      expect(fetch).toHaveBeenCalledWith('/users/550e8400-e29b-41d4-a716-446655440000')

      // Wait for data to load and check display
      await waitFor(() => {
        expect(screen.getByText('Grace Efiom')).toBeInTheDocument()
        expect(screen.getByText('550e8400-e29b-41d4-a716-446655440000')).toBeInTheDocument()
      })

      // Check that data was stored in localStorage
      expect(localStorageMock.set).toHaveBeenCalledWith(
        'user_550e8400-e29b-41d4-a716-446655440000',
        expect.objectContaining(mockUserData)
      )
    })

    it('should load user details from localStorage when available', async () => {
      const mockStoredData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'Grace',
        lastName: 'Efiom',
        personalInfo: {
          fullName: 'Grace Efiom',
          phoneNumber: '+2347063596425',
          emailAddress: 'grace.efiom@example.com'
        }
      }

      localStorageMock.get.mockReturnValue(mockStoredData)

      render(
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      )

      // Should not call fetch when data is in localStorage
      expect(fetch).not.toHaveBeenCalled()

      // Should display data from localStorage
      await waitFor(() => {
        expect(screen.getByText('Grace Efiom')).toBeInTheDocument()
      })
    })

    it('should handle API error gracefully', async () => {
      localStorageMock.get.mockReturnValue(null)
      ;(fetch as any).mockRejectedValueOnce(new Error('Network error'))

      render(
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      )

      // Should still render the component even if API fails
      expect(screen.getByText('Loading user details...')).toBeInTheDocument()
    })

    it('should handle user not found', async () => {
      localStorageMock.get.mockReturnValue(null)
      ;(fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404
      })

      render(
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      )

      await waitFor(() => {
        expect(screen.getByText('User not found')).toBeInTheDocument()
      })
    })
  })

  describe('Visual Fidelity Tests', () => {
    it('should render user details with correct structure', async () => {
      const mockUserData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'Grace',
        lastName: 'Efiom',
        personalInfo: {
          fullName: 'Grace Efiom',
          phoneNumber: '+2347063596425',
          emailAddress: 'grace.efiom@example.com'
        }
      }

      localStorageMock.get.mockReturnValue(mockUserData)

      render(
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      )

      // Check for essential visual elements
      expect(screen.getByText('Grace Efiom')).toBeInTheDocument()
      expect(screen.getByText('Blacklist User')).toBeInTheDocument()
      expect(screen.getByText('Activate User')).toBeInTheDocument()
      expect(screen.getByText('Personal Information')).toBeInTheDocument()
    })

    it('should display user information correctly', async () => {
      const mockUserData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'Grace',
        lastName: 'Efiom',
        personalInfo: {
          fullName: 'Grace Efiom',
          phoneNumber: '+2347063596425',
          emailAddress: 'grace.efiom@example.com',
          bvn: '12345678901',
          gender: 'Female',
          maritalStatus: 'Single',
          children: 'None',
          typeOfResidence: 'Parent\'s Apartment'
        }
      }

      localStorageMock.get.mockReturnValue(mockUserData)

      render(
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      )

      await waitFor(() => {
        expect(screen.getByText('Grace Efiom')).toBeInTheDocument()
        expect(screen.getByText('+2347063596425')).toBeInTheDocument()
        expect(screen.getByText('grace.efiom@example.com')).toBeInTheDocument()
        expect(screen.getByText('12345678901')).toBeInTheDocument()
        expect(screen.getByText('Female')).toBeInTheDocument()
        expect(screen.getByText('Single')).toBeInTheDocument()
        expect(screen.getByText('None')).toBeInTheDocument()
        expect(screen.getByText('Parent\'s Apartment')).toBeInTheDocument()
      })
    })
  })

  describe('Tab Navigation Tests', () => {
    it('should switch between tabs correctly', async () => {
      const mockUserData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'Grace',
        lastName: 'Efiom',
        personalInfo: {
          fullName: 'Grace Efiom',
          phoneNumber: '+2347063596425',
          emailAddress: 'grace.efiom@example.com'
        },
        educationAndEmployment: {
          levelOfEducation: 'B.Sc',
          employmentStatus: 'Employed',
          sectorOfEmployment: 'FinTech',
          durationOfEmployment: '2-3 years',
          officeEmail: 'grace.efiom@lendsqr.com',
          monthlyIncome: '₦200,000.00-₦400,000.00',
          loanRepayment: '₦40,000.00'
        },
        socials: {
          twitter: '@grace_efiom',
          facebook: 'Grace Efiom',
          instagram: '@grace_efiom'
        },
        guarantor: {
          fullName: 'Debby Ogana',
          phoneNumber: '07060780922',
          emailAddress: 'debby@gmail.com',
          relationship: 'Sister'
        },
        bankDetails: {
          bankName: 'Providus Bank',
          accountNumber: '9912345678',
          accountName: 'Grace Efiom'
        }
      }

      localStorageMock.get.mockReturnValue(mockUserData)

      render(
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      )

      // Initially should show Personal Information tab
      await waitFor(() => {
        expect(screen.getByText('Grace Efiom')).toBeInTheDocument()
        expect(screen.getByText('+2347063596425')).toBeInTheDocument()
      })

      // Click on Education and Employment tab
      const educationTab = screen.getByText('Education and Employment')
      fireEvent.click(educationTab)

      await waitFor(() => {
        expect(screen.getByText('B.Sc')).toBeInTheDocument()
        expect(screen.getByText('Employed')).toBeInTheDocument()
        expect(screen.getByText('FinTech')).toBeInTheDocument()
      })

      // Click on Socials tab
      const socialsTab = screen.getByText('Socials')
      fireEvent.click(socialsTab)

      await waitFor(() => {
        expect(screen.getByText('@grace_efiom')).toBeInTheDocument()
        expect(screen.getByText('Grace Efiom')).toBeInTheDocument()
      })

      // Click on Guarantor tab
      const guarantorTab = screen.getByText('Guarantor')
      fireEvent.click(guarantorTab)

      await waitFor(() => {
        expect(screen.getByText('Debby Ogana')).toBeInTheDocument()
        expect(screen.getByText('07060780922')).toBeInTheDocument()
        expect(screen.getByText('Sister')).toBeInTheDocument()
      })

      // Click on Bank Details tab
      const bankTab = screen.getByText('Bank Details')
      fireEvent.click(bankTab)

      await waitFor(() => {
        expect(screen.getByText('Providus Bank')).toBeInTheDocument()
        expect(screen.getByText('9912345678')).toBeInTheDocument()
      })
    })

    it('should highlight active tab correctly', async () => {
      const mockUserData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'Grace',
        lastName: 'Efiom',
        personalInfo: {
          fullName: 'Grace Efiom',
          phoneNumber: '+2347063596425',
          emailAddress: 'grace.efiom@example.com'
        }
      }

      localStorageMock.get.mockReturnValue(mockUserData)

      render(
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      )

      // Personal Information should be active by default
      const personalInfoTab = screen.getByText('Personal Information')
      expect(personalInfoTab).toHaveClass('pages__user__tabs__nav_item__active')

      // Click on another tab
      const educationTab = screen.getByText('Education and Employment')
      fireEvent.click(educationTab)

      await waitFor(() => {
        expect(educationTab).toHaveClass('pages__user__tabs__nav_item__active')
        expect(personalInfoTab).not.toHaveClass('pages__user__tabs__nav_item__active')
      })
    })
  })

  describe('User Actions Tests', () => {
    it('should render action buttons correctly', async () => {
      const mockUserData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'Grace',
        lastName: 'Efiom',
        personalInfo: {
          fullName: 'Grace Efiom',
          phoneNumber: '+2347063596425',
          emailAddress: 'grace.efiom@example.com'
        }
      }

      localStorageMock.get.mockReturnValue(mockUserData)

      render(
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      )

      await waitFor(() => {
        expect(screen.getByText('Blacklist User')).toBeInTheDocument()
        expect(screen.getByText('Activate User')).toBeInTheDocument()
      })
    })

    it('should handle action button clicks', async () => {
      const mockUserData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'Grace',
        lastName: 'Efiom',
        personalInfo: {
          fullName: 'Grace Efiom',
          phoneNumber: '+2347063596425',
          emailAddress: 'grace.efiom@example.com'
        }
      }

      localStorageMock.get.mockReturnValue(mockUserData)

      render(
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      )

      await waitFor(() => {
        const blacklistButton = screen.getByText('Blacklist User')
        const activateButton = screen.getByText('Activate User')

        fireEvent.click(blacklistButton)
        fireEvent.click(activateButton)

        // Buttons should be clickable (no errors thrown)
        expect(blacklistButton).toBeInTheDocument()
        expect(activateButton).toBeInTheDocument()
      })
    })
  })

  describe('Responsive Design Tests', () => {
    it('should maintain functionality on different screen sizes', async () => {
      const mockUserData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        firstName: 'Grace',
        lastName: 'Efiom',
        personalInfo: {
          fullName: 'Grace Efiom',
          phoneNumber: '+2347063596425',
          emailAddress: 'grace.efiom@example.com'
        }
      }

      localStorageMock.get.mockReturnValue(mockUserData)

      // Test mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })

      render(
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      )

      await waitFor(() => {
        expect(screen.getByText('Grace Efiom')).toBeInTheDocument()
        expect(screen.getByText('Blacklist User')).toBeInTheDocument()
        expect(screen.getByText('Activate User')).toBeInTheDocument()
      })

      // Test desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      })

      // Re-render for desktop
      render(
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      )

      await waitFor(() => {
        expect(screen.getByText('Grace Efiom')).toBeInTheDocument()
        expect(screen.getByText('Blacklist User')).toBeInTheDocument()
        expect(screen.getByText('Activate User')).toBeInTheDocument()
      })
    })
  })

  describe('Error Handling Tests', () => {
    it('should handle malformed user data gracefully', async () => {
      const malformedData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        // Missing required fields
      }

      localStorageMock.get.mockReturnValue(malformedData)

      render(
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      )

      // Should not crash with malformed data
      await waitFor(() => {
        expect(screen.getByText('550e8400-e29b-41d4-a716-446655440000')).toBeInTheDocument()
      })
    })

    it('should handle localStorage errors gracefully', async () => {
      localStorageMock.get.mockImplementation(() => {
        throw new Error('localStorage error')
      })

      render(
        <BrowserRouter>
          <UserDetails />
        </BrowserRouter>
      )

      // Should not crash with localStorage errors
      expect(screen.getByText('Loading user details...')).toBeInTheDocument()
    })
  })
}) 