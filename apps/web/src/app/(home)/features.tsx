import { Calendar, Users } from 'lucide-react';
import {
  BentoCard,
  type BentoCardProps,
  BentoGrid,
} from '@/components/bento-grid';
import { Badge } from '@/components/ui/badge';

export default function Features() {
  const features: BentoCardProps[] = [
    {
      id: '1',
      name: 'Mantenha a disciplina',
      href: '/auth/sign-in',
      description: 'Centralize seus posts em um só lugar.',
      cta: 'Testar Agora',
      className: 'col-span-3 lg:col-span-1',
      background: '',
      Icon: Calendar,
    },
    {
      id: '2',
      name: 'Convide membros para gerenciar os posts',
      href: '/auth/sign-in',
      description:
        'Aqui você pode convidar membros para gerenciar toda a rede social.',
      cta: 'Testar Agora',
      className: 'col-span-3 lg:col-span-2',
      background: '',
      Icon: Users,
    },
    {
      id: '3',
      name: 'Analise o melhor horário',
      href: '/auth/sign-in',
      description:
        'Analise qual post pode ter o melhor engachamento para o post.',
      cta: 'Testar Agora',
      className: 'col-span-3 lg:col-span-2 max-w-full overflow-hidden',
      background: '',
      Icon: Calendar,
    },
    {
      id: '4',
      name: 'Analise o melhor horário',
      href: '/auth/sign-in',
      description:
        'Analise qual post pode ter o melhor engachamento para o post.',
      cta: 'Testar Agora',
      className: 'col-span-3 lg:col-span-1',
      background: '',
      Icon: Calendar,
    },
  ];

  return (
    <section className="mx-auto mt-10 h-full w-full max-w-full px-4 md:max-w-screen-xl md:px-12 lg:px-20">
      <div className="flex w-full flex-col items-center justify-center py-8 lg:items-center">
        <Badge>Funcionalidades</Badge>
        <h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
          Gerencie os videos de forma fácil
        </h2>
        <p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
          Purlo é uma poderosa ferramenta que ajuda você a centralizar,
          organizar e acompanhar todos os seus uploads para as redes sociais em
          um só lugar.
        </p>
      </div>

      <div>
        <BentoGrid>
          {features.map((feature) => {
            return <BentoCard key={feature.id} {...feature} />;
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
