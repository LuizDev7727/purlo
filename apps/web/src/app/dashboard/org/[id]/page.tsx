import { FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChartAreaInteractive } from './chart-area-interactive';
import { SectionCards } from './section-cards';

export default function Metrics() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex w-full justify-end">
        <Button>
          <FileDown className="size-5" />
          Exportar
        </Button>
      </div>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div>
          <ChartAreaInteractive />
        </div>
      </div>
    </div>
  );
}
