import { Menu, Slash, Upload, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { getCurrentOrg } from '@/auth/auth';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import OrganizationSwitcher from './organization-switcher';
import PendingInvites from './pending-invites';
import { ProfileButton } from './profile-button';
import ThemeSwitcher from './theme-switcher';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import UserSettings from './user-settings';

export default async function Header() {
  const organizationId = await getCurrentOrg();

  return (
    <header className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3 ">
        <Upload className="size-5" />
        <Slash className="-rotate-[24deg] size-3 text-border" />

        <OrganizationSwitcher organizationId={organizationId} />
      </div>

      <div className="hidden items-center gap-4 lg:flex">
        <PendingInvites />
        <Button asChild>
          <Link href={`/dashboard/org/${organizationId}/posts/create-post`}>
            <UploadCloud />
            Criar Upload
          </Link>
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
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
