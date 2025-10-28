import VhsDetails from '@/components/VhsDetails';

type PageProps = { params: { id: string } };

const CatalogDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;
  return <VhsDetails id={id} />;
};

export default CatalogDetailPage;
