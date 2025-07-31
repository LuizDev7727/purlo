'use client';

import { AlertTriangle, Loader2 } from 'lucide-react';
import { useActionState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateOrganizationAction } from './action';

type UpdateOrganizationFormProps = {
  initialData: {
    name: string;
    avatarUrl: string | null;
    domain: string | null;
    shouldAttachUsersByDomain: boolean;
  };
};

export default function UpdateOrganizationForm({
  initialData,
}: UpdateOrganizationFormProps) {
  const [{ success, message, error }, formAction, pending] = useActionState(
    updateOrganizationAction,
    {
      message: null,
      success: false,
      error: undefined,
    }
  );

  return (
    <form action={formAction} className="space-y-4">
      {success && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save organization failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {!success && message && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Organization name</Label>
        <Input defaultValue={initialData?.name} id="name" name="name" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="domain">E-mail domain</Label>
        <Input
          defaultValue={initialData?.domain ?? undefined}
          id="domain"
          inputMode="url"
          name="domain"
          type="text"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <div className="translate-y-0.5">
            <Checkbox
              defaultChecked={initialData.shouldAttachUsersByDomain}
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

      {error && <p className="text-red-600">{error}</p>}

      <Button className="w-full" disabled={pending} type="submit">
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Atualizar Organização'
        )}
      </Button>
    </form>
  );
}
