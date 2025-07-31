'use client';

import { useQuery } from '@tanstack/react-query';
import { Building2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import getOrganizationsHttp from '@/http/organizations/get-organizations.http';
import OrganizationLoading from './organizations-loading';

export default function OrganizationList() {
  const { data: organizations = [], isLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: getOrganizationsHttp,
    refetchOnWindowFocus: false,
  });

  const isOrganizationsEmpty = organizations.length === 0;

  return (
    <div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && <OrganizationLoading />}

        {isOrganizationsEmpty && !isLoading ? (
          <div className="py-12 text-center">
            <Building2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 font-semibold text-foreground text-lg">
              Nenhuma organização encontrada
            </h3>
            <p className="text-muted-foreground">
              Você ainda não está conectado a nenhuma organização.
            </p>
          </div>
        ) : (
          organizations.map((org) => (
            <Link href={`/dashboard/org/${org.id}`} key={org.id}>
              <Card key={org.id}>
                <CardHeader>
                  <CardTitle>{org.name}</CardTitle>
                  <CardDescription>@{org.domain}</CardDescription>
                  <CardAction>
                    <ExternalLink className="size-4 text-muted-foreground" />
                  </CardAction>
                </CardHeader>
                <CardContent />
                <Separator />
                <CardFooter className="gap-x-2">
                  <Avatar>
                    <AvatarImage src={'https://github.com/LuizDev7727.png'} />
                    <AvatarFallback>LA</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Joh Doe</p>
                    <p className="text-muted-foreground text-sm">Membro</p>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
