import { zodResolver } from '@hookform/resolvers/zod';
import { uploadFile } from '@purlo/cloudflare';
import {
  type CreateOrganizationBody,
  createOrganizationSchema,
} from '@purlo/contracts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Image, Loader2 } from 'lucide-react';
import { type ChangeEvent, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import createOrganizationHttp from '@/http/organizations/create-organization.http';
import type { Organization } from '@/types/organization';
import { createSlug } from '@/utils/create-slug';
import { formatBytes } from '@/utils/format-bytes';

export default function CreateOrganizationForm() {
  const [avatar, setSelectedAvatar] = useState<File | undefined>(undefined);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateOrganizationBody>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: '',
      avatarUrl: undefined,
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: createOrganizationHttp,
    onSuccess(data, variables, _) {
      const { organizationId } = data;

      const { name, domain, shouldAttachUsersByDomain } = variables;

      const newOrganization = {
        id: organizationId,
        name,
        domain,
        slug: createSlug(variables.name),
        avatarUrl: avatar ? URL.createObjectURL(avatar) : undefined,
        shouldAttachUsersByDomain,
      };

      queryClient.setQueryData(
        ['organizations'],
        (savedOrganizations: Organization[]) => {
          return [newOrganization, ...savedOrganizations];
        }
      );
      toast('Organização criada com sucesso');
    },
  });

  async function handleCreateOrganization(formBody: CreateOrganizationBody) {
    if (avatar !== undefined) {
      await uploadFile({
        file: avatar,
      });
    }
    await mutateAsync(formBody);
  }

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
    setValue('avatarUrl', avatarSelected?.name);
  }

  const slug = createSlug(watch('name'));

  const previewUrl = useMemo(() => {
    if (!avatar) {
      return null;
    }

    return URL.createObjectURL(avatar);
  }, [avatar]);

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(handleCreateOrganization)}
    >
      <div className="space-y-2">
        <Label>Name</Label>
        <Input placeholder="Microsoft" {...register('name')} />
        <p className="text-red-600">{errors?.name?.message}</p>
      </div>
      <div className="space-y-2">
        <Label>Slug</Label>
        <Input disabled={true} placeholder={slug} readOnly={true} />
      </div>
      <div className="space-y-2">
        <Label>Domain</Label>
        <Input placeholder="Microsoft" {...register('domain')} />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="avatar">
          Icone{' '}
          <span className="text-muted-foreground text-sm">(Opicional)</span>
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
      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <div className="translate-y-0.5">
            <Checkbox
              id="shouldAttachUsersByDomain"
              name="shouldAttachUsersByDomain"
            />
          </div>
          <label className="space-y-1" htmlFor="shouldAttachUsersByDomain">
            <span className="font-medium text-sm leading-none">
              Auto-join new members
            </span>
            <p className="text-muted-foreground text-sm">
              This will automatically invite all members with same e-mail domain
              to this organization.
            </p>
          </label>
        </div>
      </div>
      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          'Criar Organização'
        )}
      </Button>
    </form>
  );
}
