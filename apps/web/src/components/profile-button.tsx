'use client';

import { useQuery } from '@tanstack/react-query';
import { ChevronDown, LogOut } from 'lucide-react';
import getProfileHttp from '@/http/auth/get-profile.http';
import ProfileButtonLoading from './profile-button-loading';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

function getInitials(name: string): string {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  return initials;
}

export function ProfileButton() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileHttp,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <ProfileButtonLoading />;
  }

  if (!user) {
    return <p>Error</p>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="font-medium text-sm">{user.name}</span>
          <span className="text-muted-foreground text-xs">{user.email}</span>
        </div>
        <Avatar className="size-8">
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
          {user.name && (
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          )}
        </Avatar>
        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem asChild>
          <a className="cursor-pointer" href="/api/auth/sign-out">
            <LogOut className="size-4" />
            Sair
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
