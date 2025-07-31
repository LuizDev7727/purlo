import { FileUp, Share2, TextQuote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Process() {
  const steps = [
    {
      id: 1,
      title: 'Selecione os arquivos',
      description:
        'Escolha os vídeos que deseja enviar para processar e compartilhar.',
      icon: FileUp,
    },
    {
      id: 2,
      title: 'Geração de transcription e clips',
      description:
        'Converta seus vídeos em texto e crie automaticamente os melhores trechos.',
      icon: TextQuote,
    },
    {
      id: 3,
      title: 'Centralização de upload de posts',
      description:
        'Publique seus vídeos em múltiplas redes sociais a partir de um só lugar.',
      icon: Share2,
    },
  ];

  return (
    <div className="mx-auto mt-10 h-full w-full max-w-full px-4 md:max-w-screen-xl md:px-12 lg:px-20">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center">
        <Badge>O Processo</Badge>
        <h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
          Vídeos prontos para viralizar em 3 passos
        </h2>
        <p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
          Faça upload, edite e publique com agilidade — tudo em um só lugar.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 py-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {steps.map((step) => {
          return (
            <div
              className="group relative max-w-md overflow-hidden rounded-xl border border-border/60 bg-gradient-to-r from-background to-background/40 p-4 md:p-6 md:py-8"
              key={step.id}
            >
              <div className="flex w-full flex-col items-start justify-center">
                <step.icon
                  className="h-10 w-10 text-foreground"
                  strokeWidth={1.5}
                />
                <div className="relative flex flex-col items-start">
                  <span className="-top-6 absolute right-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border pt-0.5 font-medium text-2xl text-foreground">
                    {step.id}
                  </span>
                  <h3 className="mt-6 font-medium text-base text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
