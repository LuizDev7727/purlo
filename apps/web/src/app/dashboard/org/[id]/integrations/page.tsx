import { getCurrentOrg } from '@/auth/auth';
import IntegrationsList from './integrations-list';

export default async function Integrations() {
  const currentOrg = await getCurrentOrg();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Integrações</h1>
        <p className="text-muted-foreground text-sm">
          Conecte suas redes sociais para centralizar o gerenciamento de
          conteúdo.
        </p>
      </div>

      <IntegrationsList organizationId={currentOrg} />
    </div>
  );
}
