import { Upload } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center border-border border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 pt-16 pb-8 md:pb-0 lg:px-8 lg:pt-32">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-0 right-1/2 left-1/2 h-1.5 w-8 rounded-full bg-foreground" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <div>
          <div className="flex flex-col items-start justify-start md:max-w-[200px]">
            <div className="flex items-start">
              <Upload className="h-7 w-7" />
            </div>
            <p className="mt-4 text-start text-muted-foreground text-sm">
              Manage your links with ease.
            </p>
            <span className="mt-4 flex items-center text-neutral-200 text-sm">
              Made by{' '}
              <Link
                className="ml-1 font-semibold"
                href="https://github.com/LuizDev7727.png"
              >
                Purlo
              </Link>
            </span>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <div className="">
                <h3 className="font-medium text-base text-white">Produtos</h3>
                <ul className="mt-4 text-muted-foreground text-sm">
                  <li className="mt-2">
                    <Link
                      className="transition-all duration-300 hover:text-foreground"
                      href=""
                    >
                      Features
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      className="transition-all duration-300 hover:text-foreground"
                      href=""
                    >
                      Pricing
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      className="transition-all duration-300 hover:text-foreground"
                      href=""
                    >
                      Testimonials
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      className="transition-all duration-300 hover:text-foreground"
                      href=""
                    >
                      Integration
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="mt-10 flex flex-col md:mt-0">
                <h3 className="font-medium text-base text-white">
                  Integrações
                </h3>
                <ul className="mt-4 text-muted-foreground text-sm">
                  <li className="">
                    <Link
                      className="transition-all duration-300 hover:text-foreground"
                      href=""
                    >
                      Facebook
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      className="transition-all duration-300 hover:text-foreground"
                      href=""
                    >
                      Instagram
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      className="transition-all duration-300 hover:text-foreground"
                      href=""
                    >
                      Twitter
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      className="transition-all duration-300 hover:text-foreground"
                      href=""
                    >
                      LinkedIn
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <div className="">
                <h3 className="font-medium text-base text-white">Recursos</h3>
                <ul className="mt-4 text-muted-foreground text-sm">
                  <li className="mt-2">
                    <Link
                      className="transition-all duration-300 hover:text-foreground"
                      href="/resources/blog"
                    >
                      Blog
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      className="transition-all duration-300 hover:text-foreground"
                      href="/resources/help"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="mt-10 flex flex-col md:mt-0">
                <h3 className="font-medium text-base text-white">Empresa</h3>
                <ul className="mt-4 text-muted-foreground text-sm">
                  <li className="">
                    <Link
                      className="transition-all duration-300 hover:text-foreground"
                      href=""
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      className="transition-all duration-300 hover:text-foreground"
                      href="/privacy"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      className="transition-all duration-300 hover:text-foreground"
                      href="/terms"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 w-full border-border/40 border-t pt-4 md:flex md:items-center md:justify-between md:pt-8">
        <div>
          <p className="mt-8 text-muted-foreground text-sm md:mt-0">
            &copy; {new Date().getFullYear()} Purlo INC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
