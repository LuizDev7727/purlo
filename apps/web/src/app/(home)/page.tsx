import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Features from './features';
import Feedbacks from './feedbacks';
import Footer from './footer';
import Header from './header';
import Pricing from './pricing';
import Process from './process';

export default function Home() {
  return (
    <div>
      <div
        className="absolute inset-0 h-full bg-[linear-gradient(to_right,oklch(0.92_0.004_286.32)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.92_0.004_286.32)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)]"
        id="home"
      />

      <Header />

      <main className="relative z-0 mx-auto mt-20 w-full">
        <section className="mx-auto h-full w-full max-w-full px-4 md:max-w-screen-xl md:px-12 lg:px-20">
          <div className="flex w-full flex-col items-center justify-center bg-gradient-to-t from-background text-center">
            <div className="flex w-full flex-col items-center justify-center text-center">
              <button
                className="group relative grid overflow-hidden rounded-full bg-primary px-4 py-1 transition-colors duration-200"
                type="button"
              >
                <span>
                  <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
                </span>
                <span className="backdrop absolute inset-[1px] rounded-full transition-colors duration-200 " />
                <span className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-tr from-primary/20 blur-md" />
                <span className="z-10 flex items-center justify-center gap-1 py-0.5 text-sm text-white">
                  ✨ Gerencie videos de forma inteligente
                  <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </span>
              </button>

              <h1 className="!leading-[1.15] w-full text-balance py-6 text-center font-heading font-medium text-5xl text-foreground tracking-normal sm:text-6xl md:text-7xl lg:text-8xl">
                Centralize seus videos com{' '}
                <span className="inline-bloc bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                  Precisão
                </span>
              </h1>

              <p className="mb-12 text-balance text-lg text-muted-foreground tracking-tight md:text-xl">
                Simplifique seu gerenciamento de posts com o Purlo.
                <br className="hidden md:block" />
                <span className="hidden md:block">
                  Selecione, Espalhe e organize tudo em um só lugar.
                </span>
              </p>

              <div className="z-50 flex items-center justify-center gap-4 whitespace-nowrap">
                <Button asChild>
                  <Link className="flex items-center" href={'/auth/sign-in'}>
                    Começe agora de graça
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="relative w-full bg-transparent px-2 pt-20 pb-20 md:py-32">
            <div className="gradient -translate-x-1/2 absolute inset-0 left-1/2 h-1/4 w-3/4 blur-[5rem] md:top-[10%] md:h-1/3" />
            <div className="-m-2 lg:-m-4 rounded-xl bg-opacity-50 p-2 ring-1 ring-foreground/20 ring-inset backdrop-blur-3xl lg:rounded-2xl">
              <Image
                alt="Dashboard"
                className="rounded-md bg-foreground/10 ring-1 ring-border lg:rounded-xl"
                height={1200}
                quality={100}
                src="/assets/dashboard-dark.svg"
                width={1200}
              />
              <div className="-bottom-4 absolute inset-x-0 z-40 h-1/2 w-full bg-gradient-to-t from-background" />
              <div className="md:-bottom-8 absolute inset-x-0 bottom-0 z-50 h-1/4 w-full bg-gradient-to-t from-background" />
            </div>
          </div>
        </section>

        <Features />
        <Process />
        <Pricing />
        <Feedbacks />
      </main>

      <Footer />
    </div>
  );
}
