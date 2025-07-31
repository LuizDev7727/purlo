import { CreditCardIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import PricingCards from './pricing-cards';

export default function Pricing() {
  return (
    <div className="mx-auto mt-10 h-full w-full max-w-full px-4 md:max-w-screen-xl md:px-12 lg:px-20">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center">
        <Badge>Precificação</Badge>
        <h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
          Escolha o melhor plano para você
        </h2>
        <p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
          Começe com o Purlo hoje e aproveite todas as funcionalidades do nosso plano pro.
        </p>
      </div>
      <PricingCards />
      <div className="mx-auto mt-12 flex w-full max-w-5xl flex-wrap items-start justify-center gap-6 md:items-center lg:justify-evenly">
        <div className="flex items-center gap-2">
          <CreditCardIcon className="h-5 w-5 text-foreground" />
          <span className="text-muted-foreground">Não é obrigatório cartão de crédito</span>
        </div>
      </div>
    </div>
  );
}
