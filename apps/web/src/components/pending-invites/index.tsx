'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Check, UserPlus2, X } from 'lucide-react';
import { getPendingInvitesHttp } from '@/http/invites/get-pending-invites.http';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { acceptInviteAction, rejectInviteAction } from './actions';

dayjs.extend(relativeTime);

export default function PendingInvites() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['pending-invites'],
    queryFn: getPendingInvitesHttp,
    refetchOnWindowFocus: true,
  });

  async function handleAcceptInvite(inviteId: string) {
    await acceptInviteAction(inviteId);
    queryClient.invalidateQueries({ queryKey: ['pending-invites'] });
  }

  async function handleRejectInvite(inviteId: string) {
    await rejectInviteAction(inviteId);
    queryClient.invalidateQueries({ queryKey: ['pending-invites'] });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline">
          <UserPlus2 className="size-4" />
          <span className="sr-only">Pending invites</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 space-y-2">
        <span className="block font-medium text-sm">
          Pending Invites ({data?.invites.length ?? 0})
        </span>

        {data?.invites.length === 0 && (
          <p className="text-muted-foreground text-sm">No invites found.</p>
        )}

        {data?.invites.map((invite) => {
          return (
            <div className="space-y-2" key={invite.id}>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <span className="font-medium text-foreground">
                  {invite.author?.name ?? 'Someone'}
                </span>{' '}
                invited you to join{' '}
                <span className="font-medium text-foreground">
                  {invite.organization.name}
                </span>{' '}
                <span>{dayjs(invite.createdAt).fromNow()}</span>
              </p>

              <div className="flex gap-1">
                <Button
                  onClick={() => handleAcceptInvite(invite.id)}
                  size="xs"
                  variant="outline"
                >
                  <Check className="mr-1.5 size-3" />
                  Accept
                </Button>

                <Button
                  className="text-muted-foreground"
                  onClick={() => handleRejectInvite(invite.id)}
                  size="xs"
                  variant="ghost"
                >
                  <X className="mr-1.5 size-3" />
                  Reject
                </Button>
              </div>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
