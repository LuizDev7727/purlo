'use client';

import { Menu, PlusCircle, Slash, Upload, UploadCloud } from 'lucide-react';
import PendingInvites from '@/components/pending-invites';
import { ProfileButton } from '@/components/profile-button';
import ThemeSwitcher from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import UserSettings from '@/components/user-settings';
import CreateOrganizationForm from './org/create-organization-form';
import OrganizationList from './organization-list';

export default function Dashboard() {
  return (
    <div>
      <header className="border border-transparent border-b-input bg-card p-4">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <div className="flex items-center gap-3 ">
            <Upload className="size-5" />
            <Slash className="-rotate-[24deg] size-3 text-border" />
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <PendingInvites />
            <Button>
              <UploadCloud />
              Criar Upload
            </Button>
            <ThemeSwitcher />
            <Separator className="h-5" orientation="vertical" />
            <ProfileButton />
            <UserSettings />
          </div>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button size="icon" variant="ghost">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Tabs</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="mx-auto mt-4 w-full max-w-[1200px]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 font-bold text-2xl text-foreground">
              Organizações
            </h1>
            <p className="text-muted-foreground">
              Organizações que você criou ou às quais está conectado
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle />
                Criar Organização
              </Button>
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
        </div>

        <OrganizationList />
      </main>
    </div>
  );
}
