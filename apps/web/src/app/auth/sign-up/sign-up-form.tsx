'use client';

import { GalleryVerticalEnd, Image, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { type ChangeEvent, useActionState, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { formatBytes } from '@/utils/format-bytes';
import { signUpAction } from './action';

export default function SignUpForm() {
  const [avatar, setSelectedAvatar] = useState<File | undefined>(undefined);
  const searchParams = useSearchParams();

  const plan = searchParams.get('plan') ?? 'free';

  const [state, formAction, pending] = useActionState(signUpAction, {
    message: null,
    error: '',
  });

  function handleSelectedAvatar(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;

    if (!files) {
      return;
    }

    const maxSize = 1 * 1024 * 1024; // 1MB default

    const avatarSize = files[0]?.size ?? 0;

    if (avatarSize > maxSize) {
      toast('Tamanho da imagem excedido', {
        description: 'Por favor, selecione outra imagem com menos de 1MB.',
      });
      return;
    }

    const avatarSelected = files[0];

    setSelectedAvatar(avatarSelected);
  }

  const previewUrl = useMemo(() => {
    if (!avatar) {
      return null;
    }

    return URL.createObjectURL(avatar);
  }, [avatar]);

  return (
    <div className={'flex flex-col gap-6'}>
      <form action={formAction}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              className="flex flex-col items-center gap-2 font-medium"
              href="/"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Purlo Inc.</span>
            </a>
            <h1 className="font-bold text-xl">Seja bem vindo ao Purlo</h1>
            <div className="text-center text-sm">
              Já tem conta ainda ?{' '}
              <a className="underline underline-offset-4" href="/auth/sign-in">
                Entrar agora
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
                type="text"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                placeholder="*********"
                required
                type="text"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="*********"
                required
                type="text"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="avatar">
                Foto de perfil{' '}
                <span className="text-muted-foreground text-sm">
                  (Opicional)
                </span>
              </Label>
              <label
                className="flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed text-sm"
                htmlFor="avatar"
              >
                {previewUrl ? (
                  <div className="flex items-center justify-start gap-x-4">
                    <Avatar>
                      <AvatarImage src={previewUrl} />
                      <AvatarFallback>JP</AvatarFallback>
                    </Avatar>

                    <div>
                      <h1 className="font-medium text-xl">{avatar?.name}</h1>
                      <p className="text-muted-foreground text-sm">
                        {formatBytes(avatar?.size ?? 0)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="rounded-full border p-2">
                      <Image />
                    </div>
                    <h1 className="font-medium">Selecione a sua foto</h1>
                    <p className="text-muted-foreground text-sm">
                      PNG, JPG ou JPEG (max. 2MB)
                    </p>
                  </>
                )}
              </label>
              <Input
                accept=".png,.jpeg,.jpg"
                className="sr-only"
                id="avatar"
                name="avatar"
                onChange={handleSelectedAvatar}
                type="file"
              />
            </div>
            <Input className="sr-only" defaultValue={plan} name="plan" />
            {state?.error && (
              <p className="text-red-600 text-sm">{state.error}</p>
            )}
            <Button className="w-full" disabled={pending} type="submit">
              {pending ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                'Cadastrar-se'
              )}
            </Button>
          </div>
        </div>
      </form>

      <Separator />

      <form>
        <Button className="w-full" type="submit" variant="outline">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Continuar com Google
        </Button>
      </form>

      <div className="text-balance text-center text-muted-foreground text-xs *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
        By clicking continue, you agree to our <a href="/">Terms of Service</a>{' '}
        and <a href="/">Privacy Policy</a>.
      </div>
    </div>
  );
}
