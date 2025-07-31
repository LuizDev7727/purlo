import { organizationSchema } from '@purlo/casl';
import { ArrowLeftRight, Crown, UserMinus } from 'lucide-react';
import { ability, getCurrentOrg } from '@/auth/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getMembersHttp } from '@/http/members/get-members.http';
import { getMembershipHttp } from '@/http/organizations/get-membership.http';
import { getOrganizationHttp } from '@/http/organizations/get-organization.http';
import { removeMemberAction } from './actions';
import { Invites } from './invites';
import { UpdateMemberRoleSelect } from './update-member-role-select';

export default async function Members() {
  const permissions = await ability();
  const currentOrg = await getCurrentOrg();

  const [membership, members, { organization }] = await Promise.all([
    getMembershipHttp(currentOrg),
    getMembersHttp(currentOrg),
    getOrganizationHttp(currentOrg),
  ]);

  const authOrganization = organizationSchema.parse(organization);

  return (
    <div>
      <Invites />

      <div className="mt-4 rounded-md border">
        <Table>
          <TableBody>
            {members.map((member) => {
              return (
                <TableRow key={member.id}>
                  <TableCell className="py-2.5" style={{ width: 48 }}>
                    <Avatar>
                      <AvatarFallback />
                      {member.avatarUrl && (
                        <AvatarImage src={member.avatarUrl} />
                      )}
                    </Avatar>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex flex-col">
                      <span className="inline-flex items-center gap-2 font-medium">
                        {member.name}
                        {member.id === membership.userId && ' (me)'}
                        {organization.ownerId === member.id && (
                          <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
                            <Crown className="size-3" />
                            Owner
                          </span>
                        )}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {member.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex items-center justify-end gap-2">
                      {permissions?.can(
                        'transfer_ownership',
                        authOrganization
                      ) && (
                        <Button size="sm" variant="ghost">
                          <ArrowLeftRight className="mr-2 size-4" />
                          Transfer ownership
                        </Button>
                      )}

                      <UpdateMemberRoleSelect
                        disabled={
                          member.userId === membership.userId ||
                          member.userId === organization.ownerId ||
                          permissions?.cannot('update', 'User')
                        }
                        memberId={member.id}
                        value={member.role}
                      />

                      {permissions?.can('delete', 'User') && (
                        <form action={removeMemberAction.bind(null, member.id)}>
                          <Button
                            disabled={
                              member.userId === membership.userId ||
                              member.userId === organization.ownerId
                            }
                            size="sm"
                            type="submit"
                            variant="destructive"
                          >
                            <UserMinus className="mr-2 size-4" />
                            Remove
                          </Button>
                        </form>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
