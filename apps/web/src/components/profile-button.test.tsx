import { render, screen, waitFor } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { ProfileButton } from './profile-button';
import getProfileHttp from '@/http/auth/get-profile.http';
import ProfileButtonLoading from './profile-button-loading';

// Mock the dependencies
jest.mock('@tanstack/react-query');
jest.mock('@/http/auth/get-profile.http');
jest.mock('./profile-button-loading');
jest.mock('./ui/avatar', () => ({
  Avatar: ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div data-testid="avatar" className={className}>{children}</div>
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="avatar-fallback">{children}</div>
  ),
  AvatarImage: ({ src }: { src: string }) => (
    <img data-testid="avatar-image" src={src} alt="" />
  ),
}));

jest.mock('./ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-menu">{children}</div>
  ),
  DropdownMenuContent: ({ children, align, className }: { children: React.ReactNode; align: string; className: string }) => (
    <div data-testid="dropdown-menu-content" data-align={align} className={className}>{children}</div>
  ),
  DropdownMenuItem: ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => (
    <div data-testid="dropdown-menu-item" data-as-child={asChild}>{children}</div>
  ),
  DropdownMenuTrigger: ({ children, className }: { children: React.ReactNode; className: string }) => (
    <button data-testid="dropdown-menu-trigger" className={className}>{children}</button>
  ),
}));

jest.mock('lucide-react', () => ({
  ChevronDown: ({ className }: { className: string }) => (
    <div data-testid="chevron-down-icon" className={className} />
  ),
  LogOut: ({ className }: { className: string }) => (
    <div data-testid="logout-icon" className={className} />
  ),
}));

const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;
const mockGetProfileHttp = getProfileHttp as jest.MockedFunction<typeof getProfileHttp>;
const mockProfileButtonLoading = ProfileButtonLoading as jest.MockedFunction<typeof ProfileButtonLoading>;

