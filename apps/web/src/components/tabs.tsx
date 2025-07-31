import {
  LayoutDashboard,
  Settings,
  UploadCloud,
  Users,
  Workflow,
} from 'lucide-react';
import { ability, getCurrentOrg } from '@/auth/auth';
import { NavLink } from './nav-link';
import { Button } from './ui/button';

export default async function Tabs() {
  const organizationId = await getCurrentOrg();
  const permissions = await ability();

  const canUpdateOrganization = permissions?.can('update', 'Organization');

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2 overflow-x-scroll">
        <Button
          asChild
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          size="sm"
          variant="ghost"
        >
          <NavLink href={`/dashboard/org/${organizationId}`}>
            <LayoutDashboard />
            Metricas
          </NavLink>
        </Button>
        <Button
          asChild
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          size="sm"
          variant="ghost"
        >
          <NavLink href={`/dashboard/org/${organizationId}/posts`}>
            <UploadCloud />
            Posts
          </NavLink>
        </Button>

        <Button
          asChild
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          size="sm"
          variant="ghost"
        >
          <NavLink href={`/dashboard/org/${organizationId}/integrations`}>
            <Workflow />
            Integrações
          </NavLink>
        </Button>

        <Button
          asChild
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          size="sm"
          variant="ghost"
        >
          <NavLink href={`/dashboard/org/${organizationId}/members`}>
            <Users />
            Membros
          </NavLink>
        </Button>

        {canUpdateOrganization && (
          <Button
            asChild
            className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
            size="sm"
            variant="ghost"
          >
            <NavLink href={`/dashboard/org/${organizationId}/settings`}>
              <Settings />
              Configurações
            </NavLink>
          </Button>
        )}
      </nav>
    </div>
  );
}
