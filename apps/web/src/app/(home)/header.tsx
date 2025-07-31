import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Header() {
  return (
    <div className="relative inset-x-0 top-0 z-[99999] h-14 w-full select-none border-transparent border-b">
      <section className="mx-auto flex h-full w-full max-w-full items-center justify-between px-4 md:max-w-screen-xl md:px-12 lg:px-20">
        <div className="flex items-center space-x-12">
          <Link href="/#home">
            <span className="!leading-none font-bold font-heading text-lg">
              Purlo
            </span>
          </Link>

          <nav className="hidden lg:flex">
            <Link
              className="font-medium text-muted-foreground text-sm hover:text-accent-foreground"
              href={'/blog'}
            >
              Blog
            </Link>
          </nav>
        </div>

        <div className="hidden items-center gap-x-2 lg:flex">
          <Button asChild variant={'ghost'}>
            <Link href={'/auth/sign-in'}>Entrar</Link>
          </Button>
          <Button>
            <Link href={'/auth/sign-up'}>Cadastrar-se</Link>
          </Button>
        </div>

        <div className="flex items-center justify-end lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Navegação</SheetTitle>
                <SheetDescription>
                  Escolha qual tab você deseja acessar.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 flex w-full flex-col items-start px-4 py-2">
                <ul className="mb-6 flex w-full flex-col items-start">
                  <Link
                    className="font-medium text-muted-foreground text-sm hover:text-accent-foreground"
                    href={'/blog'}
                  >
                    Blog
                  </Link>
                </ul>

                <div className="w-full space-y-2">
                  <Button asChild className="w-full" variant={'outline'}>
                    <Link href={'/auth/sign-in'}>Entrar</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href={'/auth/sign-up'}>Cadastrar-se</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </section>
    </div>
  );
}