describe('ProfileButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockProfileButtonLoading.mockReturnValue(<div data-testid="profile-button-loading">Loading...</div>);
  });

  describe('Loading State', () => {
    it('should render ProfileButtonLoading when isLoading is true', () => {
      mockUseQuery.mockReturnValue({
        data: undefined,
        isLoading: true,
        error: null,
        isError: false,
        isSuccess: false,
        refetch: jest.fn(),
      } as any);

      render(<ProfileButton />);

      expect(screen.getByTestId('profile-button-loading')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should call useQuery with correct parameters', () => {
      mockUseQuery.mockReturnValue({
        data: undefined,
        isLoading: true,
        error: null,
        isError: false,
        isSuccess: false,
        refetch: jest.fn(),
      } as any);

      render(<ProfileButton />);

      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: ['profile'],
        queryFn: getProfileHttp,
        refetchOnWindowFocus: false,
      });
    });
  });

  describe('Error State', () => {
    it('should render error message when user data is null', () => {
      mockUseQuery.mockReturnValue({
        data: null,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
      } as any);

      render(<ProfileButton />);

      expect(screen.getByText('Error')).toBeInTheDocument();
    });

    it('should render error message when user data is undefined', () => {
      mockUseQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
      } as any);

      render(<ProfileButton />);

      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  describe('Success State', () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatarUrl: 'https://example.com/avatar.jpg',
    };

    beforeEach(() => {
      mockUseQuery.mockReturnValue({
        data: mockUser,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
      } as any);
    });

    it('should render user information correctly', () => {
      render(<ProfileButton />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });

    it('should render avatar with correct image when avatarUrl is provided', () => {
      render(<ProfileButton />);

      const avatarImage = screen.getByTestId('avatar-image');
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('should render avatar fallback with user initials when name is provided', () => {
      render(<ProfileButton />);

      const avatarFallback = screen.getByTestId('avatar-fallback');
      expect(avatarFallback).toBeInTheDocument();
      expect(avatarFallback).toHaveTextContent('JD');
    });

    it('should render dropdown menu with correct structure', () => {
      render(<ProfileButton />);

      expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-menu-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-menu-content')).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-menu-item')).toBeInTheDocument();
    });

    it('should render logout option with correct link', () => {
      render(<ProfileButton />);

      const logoutLink = screen.getByRole('link');
      expect(logoutLink).toBeInTheDocument();
      expect(logoutLink).toHaveAttribute('href', '/api/auth/sign-out');
      expect(logoutLink).toHaveTextContent('Sair');
    });

    it('should render ChevronDown and LogOut icons', () => {
      render(<ProfileButton />);

      expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument();
      expect(screen.getByTestId('logout-icon')).toBeInTheDocument();
    });

    it('should apply correct CSS classes to elements', () => {
      render(<ProfileButton />);

      const trigger = screen.getByTestId('dropdown-menu-trigger');
      expect(trigger).toHaveClass('flex', 'cursor-pointer', 'items-center', 'gap-3', 'outline-none');

      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveClass('size-8');

      const dropdownContent = screen.getByTestId('dropdown-menu-content');
      expect(dropdownContent).toHaveClass('w-56');
      expect(dropdownContent).toHaveAttribute('data-align', 'start');
    });
  });

  describe('User Data Variations', () => {
    it('should handle user without avatarUrl', () => {
      const userWithoutAvatar = {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatarUrl: null,
      };

      mockUseQuery.mockReturnValue({
        data: userWithoutAvatar,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
      } as any);

      render(<ProfileButton />);

      expect(screen.queryByTestId('avatar-image')).not.toBeInTheDocument();
      expect(screen.getByTestId('avatar-fallback')).toHaveTextContent('JS');
    });

    it('should handle user without name', () => {
      const userWithoutName = {
        name: null,
        email: 'test@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
      };

      mockUseQuery.mockReturnValue({
        data: userWithoutName,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
      } as any);

      render(<ProfileButton />);

      expect(screen.queryByTestId('avatar-fallback')).not.toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    it('should handle user with empty string name', () => {
      const userWithEmptyName = {
        name: '',
        email: 'test@example.com',
        avatarUrl: null,
      };

      mockUseQuery.mockReturnValue({
        data: userWithEmptyName,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
      } as any);

      render(<ProfileButton />);

      expect(screen.queryByTestId('avatar-fallback')).not.toBeInTheDocument();
    });

    it('should handle user with long name', () => {
      const userWithLongName = {
        name: 'John Michael Christopher Alexander Smith',
        email: 'john@example.com',
        avatarUrl: null,
      };

      mockUseQuery.mockReturnValue({
        data: userWithLongName,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
      } as any);

      render(<ProfileButton />);

      const avatarFallback = screen.getByTestId('avatar-fallback');
      expect(avatarFallback).toHaveTextContent('JM'); // Should only show first 2 initials
    });

    it('should handle user with single name', () => {
      const userWithSingleName = {
        name: 'Madonna',
        email: 'madonna@example.com',
        avatarUrl: null,
      };

      mockUseQuery.mockReturnValue({
        data: userWithSingleName,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
      } as any);

      render(<ProfileButton />);

      const avatarFallback = screen.getByTestId('avatar-fallback');
      expect(avatarFallback).toHaveTextContent('M');
    });
  });

  describe('getInitials function', () => {
    // Since getInitials is not exported, we need to test it through the component behavior
    it('should generate correct initials for various name patterns', () => {
      const testCases = [
        { name: 'John Doe', expected: 'JD' },
        { name: 'john doe', expected: 'JD' }, // Should uppercase
        { name: 'Mary Jane Watson', expected: 'MJ' }, // Should take only first 2
        { name: 'X', expected: 'X' }, // Single character
        { name: 'Jean-Claude Van Damme', expected: 'JV' }, // Hyphenated names
        { name: '  John   Doe  ', expected: 'JD' }, // Extra spaces
      ];

      testCases.forEach(({ name, expected }) => {
        mockUseQuery.mockReturnValue({
          data: { name, email: 'test@example.com', avatarUrl: null },
          isLoading: false,
          error: null,
          isError: false,
          isSuccess: true,
          refetch: jest.fn(),
        } as any);

        const { unmount } = render(<ProfileButton />);
        
        const avatarFallback = screen.getByTestId('avatar-fallback');
        expect(avatarFallback).toHaveTextContent(expected);
        
        unmount();
      });
    });
  });

  describe('Accessibility', () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatarUrl: 'https://example.com/avatar.jpg',
    };

    beforeEach(() => {
      mockUseQuery.mockReturnValue({
        data: mockUser,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
      } as any);
    });

    it('should have proper link element for logout', () => {
      render(<ProfileButton />);

      const logoutLink = screen.getByRole('link');
      expect(logoutLink).toBeInTheDocument();
      expect(logoutLink).toHaveAttribute('href', '/api/auth/sign-out');
    });

    it('should have cursor-pointer class on clickable elements', () => {
      render(<ProfileButton />);

      const trigger = screen.getByTestId('dropdown-menu-trigger');
      expect(trigger).toHaveClass('cursor-pointer');

      const logoutLink = screen.getByRole('link');
      expect(logoutLink).toHaveClass('cursor-pointer');
    });

    it('should have outline-none class on trigger for custom focus handling', () => {
      render(<ProfileButton />);

      const trigger = screen.getByTestId('dropdown-menu-trigger');
      expect(trigger).toHaveClass('outline-none');
    });
  });

  describe('Edge Cases', () => {
    it('should handle query refetch function', () => {
      const mockRefetch = jest.fn();
      mockUseQuery.mockReturnValue({
        data: null,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
        refetch: mockRefetch,
      } as any);

      render(<ProfileButton />);

      // The refetch function should be available even in error state
      expect(mockRefetch).toBeDefined();
    });

    it('should handle user with special characters in name', () => {
      const userWithSpecialChars = {
        name: 'José María O\'Connor-Smith',
        email: 'jose@example.com',
        avatarUrl: null,
      };

      mockUseQuery.mockReturnValue({
        data: userWithSpecialChars,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
      } as any);

      render(<ProfileButton />);

      expect(screen.getByText('José María O\'Connor-Smith')).toBeInTheDocument();
      const avatarFallback = screen.getByTestId('avatar-fallback');
      expect(avatarFallback).toHaveTextContent('JM');
    });

    it('should handle user with numbers in name', () => {
      const userWithNumbers = {
        name: '2Pac Shakur',
        email: 'tupac@example.com',
        avatarUrl: null,
      };

      mockUseQuery.mockReturnValue({
        data: userWithNumbers,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
      } as any);

      render(<ProfileButton />);

      const avatarFallback = screen.getByTestId('avatar-fallback');
      expect(avatarFallback).toHaveTextContent('2S');
    });
  });

  describe('Component Integration', () => {
    it('should integrate properly with React Query', () => {
      mockUseQuery.mockReturnValue({
        data: { name: 'Test User', email: 'test@example.com', avatarUrl: null },
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
      } as any);

      render(<ProfileButton />);

      expect(mockUseQuery).toHaveBeenCalledTimes(1);
      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: ['profile'],
        queryFn: getProfileHttp,
        refetchOnWindowFocus: false,
      });
    });

    it('should render all UI components correctly', () => {
      mockUseQuery.mockReturnValue({
        data: { name: 'Test User', email: 'test@example.com', avatarUrl: 'test.jpg' },
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
      } as any);

      render(<ProfileButton />);

      // Check all major UI components are rendered
      expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-menu-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-menu-content')).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-menu-item')).toBeInTheDocument();
      expect(screen.getByTestId('avatar')).toBeInTheDocument();
      expect(screen.getByTestId('avatar-image')).toBeInTheDocument();
      expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument();
      expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument();
      expect(screen.getByTestId('logout-icon')).toBeInTheDocument();
    });
  });
});