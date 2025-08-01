import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { api } from '../api';
import getProfileHttp from './get-profile.http';

// Mock the api module
vi.mock('../api', () => ({
  api: {
    get: vi.fn(),
  },
}));

const mockApi = vi.mocked(api);

describe('getProfileHttp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Happy Path', () => {
    it('should return user profile with complete data', async () => {
      // Arrange
      const mockProfile = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(mockApi.get).toHaveBeenCalledWith('auth/get-profile');
      expect(mockJsonResponse).toHaveBeenCalled();
      expect(result).toEqual(mockProfile);
    });

    it('should return user profile with null avatarUrl', async () => {
      // Arrange
      const mockProfile = {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatarUrl: null,
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result).toEqual(mockProfile);
      expect(result.avatarUrl).toBeNull();
    });

    it('should handle empty string name', async () => {
      // Arrange  
      const mockProfile = {
        name: '',
        email: 'test@example.com',
        avatarUrl: 'https://example.com/default-avatar.jpg',
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result.name).toBe('');
    });
  });

  describe('Edge Cases', () => {
    it('should handle special characters in name and email', async () => {
      // Arrange
      const mockProfile = {
        name: 'José María Aznar-López',
        email: 'josé.maría+test@example-domain.co.uk',
        avatarUrl: 'https://cdn.example.com/avatars/special-chars.png',
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result).toEqual(mockProfile);
    });

    it('should handle very long name and email values', async () => {
      // Arrange
      const longName = 'A'.repeat(1000);
      const longEmail = `${'very-long-email-prefix'.repeat(10)}@example.com`;
      const mockProfile = {
        name: longName,
        email: longEmail,
        avatarUrl: 'https://example.com/avatar.jpg',
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result.name).toBe(longName);
      expect(result.email).toBe(longEmail);
    });

    it('should handle Unicode characters in profile data', async () => {
      // Arrange
      const mockProfile = {
        name: '🚀 Test User 山田太郎',
        email: 'test.山田@例え.テスト',
        avatarUrl: 'https://example.com/unicode-avatar.jpg',
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result).toEqual(mockProfile);
    });

    it('should handle whitespace-only name', async () => {
      // Arrange
      const mockProfile = {
        name: '   ',
        email: 'whitespace@test.com',
        avatarUrl: null,
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result.name).toBe('   ');
    });
  });

  describe('API Integration', () => {
    it('should call api.get with correct endpoint', async () => {
      // Arrange
      const mockProfile = {
        name: 'Test User',
        email: 'test@example.com',
        avatarUrl: null,
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      await getProfileHttp();

      // Assert
      expect(mockApi.get).toHaveBeenCalledTimes(1);
      expect(mockApi.get).toHaveBeenCalledWith('auth/get-profile');
    });

    it('should call json() method on the response', async () => {
      // Arrange
      const mockProfile = {
        name: 'Test User',
        email: 'test@example.com',
        avatarUrl: null,
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      const mockResponse = { json: mockJsonResponse };
      mockApi.get.mockReturnValue(mockResponse as any);

      // Act
      await getProfileHttp();

      // Assert
      expect(mockJsonResponse).toHaveBeenCalledTimes(1);
      expect(mockJsonResponse).toHaveBeenCalledWith();
    });

    it('should use the api instance from ky library', async () => {
      // Arrange
      const mockProfile = {
        name: 'API Test User',
        email: 'apitest@example.com',
        avatarUrl: 'https://example.com/api-avatar.jpg',
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(mockApi.get).toHaveBeenCalledWith('auth/get-profile');
      expect(result).toEqual(mockProfile);
    });
  });

  describe('Error Handling', () => {
    it('should propagate network errors', async () => {
      // Arrange
      const networkError = new Error('Network request failed');
      mockApi.get.mockImplementation(() => {
        throw networkError;
      });

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('Network request failed');
    });

    it('should propagate JSON parsing errors', async () => {
      // Arrange
      const jsonError = new Error('Invalid JSON response');
      const mockJsonResponse = vi.fn().mockRejectedValue(jsonError);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('Invalid JSON response');
    });

    it('should handle HTTP 401 Unauthorized errors', async () => {
      // Arrange
      const httpError = new Error('HTTP 401 Unauthorized');
      const mockJsonResponse = vi.fn().mockRejectedValue(httpError);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('HTTP 401 Unauthorized');
    });

    it('should handle HTTP 403 Forbidden errors', async () => {
      // Arrange
      const httpError = new Error('HTTP 403 Forbidden');
      const mockJsonResponse = vi.fn().mockRejectedValue(httpError);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('HTTP 403 Forbidden');
    });

    it('should handle HTTP 404 Not Found errors', async () => {
      // Arrange
      const httpError = new Error('HTTP 404 Not Found');
      const mockJsonResponse = vi.fn().mockRejectedValue(httpError);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('HTTP 404 Not Found');
    });

    it('should handle timeout errors', async () => {
      // Arrange
      const timeoutError = new Error('Request timeout');
      mockApi.get.mockImplementation(() => {
        throw timeoutError;
      });

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('Request timeout');
    });

    it('should handle server errors (5xx)', async () => {
      // Arrange
      const serverError = new Error('HTTP 500 Internal Server Error');
      const mockJsonResponse = vi.fn().mockRejectedValue(serverError);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('HTTP 500 Internal Server Error');
    });

    it('should handle connection refused errors', async () => {
      // Arrange
      const connectionError = new Error('ECONNREFUSED');
      mockApi.get.mockImplementation(() => {
        throw connectionError;
      });

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('ECONNREFUSED');
    });
  });

  describe('Type Safety and Data Validation', () => {
    it('should return object with correct Response type structure', async () => {
      // Arrange
      const mockProfile = {
        name: 'Type Test User',
        email: 'type@test.com',
        avatarUrl: 'https://example.com/avatar.jpg',
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('avatarUrl');
      expect(typeof result.name).toBe('string');
      expect(typeof result.email).toBe('string');
      expect(result.avatarUrl === null || typeof result.avatarUrl === 'string').toBe(true);
    });

    it('should handle response with missing optional properties', async () => {
      // Arrange - simulate API returning minimal required data
      const mockProfile = {
        name: 'Minimal User',
        email: 'minimal@test.com',
        avatarUrl: null,
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result.avatarUrl).toBeNull();
    });

    it('should handle response with extra properties', async () => {
      // Arrange - API returns more data than expected
      const mockProfileWithExtra = {
        name: 'Extra Props User',
        email: 'extra@test.com',
        avatarUrl: 'https://example.com/avatar.jpg',
        unexpectedField: 'should be ignored by TypeScript',
        anotherField: 123,
        metadata: { created: '2024-01-01', updated: '2024-01-02' },
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfileWithExtra);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert - Should include extra properties (TypeScript doesn't strip them at runtime)
      expect(result).toEqual(mockProfileWithExtra);
    });

    it('should handle empty string values', async () => {
      // Arrange
      const mockProfile = {
        name: '',
        email: '',
        avatarUrl: '',
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result.name).toBe('');
      expect(result.email).toBe('');
      expect(result.avatarUrl).toBe('');
    });

    it('should handle malformed email addresses', async () => {
      // Arrange
      const mockProfile = {
        name: 'Malformed Email User',
        email: 'not-a-valid-email',
        avatarUrl: null,
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result.email).toBe('not-a-valid-email');
    });
  });

  describe('Performance and Behavior', () => {
    it('should be callable multiple times', async () => {
      // Arrange
      const mockProfile = {
        name: 'Multi Call User',
        email: 'multi@test.com',
        avatarUrl: null,
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result1 = await getProfileHttp();
      const result2 = await getProfileHttp();

      // Assert
      expect(mockApi.get).toHaveBeenCalledTimes(2);
      expect(result1).toEqual(mockProfile);
      expect(result2).toEqual(mockProfile);
    });

    it('should handle concurrent calls', async () => {
      // Arrange
      const mockProfile = {
        name: 'Concurrent User',
        email: 'concurrent@test.com',
        avatarUrl: 'https://example.com/concurrent-avatar.jpg',
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act - Make multiple concurrent calls
      const promises = Array.from({ length: 5 }, () => getProfileHttp());
      const results = await Promise.all(promises);

      // Assert
      expect(mockApi.get).toHaveBeenCalledTimes(5);
      results.forEach(result => {
        expect(result).toEqual(mockProfile);
      });
    });

    it('should maintain function purity (no side effects)', async () => {
      // Arrange
      const mockProfile = {
        name: 'Pure Function User',
        email: 'pure@test.com',
        avatarUrl: null,
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result1 = await getProfileHttp();
      const result2 = await getProfileHttp();

      // Assert - Results should be identical for same input
      expect(result1).toEqual(result2);
      expect(result1).not.toBe(result2); // Different object instances
    });

    it('should handle rapid sequential calls', async () => {
      // Arrange
      const mockProfile = {
        name: 'Rapid Call User',
        email: 'rapid@test.com',
        avatarUrl: 'https://example.com/rapid-avatar.jpg',
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act - Make rapid sequential calls
      const results = [];
      for (let i = 0; i < 10; i++) {
        results.push(await getProfileHttp());
      }

      // Assert
      expect(mockApi.get).toHaveBeenCalledTimes(10);
      results.forEach(result => {
        expect(result).toEqual(mockProfile);
      });
    });
  });

  describe('URL and Avatar Handling', () => {
    it('should handle various avatar URL formats', async () => {
      const testCases = [
        'https://example.com/avatar.jpg',
        'https://cdn.example.com/users/123/avatar.png',
        'http://localhost:3000/avatars/user.gif',
        'https://s3.amazonaws.com/bucket/avatar.webp',
        '/static/avatars/default.svg',
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...'
      ];

      for (const avatarUrl of testCases) {
        // Arrange
        const mockProfile = {
          name: 'Avatar Test User',
          email: 'avatar@test.com',
          avatarUrl,
        };

        const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
        mockApi.get.mockReturnValue({
          json: mockJsonResponse,
        } as any);

        // Act
        const result = await getProfileHttp();

        // Assert
        expect(result.avatarUrl).toBe(avatarUrl);
        
        // Clear mocks for next iteration
        vi.clearAllMocks();
      }
    });

    it('should handle invalid avatar URLs gracefully', async () => {
      // Arrange
      const mockProfile = {
        name: 'Invalid Avatar User',
        email: 'invalid@test.com',
        avatarUrl: 'not-a-valid-url',
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result.avatarUrl).toBe('not-a-valid-url');
    });
  });

  describe('Real-world Scenarios', () => {
    it('should handle typical user profile data', async () => {
      // Arrange
      const mockProfile = {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        avatarUrl: 'https://gravatar.com/avatar/1234567890abcdef',
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result).toEqual(mockProfile);
      expect(result.name).toMatch(/^[A-Za-z\s]+$/);
      expect(result.email).toContain('@');
      expect(result.avatarUrl).toContain('https://');
    });

    it('should handle corporate email formats', async () => {
      // Arrange
      const mockProfile = {
        name: 'Michael Chen',
        email: 'michael.chen@enterprise-corp.com',
        avatarUrl: 'https://company-cdn.enterprise-corp.com/avatars/mchen.jpg',
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result).toEqual(mockProfile);
      expect(result.email).toContain('@enterprise-corp.com');
    });

    it('should handle user without avatar', async () => {
      // Arrange
      const mockProfile = {
        name: 'Anonymous User',
        email: 'anonymous@test.com',
        avatarUrl: null,
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result.avatarUrl).toBeNull();
    });

    it('should handle international domain names', async () => {
      // Arrange
      const mockProfile = {
        name: 'Müller Schmidt',
        email: 'müller@münchen.de',
        avatarUrl: 'https://cdn.münchen.de/avatars/müller.jpg',
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result).toEqual(mockProfile);
    });
  });

  describe('Function Contract', () => {
    it('should be an async function', () => {
      // Act
      const result = getProfileHttp();

      // Assert
      expect(result).toBeInstanceOf(Promise);
    });

    it('should not require any parameters', async () => {
      // Arrange
      const mockProfile = {
        name: 'No Params User',
        email: 'noparams@test.com',
        avatarUrl: null,
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act - Call without parameters
      const result = await getProfileHttp();

      // Assert
      expect(result).toEqual(mockProfile);
    });

    it('should always make a GET request to auth/get-profile endpoint', async () => {
      // Arrange
      const mockProfile = {
        name: 'Endpoint Test User',
        email: 'endpoint@test.com',
        avatarUrl: null,
      };

      const mockJsonResponse = vi.fn().mockResolvedValue(mockProfile);
      mockApi.get.mockReturnValue({
        json: mockJsonResponse,
      } as any);

      // Act
      await getProfileHttp();

      // Assert
      expect(mockApi.get).toHaveBeenCalledWith('auth/get-profile');
      expect(mockApi.get).not.toHaveBeenCalledWith('auth/profile');
      expect(mockApi.get).not.toHaveBeenCalledWith('get-profile');
      expect(mockApi.get).not.toHaveBeenCalledWith('/auth/get-profile');
    });
  });
});