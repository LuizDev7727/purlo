import { Trash, XCircle } from 'lucide-react';
import { getCurrentOrg } from '@/auth/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { getOrganizationHttp } from '@/http/organizations/get-organization.http';
import { shutdownOrganizationAction } from './action';
import UpdateOrganizationForm from './update-organization-form';

export default async function Settings() {
  const organizationId = await getCurrentOrg();
  const { organization } = await getOrganizationHttp(organizationId);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Organization settings</CardTitle>
          <CardDescription>Update your organization details</CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateOrganizationForm
            initialData={{
              name: organization.name,
              domain: organization.domain,
              avatarUrl: organization.avatarUrl,
              shouldAttachUsersByDomain: organization.shouldAttachUsersByDomain,
            }}
          />
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Excluir Organização</CardTitle>
          <CardDescription>
            Se você deseja excluir essa organização, basta clicar no botão
            abaixo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full" variant={'destructive'}>
                <Trash />
                Excluir Organização
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tem certeza ?</DialogTitle>
                <DialogDescription>
                  Ao clicar no botão abaixo, todo o progresso será
                  permamentemente excluido.
                </DialogDescription>
              </DialogHeader>
              <form action={shutdownOrganizationAction}>
                <Button className="w-full" type="submit" variant="destructive">
                  <XCircle className="mr-2 size-4" />
                  Shutdown organization
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
