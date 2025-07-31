import { XOctagon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { removeIntegrationAction } from './actions';

interface RemoveIntegrationButtonProps {
  integrationId: string;
}

export function RemoveIntegrationButton({
  integrationId,
}: RemoveIntegrationButtonProps) {
  return (
    <form action={removeIntegrationAction.bind(null, integrationId)}>
      <Button size="sm" variant="destructive">
        <XOctagon className="mr-2 size-4" />
        Desconectar
      </Button>
    </form>
  );
}
