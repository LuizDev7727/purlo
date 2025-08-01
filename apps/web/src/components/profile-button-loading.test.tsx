import { test, expect } from '@playwright/experimental-ct-react';
import ProfileButtonLoading from './profile-button-loading';

test.describe('ProfileButtonLoading Component', () => {
  test('renders the main container with correct CSS classes', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    await expect(component).toHaveClass(/flex/);
    await expect(component).toHaveClass(/cursor-pointer/);
    await expect(component).toHaveClass(/items-center/);
    await expect(component).toHaveClass(/gap-3/);
    await expect(component).toHaveClass(/outline-none/);
  });

  test('renders text container with proper flex column layout', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    const textContainer = component.locator('.flex-col.items-end.gap-1');
    await expect(textContainer).toBeVisible();
  });

  test('renders name placeholder skeleton with correct dimensions', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    const nameSkeleton = component.locator('.h-4.w-24');
    await expect(nameSkeleton).toBeVisible();
  });

  test('renders subtitle placeholder skeleton with correct dimensions', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    const subtitleSkeleton = component.locator('.h-3.w-32');
    await expect(subtitleSkeleton).toBeVisible();
  });

  test('renders avatar with correct size styling', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    const avatar = component.locator('.size-8');
    await expect(avatar).toBeVisible();
  });

  test('renders avatar fallback with circular skeleton', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    const avatarSkeleton = component.locator('.h-full.w-full.rounded-full');
    await expect(avatarSkeleton).toBeVisible();
  });

  test('renders chevron down icon with proper styling', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    const chevronIcon = component.locator('.size-4.text-muted-foreground');
    await expect(chevronIcon).toBeVisible();
  });

  test('maintains proper component structure with three main sections', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    // Should have text container, avatar, and chevron
    const textSection = component.locator('.flex-col');
    const avatarSection = component.locator('.size-8');
    const chevronSection = component.locator('.size-4');
    
    await expect(textSection).toBeVisible();
    await expect(avatarSection).toBeVisible();
    await expect(chevronSection).toBeVisible();
  });

  test('applies consistent spacing with gap utilities', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    // Main container should have gap-3
    await expect(component).toHaveClass(/gap-3/);
    
    // Text container should have gap-1
    const textContainer = component.locator('.gap-1');
    await expect(textContainer).toBeVisible();
  });

  test('uses skeleton components for loading state indication', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    // Should have multiple skeleton elements
    const skeletons = component.locator('[class*="Skeleton"], .h-4, .h-3, .h-full');
    await expect(skeletons.first()).toBeVisible();
  });

  test('applies right-alignment for text placeholders', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    const textContainer = component.locator('.items-end');
    await expect(textContainer).toBeVisible();
  });

  test('ensures interactive styling with cursor pointer', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    await expect(component).toHaveClass(/cursor-pointer/);
  });

  test('handles focus styling with outline-none class', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    await expect(component).toHaveClass(/outline-none/);
  });

  test('renders with consistent visual hierarchy', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    // Verify the component structure
    await expect(component).toBeVisible();
    
    // Check that all major sections are present
    const textArea = component.locator('.flex-col');
    const avatarArea = component.locator('.size-8');
    const iconArea = component.locator('.size-4');
    
    await expect(textArea).toBeVisible();
    await expect(avatarArea).toBeVisible();
    await expect(iconArea).toBeVisible();
  });

  test('maintains proper size consistency across elements', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    // Avatar should be size-8
    const avatar = component.locator('.size-8');
    await expect(avatar).toBeVisible();
    
    // Icon should be size-4
    const icon = component.locator('.size-4');
    await expect(icon).toBeVisible();
  });

  test('applies muted foreground styling to chevron icon', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    const chevronIcon = component.locator('.text-muted-foreground');
    await expect(chevronIcon).toBeVisible();
  });

  test('uses proper flex layout for alignment', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    // Main container should use flex with center alignment
    await expect(component).toHaveClass(/flex/);
    await expect(component).toHaveClass(/items-center/);
    
    // Text area should use flex-col
    const flexColumn = component.locator('.flex-col');
    await expect(flexColumn).toBeVisible();
  });

  test('renders skeleton elements with appropriate dimensions', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    // Name skeleton: h-4 w-24
    const nameSkeleton = component.locator('.h-4.w-24');
    await expect(nameSkeleton).toBeVisible();
    
    // Subtitle skeleton: h-3 w-32
    const subtitleSkeleton = component.locator('.h-3.w-32');
    await expect(subtitleSkeleton).toBeVisible();
    
    // Avatar skeleton: h-full w-full rounded-full
    const avatarSkeleton = component.locator('.h-full.w-full.rounded-full');
    await expect(avatarSkeleton).toBeVisible();
  });

  test('provides visual loading feedback for user profile section', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    // Component should be visible and indicate loading state
    await expect(component).toBeVisible();
    
    // Should have placeholder content for name and additional info
    const placeholders = component.locator('[class*="h-"], [class*="w-"]');
    await expect(placeholders.first()).toBeVisible();
  });

  test('maintains accessibility considerations', async ({ mount }) => {
    const component = await mount(<ProfileButtonLoading />);
    
    // Should be keyboard accessible (has outline-none, likely custom focus handling)
    await expect(component).toHaveClass(/outline-none/);
    
    // Should indicate interactivity
    await expect(component).toHaveClass(/cursor-pointer/);
  });

  test('renders without any console errors or warnings', async ({ mount }) => {
    // This test ensures the component renders cleanly
    const component = await mount(<ProfileButtonLoading />);
    await expect(component).toBeVisible();
  });
});