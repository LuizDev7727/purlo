import Header from '@/components/header';
import Tabs from '@/components/tabs';

type OrgLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>;

export default async function OrgLayout({ children, params }: OrgLayoutProps) {
  const { id: organizationId } = await params;

  return (
    <div>
      <div className="bg-card px-4 pt-6 lg:px-0">
        <Header organizationId={organizationId} />
        <Tabs organizationId={organizationId} />
      </div>

      <main className="mx-auto w-full max-w-[1200px] py-4">{children}</main>
    </div>
  );
}
