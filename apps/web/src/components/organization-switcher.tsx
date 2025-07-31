'use client';

import { useQuery } from '@tanstack/react-query';
import { ChevronsUpDown, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import CreateOrganizationForm from '@/app/dashboard/org/create-organization-form';
import getOrganizationsHttp from '@/http/organizations/get-organizations.http';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type OrganizationSwitcherProps = {
  organizationId: string;
};

export default function OrganizationSwitcher({
  organizationId,
}: OrganizationSwitcherProps) {
  const { data: organizations = [] } = useQuery({
    queryKey: ['organizations'],
    queryFn: getOrganizationsHttp,
    refetchOnWindowFocus: false,
  });

  const currentOrganization = organizations.find(
    (org) => org.id === organizationId
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'}>
          {currentOrganization ? (
            <>
              <Avatar className="size-4">
                {currentOrganization.avatarUrl && (
                  <AvatarImage src={currentOrganization.avatarUrl} />
                )}
                <AvatarFallback />
              </Avatar>
              <span className="truncate text-left">
                {currentOrganization.name}
              </span>
            </>
          ) : (
            <span className="text-muted-foreground">Select organization</span>
          )}
          <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        className="w-[200px]"
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizações</DropdownMenuLabel>
          {organizations.map((organization) => {
            return (
              <DropdownMenuItem asChild key={organization.id}>
                <Link
                  className="cursor-pointer"
                  href={`/dashboard/org/${organization.id}`}
                >
                  <Avatar className="mr-2 size-4">
                    {organization.avatarUrl && (
                      <AvatarImage src={organization.avatarUrl} />
                    )}
                    <AvatarFallback />
                  </Avatar>
                  <span className="line-clamp-1">{organization.name}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger className="flex cursor-pointer items-center p-2 text-muted-foreground text-sm">
              <PlusCircle className="mr-2 size-4" />
              Criar Organização
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Organização</DialogTitle>
                <DialogDescription>
                  Uma organização é respectivamente uma conta de uma empresa que
                  tem conta nas redes sociais, como, Youtube, Tiktok e etc.
                </DialogDescription>
              </DialogHeader>
              <CreateOrganizationForm />
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
