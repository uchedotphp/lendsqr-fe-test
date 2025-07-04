import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import useUser from '../hooks/useUser';
import { UserProvider } from '../state-management/context/userContext';

// Mock the API client
const mockGet = vi.fn();
vi.mock('../services/api', () => ({
  default: {
    get: mockGet,
  },
}));

describe('useUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch user data successfully', async () => {
    const mockUser = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'vasquez.mitchell@example.com',
      phoneNumber: '+11353877918',
      status: 'blacklisted' as const,
      username: 'vasquez_mitchell',
      createdAt: '2025-04-04T17:22:00.578Z',
      organizations: ['Bank A', 'Bank D'],
      activeOrganization: 'Bank A'
    };

    mockGet.mockResolvedValueOnce({ data: mockUser });

    const { result } = renderHook(() => useUser('550e8400-e29b-41d4-a716-446655440000'), {
      wrapper: UserProvider,
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockUser);
    expect(result.current.error).toBe(null);
    expect(mockGet).toHaveBeenCalledWith('/users/550e8400-e29b-41d4-a716-446655440000', expect.any(Object));
  });

  it('should handle error when user not found', async () => {
    const errorMessage = 'User not found';
    mockGet.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useUser('invalid-id'), {
      wrapper: UserProvider,
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.data).toBe(null);
  });

  it('should handle undefined userId', () => {
    const { result } = renderHook(() => useUser(undefined), {
      wrapper: UserProvider,
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('User ID is required');
    expect(result.current.data).toBe(null);
  });
}); 