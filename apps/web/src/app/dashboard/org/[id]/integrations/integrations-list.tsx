import { CirclePlus, Music, Youtube } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
import { getIntegrationsHttp } from '@/http/integrations/get-integrations.http';
import {
  addIntegrationWithTiktokAction,
  addIntegrationWithYoutubeAction,
} from './actions';

import { RemoveIntegrationButton } from './remove-integration-button';

type IntegrationsListProps = {
  organizationId: string;
};

export default async function IntegrationsList({
  organizationId,
}: IntegrationsListProps) {
  const integrations = await getIntegrationsHttp(organizationId);

  const hasYoutubeIntegration = integrations.some(
    (integration) => integration.provider === 'YOUTUBE'
  );

  const hasTiktokIntegration = integrations.some(
    (integration) => integration.provider === 'TIKTOK'
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {integrations.map((integration) => {
        return (
          <Card key={integration.id}>
            <CardHeader>
              <div className="flex items-center gap-x-4">
                <div className="flex items-center space-x-3">
                  {integration.provider === 'YOUTUBE' && (
                    <div className={'rounded-lg bg-red-500 p-2 text-white'}>
                      <Youtube className="size-6" />
                    </div>
                  )}
                  {integration.provider === 'TIKTOK' && (
                    <div className={'rounded-lg p-2'}>
                      <Music className="size-6" />
                    </div>
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg">{integration.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge
                      className="bg-green-100 text-green-700 text-xs"
                      variant="secondary"
                    >
                      Conectado
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm">
                Gerencie seu canal e monitore performance dos vídeos
              </CardDescription>

              <div className="space-y-2">
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Canal</span>
                  <span className="font-medium">{integration.name}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <RemoveIntegrationButton integrationId={integration.id} />
              </div>
            </CardContent>
          </Card>
        );
      })}

      <Dialog>
        <DialogTrigger className="flex size-[280px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed">
          <CirclePlus />
          <p className="text-muted-foreground">Adicionar Integração</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar integração</DialogTitle>
            <DialogDescription>
              Clique em qual rede social abaixo que você gostaria de adicionar a
              integração.
            </DialogDescription>
          </DialogHeader>

          <form action={addIntegrationWithYoutubeAction}>
            <Button
              className="w-full"
              disabled={hasYoutubeIntegration}
              type="submit"
              variant={'outline'}
            >
              <Youtube className="size-6 rounded-lg bg-red-500 text-white" />
              Youtube
            </Button>
          </form>
          <form action={addIntegrationWithTiktokAction}>
            <Button
              className="w-full"
              disabled={hasTiktokIntegration}
              type="submit"
              variant={'outline'}
            >
              <Music />
              Tiktok
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
