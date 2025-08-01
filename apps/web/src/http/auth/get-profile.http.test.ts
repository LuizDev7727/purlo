import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../api';
import getProfileHttp from './get-profile.http';

// Mock the api module
vi.mock('../api', () => ({
  api: {
    get: vi.fn(),
  },
}));

const mockApi = vi.mocked(api);

type MockResponse = {
  name: string;
  email: string;
  avatarUrl: string | null;
};

describe('getProfileHttp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Successful API Responses', () => {
    it('should successfully fetch user profile with all fields populated', async () => {
      // Arrange
      const mockProfile: MockResponse = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
      };

      const mockChain = {
        json: vi.fn().mockResolvedValue(mockProfile),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(mockApi.get).toHaveBeenCalledWith('auth/get-profile');
      expect(mockApi.get).toHaveBeenCalledTimes(1);
      expect(mockChain.json).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockProfile);
    });

    it('should handle profile with null avatarUrl', async () => {
      // Arrange
      const mockProfile: MockResponse = {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatarUrl: null,
      };

      const mockChain = {
        json: vi.fn().mockResolvedValue(mockProfile),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result).toEqual(mockProfile);
      expect(result.avatarUrl).toBeNull();
    });

    it('should handle profile with empty string name', async () => {
      // Arrange
      const mockProfile: MockResponse = {
        name: '',
        email: 'user@example.com',
        avatarUrl: 'https://example.com/default-avatar.png',
      };

      const mockChain = {
        json: vi.fn().mockResolvedValue(mockProfile),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result).toEqual(mockProfile);
      expect(result.name).toBe('');
    });

    it('should handle profile with minimal data', async () => {
      // Arrange
      const mockProfile = {
        name: 'Minimal User',
        email: 'minimal@example.com',
        avatarUrl: null,
      };

      const mockChain = {
        json: vi.fn().mockResolvedValue(mockProfile),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result.name).toBe('Minimal User');
      expect(result.email).toBe('minimal@example.com');
      expect(result.avatarUrl).toBeNull();
    });
  });

  describe('Edge Cases and Data Variations', () => {
    it('should handle profile with special characters in name and email', async () => {
      // Arrange
      const mockProfile: MockResponse = {
        name: 'José María Gutiérrez-Solana',
        email: 'josé.maría@example-company.co.uk',
        avatarUrl: 'https://cdn.example.com/avatars/special-chars-user.webp',
      };

      const mockChain = {
        json: vi.fn().mockResolvedValue(mockProfile),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result).toEqual(mockProfile);
      expect(result.name).toContain('José');
      expect(result.email).toContain('@example-company.co.uk');
    });

    it('should handle very long names and emails', async () => {
      // Arrange
      const longName = 'A'.repeat(255);
      const longEmail = `${'a'.repeat(50)}@${'b'.repeat(50)}.com`;
      const mockProfile: MockResponse = {
        name: longName,
        email: longEmail,
        avatarUrl: 'https://example.com/avatar.jpg',
      };

      const mockChain = {
        json: vi.fn().mockResolvedValue(mockProfile),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result).toEqual(mockProfile);
      expect(result.name).toHaveLength(255);
      expect(result.email).toContain('@');
    });

    it('should handle various avatar URL formats', async () => {
      const testCases = [
        {
          description: 'HTTPS URL',
          avatarUrl: 'https://example.com/avatar.jpg',
          expected: 'https://example.com/avatar.jpg',
        },
        {
          description: 'HTTP localhost URL',
          avatarUrl: 'http://localhost:3000/avatars/user123.png',
          expected: 'http://localhost:3000/avatars/user123.png',
        },
        {
          description: 'data URI',
          avatarUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAY',
          expected: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAY',
        },
        {
          description: 'relative path',
          avatarUrl: 'relative/path/to/avatar.svg',
          expected: 'relative/path/to/avatar.svg',
        },
        {
          description: 'empty string',
          avatarUrl: '',
          expected: '',
        },
      ];

      for (const testCase of testCases) {
        const mockProfile: MockResponse = {
          name: 'Test User',
          email: 'test@example.com',
          avatarUrl: testCase.avatarUrl,
        };

        const mockChain = {
          json: vi.fn().mockResolvedValue(mockProfile),
        };
        mockApi.get.mockReturnValue(mockChain as any);

        const result = await getProfileHttp();

        expect(result.avatarUrl).toBe(testCase.expected);
      }
    });

    it('should handle whitespace in name and email fields', async () => {
      // Arrange
      const mockProfile: MockResponse = {
        name: '  John Doe  ',
        email: '  john.doe@example.com  ',
        avatarUrl: null,
      };

      const mockChain = {
        json: vi.fn().mockResolvedValue(mockProfile),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result.name).toBe('  John Doe  ');
      expect(result.email).toBe('  john.doe@example.com  ');
    });
  });

  describe('Error Handling', () => {
    it('should propagate network errors from api.get', async () => {
      // Arrange
      const networkError = new Error('Network connection failed');
      mockApi.get.mockImplementation(() => {
        throw networkError;
      });

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('Network connection failed');
      expect(mockApi.get).toHaveBeenCalledWith('auth/get-profile');
    });

    it('should propagate JSON parsing errors', async () => {
      // Arrange
      const jsonError = new Error('Invalid JSON response');
      const mockChain = {
        json: vi.fn().mockRejectedValue(jsonError),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('Invalid JSON response');
      expect(mockApi.get).toHaveBeenCalledWith('auth/get-profile');
    });

    it('should handle HTTP 401 Unauthorized errors', async () => {
      // Arrange
      const httpError = new Error('HTTP 401: Unauthorized');
      Object.assign(httpError, { name: 'HTTPError', response: { status: 401 } });
      const mockChain = {
        json: vi.fn().mockRejectedValue(httpError),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('HTTP 401: Unauthorized');
    });

    it('should handle HTTP 403 Forbidden errors', async () => {
      // Arrange
      const httpError = new Error('HTTP 403: Forbidden');
      Object.assign(httpError, { name: 'HTTPError', response: { status: 403 } });
      const mockChain = {
        json: vi.fn().mockRejectedValue(httpError),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('HTTP 403: Forbidden');
    });

    it('should handle HTTP 404 Not Found errors', async () => {
      // Arrange
      const httpError = new Error('HTTP 404: Not Found');
      Object.assign(httpError, { name: 'HTTPError', response: { status: 404 } });
      const mockChain = {
        json: vi.fn().mockRejectedValue(httpError),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('HTTP 404: Not Found');
    });

    it('should handle timeout errors', async () => {
      // Arrange
      const timeoutError = new Error('Request timeout');
      Object.assign(timeoutError, { name: 'TimeoutError' });
      const mockChain = {
        json: vi.fn().mockRejectedValue(timeoutError),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('Request timeout');
    });

    it('should handle server errors (5xx)', async () => {
      // Arrange
      const serverError = new Error('HTTP 500: Internal Server Error');
      Object.assign(serverError, { name: 'HTTPError', response: { status: 500 } });
      const mockChain = {
        json: vi.fn().mockRejectedValue(serverError),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('HTTP 500: Internal Server Error');
    });

    it('should handle malformed JSON gracefully', async () => {
      // Arrange
      const jsonError = new SyntaxError('Unexpected token in JSON');
      const mockChain = {
        json: vi.fn().mockRejectedValue(jsonError),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('Unexpected token in JSON');
    });
  });

  describe('API Contract Validation', () => {
    it('should handle response with missing optional avatarUrl field', async () => {
      // Arrange
      const mockProfile = {
        name: 'Test User',
        email: 'test@example.com',
        // avatarUrl is missing from response
      };

      const mockChain = {
        json: vi.fn().mockResolvedValue(mockProfile),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result).toEqual({
        name: 'Test User',
        email: 'test@example.com',
      });
      expect(result.avatarUrl).toBeUndefined();
    });

    it('should call the correct API endpoint path', async () => {
      // Arrange
      const mockProfile: MockResponse = {
        name: 'API Test User',
        email: 'api.test@example.com',
        avatarUrl: null,
      };

      const mockChain = {
        json: vi.fn().mockResolvedValue(mockProfile),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      await getProfileHttp();

      // Assert
      expect(mockApi.get).toHaveBeenCalledWith('auth/get-profile');
      expect(mockApi.get).toHaveBeenCalledTimes(1);
    });

    it('should properly type the response according to Response interface', async () => {
      // Arrange
      const mockProfile: MockResponse = {
        name: 'Type Test User',
        email: 'type.test@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
      };

      const mockChain = {
        json: vi.fn().mockResolvedValue(mockProfile),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(typeof result.name).toBe('string');
      expect(typeof result.email).toBe('string');
      expect(result.avatarUrl === null || typeof result.avatarUrl === 'string').toBe(true);
    });

    it('should handle response with extra fields gracefully', async () => {
      // Arrange
      const mockProfile = {
        name: 'Extra Fields User',
        email: 'extra@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
        extraField: 'should be preserved',
        anotherExtra: 123,
        metadata: { role: 'admin' },
      };

      const mockChain = {
        json: vi.fn().mockResolvedValue(mockProfile),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result).toEqual(mockProfile);
      expect((result as any).extraField).toBe('should be preserved');
      expect((result as any).anotherExtra).toBe(123);
      expect((result as any).metadata).toEqual({ role: 'admin' });
    });

    it('should handle response with numeric name (edge case)', async () => {
      // Arrange
      const mockProfile = {
        name: '12345',
        email: 'numeric@example.com',
        avatarUrl: null,
      };

      const mockChain = {
        json: vi.fn().mockResolvedValue(mockProfile),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result.name).toBe('12345');
      expect(typeof result.name).toBe('string');
    });
  });

  describe('Performance and Reliability', () => {
    it('should handle concurrent calls correctly', async () => {
      // Arrange
      const mockProfile1: MockResponse = {
        name: 'Concurrent User 1',
        email: 'user1@example.com',
        avatarUrl: 'https://example.com/avatar1.jpg',
      };
      const mockProfile2: MockResponse = {
        name: 'Concurrent User 2',
        email: 'user2@example.com',
        avatarUrl: 'https://example.com/avatar2.jpg',
      };

      let callCount = 0;
      const mockChain = {
        json: vi.fn().mockImplementation(async () => {
          callCount++;
          return callCount === 1 ? mockProfile1 : mockProfile2;
        }),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const [result1, result2] = await Promise.all([
        getProfileHttp(),
        getProfileHttp(),
      ]);

      // Assert
      expect(mockApi.get).toHaveBeenCalledTimes(2);
      expect(result1).toEqual(mockProfile1);
      expect(result2).toEqual(mockProfile2);
    });

    it('should handle rapid successive calls', async () => {
      // Arrange
      const mockProfile: MockResponse = {
        name: 'Rapid Test User',
        email: 'rapid@example.com',
        avatarUrl: null,
      };

      const mockChain = {
        json: vi.fn().mockResolvedValue(mockProfile),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const promises = Array.from({ length: 5 }, () => getProfileHttp());
      const results = await Promise.all(promises);

      // Assert
      expect(mockApi.get).toHaveBeenCalledTimes(5);
      results.forEach((result) => {
        expect(result).toEqual(mockProfile);
      });
    });

    it('should maintain function purity (no side effects)', async () => {
      // Arrange
      const mockProfile: MockResponse = {
        name: 'Purity Test User',
        email: 'purity@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
      };

      const mockChain = {
        json: vi.fn().mockResolvedValue(mockProfile),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const result1 = await getProfileHttp();
      const result2 = await getProfileHttp();

      // Assert
      expect(result1).toEqual(result2);
      expect(result1).not.toBe(result2); // Different object instances
      expect(mockApi.get).toHaveBeenCalledTimes(2);
    });

    it('should handle slow API responses gracefully', async () => {
      // Arrange
      const mockProfile: MockResponse = {
        name: 'Slow Response User',
        email: 'slow@example.com',
        avatarUrl: null,
      };

      const mockChain = {
        json: vi.fn().mockImplementation(async () => {
          // Simulate slow response
          await new Promise(resolve => setTimeout(resolve, 50));
          return mockProfile;
        }),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const startTime = Date.now();
      const result = await getProfileHttp();
      const endTime = Date.now();

      // Assert
      expect(result).toEqual(mockProfile);
      expect(endTime - startTime).toBeGreaterThanOrEqual(50);
    });
  });

  describe('Ky HTTP Client Integration', () => {
    it('should work with ky chainable API pattern', async () => {
      // Arrange
      const mockProfile: MockResponse = {
        name: 'Ky Integration User',
        email: 'ky@example.com',
        avatarUrl: 'https://example.com/ky-avatar.jpg',
      };

      // Mock the full ky chain as it would work in reality
      const mockKyResponse = {
        json: vi.fn().mockResolvedValue(mockProfile),
        text: vi.fn(),
        blob: vi.fn(),
        arrayBuffer: vi.fn(),
        ok: true,
        status: 200,
      };
      mockApi.get.mockReturnValue(mockKyResponse as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(mockApi.get).toHaveBeenCalledWith('auth/get-profile');
      expect(mockKyResponse.json).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockProfile);
    });

    it('should handle ky HTTPError properly', async () => {
      // Arrange
      const kyHttpError = new Error('Request failed');
      Object.assign(kyHttpError, {
        name: 'HTTPError',
        response: {
          status: 404,
          statusText: 'Not Found',
          url: 'http://localhost:3333/api/auth/get-profile',
        },
      });

      mockApi.get.mockImplementation(() => {
        throw kyHttpError;
      });

      // Act & Assert
      await expect(getProfileHttp()).rejects.toThrow('Request failed');
    });
  });

  describe('Function Behavior Validation', () => {
    it('should be an async function', () => {
      expect(getProfileHttp.constructor.name).toBe('AsyncFunction');
    });

    it('should not accept any parameters', () => {
      expect(getProfileHttp.length).toBe(0);
    });

    it('should return a Promise', () => {
      // Arrange
      const mockProfile: MockResponse = {
        name: 'Promise Test User',
        email: 'promise@example.com',
        avatarUrl: null,
      };

      const mockChain = {
        json: vi.fn().mockResolvedValue(mockProfile),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const result = getProfileHttp();

      // Assert
      expect(result).toBeInstanceOf(Promise);
      
      // Clean up the promise to avoid unhandled promise warnings
      return result;
    });

    it('should handle undefined response gracefully', async () => {
      // Arrange
      const mockChain = {
        json: vi.fn().mockResolvedValue(undefined),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result).toBeUndefined();
    });

    it('should handle null response gracefully', async () => {
      // Arrange
      const mockChain = {
        json: vi.fn().mockResolvedValue(null),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result).toBeNull();
    });

    it('should handle empty object response', async () => {
      // Arrange
      const emptyResponse = {};
      const mockChain = {
        json: vi.fn().mockResolvedValue(emptyResponse),
      };
      mockApi.get.mockReturnValue(mockChain as any);

      // Act
      const result = await getProfileHttp();

      // Assert
      expect(result).toEqual({});
    });
  });
});