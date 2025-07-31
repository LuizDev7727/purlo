import { Check, CreditCard, Settings, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function UserSettings() {
  const plans = [
    {
      name: 'Grátis',
      price: 'R$ 0',
      period: '/mês',
      features: ['5 projetos', '1GB de armazenamento', 'Suporte por email'],
      current: true,
    },
    {
      name: 'Pro',
      price: 'R$ 29',
      period: '/mês',
      features: [
        'Projetos ilimitados',
        '10GB de armazenamento',
        'Suporte prioritário',
        'Analytics avançado',
      ],
      current: false,
    },
    {
      name: 'Business',
      price: 'R$ 99',
      period: '/mês',
      features: [
        'Tudo do Pro',
        '100GB de armazenamento',
        'Suporte 24/7',
        'API personalizada',
        'API personalizada',
        'Relatórios customizados',
      ],
      current: false,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Settings className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[90vh] gap-0 overflow-y-auto p-0"
        style={{
          width: '95vw',
          maxWidth: '1200px',
          minWidth: '320px', // Mudança: reduzir minWidth para mobile
        }}
      >
        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle>Minhas Configurações</DialogTitle>
            <DialogDescription>
              Gerencie sua conta, plano e informações de pagamento
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Seção de Atualização de Conta */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  Atualizar Minha Conta
                </CardTitle>
                <CardDescription className="text-sm">
                  No formulário abaixo você consegue atualizar as suas
                  informações do perfil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm" htmlFor="name">
                      Nome
                    </Label>
                    <Input
                      className="text-sm"
                      id="name"
                      placeholder="johndoe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      className="text-sm"
                      id="email"
                      placeholder="john@example.com"
                      type="email"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full text-sm sm:w-auto" size="sm">
                  Salvar Alterações
                </Button>
              </CardFooter>
            </Card>

            {/* Seção de Planos */}
            <Card>
              <CardHeader>
                <CardTitle>Planos e Assinatura</CardTitle>
                <CardDescription>
                  Escolha o plano que melhor se adequa às suas necessidades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {plans.map((plan) => (
                    <Card
                      className={`relative ${plan.current ? 'ring-2 ring-primary' : ''}`}
                      key={plan.name}
                    >
                      {plan.current && (
                        <Badge className="-top-2 absolute left-4 bg-primary text-xs">
                          Plano Atual
                        </Badge>
                      )}
                      <CardHeader className="pb-4 text-center">
                        <CardTitle className="text-base sm:text-lg">
                          {plan.name}
                        </CardTitle>
                        <div className="font-bold text-xl sm:text-2xl">
                          {plan.price}
                          <span className="font-normal text-muted-foreground text-xs sm:text-sm">
                            {plan.period}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <ul className="space-y-1.5 sm:space-y-2">
                          {plan.features.map((feature, index) => (
                            <li className="flex items-center gap-2" key={index}>
                              <Check className="size-3 flex-shrink-0 text-green-500 sm:size-4" />
                              <span className="text-xs sm:text-sm">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button
                          className="w-full text-xs sm:text-sm"
                          disabled={plan.current}
                          size="sm"
                          variant={plan.current ? 'outline' : 'default'}
                        >
                          {plan.current ? 'Plano Atual' : 'Escolher Plano'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Seção de Informações do Cartão */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <CreditCard className="size-4 sm:size-5" />
                  Informações de Pagamento
                </CardTitle>
                <CardDescription className="text-sm">
                  Gerencie seus métodos de pagamento e informações de cobrança
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm" htmlFor="cardNumber">
                      Número do Cartão
                    </Label>
                    <Input
                      className="text-sm"
                      disabled
                      id="cardNumber"
                      placeholder="**** **** **** 1234"
                      value="**** **** **** 1234"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm" htmlFor="cardName">
                      Nome no Cartão
                    </Label>
                    <Input
                      className="text-sm"
                      disabled
                      id="cardName"
                      placeholder="John Doe"
                      value="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm" htmlFor="expiry">
                      Validade
                    </Label>
                    <Input
                      className="text-sm"
                      disabled
                      id="expiry"
                      placeholder="MM/AA"
                      value="12/26"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm" htmlFor="cvv">
                      CVV
                    </Label>
                    <Input
                      className="text-sm"
                      disabled
                      id="cvv"
                      placeholder="***"
                      value="***"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 sm:flex-row">
                <Button
                  className="w-full bg-transparent text-sm sm:w-auto"
                  size="sm"
                  variant="outline"
                >
                  Atualizar Cartão
                </Button>
              </CardFooter>
            </Card>

            {/* Seção de Exclusão de Conta */}
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">
                  Zona de Perigo
                </CardTitle>
                <CardDescription>
                  Ações irreversíveis que afetam permanentemente sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="destructive">
                  <Trash className="mr-2 size-4" />
                  Excluir Conta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
