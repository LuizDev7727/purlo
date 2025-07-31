'use client';

import { AlertTriangle, Loader2, UserPlus } from 'lucide-react';
import { useActionState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createInviteAction } from './actions';

export function CreateInviteForm() {
  const [{ error, message, success }, handleSubmit, isPending] = useActionState(
    createInviteAction,
    {
      error: null,
      message: null,
      success: false,
    }
  );

  return (
    <form action={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Invite failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-2">
        <div className="flex-1 space-y-1">
          <Input
            id="email"
            name="email"
            placeholder="john@example.com"
            type="email"
          />

          {error && (
            <p className="font-medium text-red-500 text-xs dark:text-red-400">
              {error}
            </p>
          )}
        </div>

        <Select defaultValue="MEMBER" name="role">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="MEMBER">Member</SelectItem>
            <SelectItem value="BILLING">Billing</SelectItem>
          </SelectContent>
        </Select>

        <Button disabled={isPending} type="submit">
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <UserPlus className="mr-2 size-4" />
              Invite user
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
