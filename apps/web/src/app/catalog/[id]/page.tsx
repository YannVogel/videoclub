import VhsDetails from '@/components/VhsDetails';
import VhsRentalHistory from '@/components/VhsRentalHistory';

type PageProps = { params: { id: string } };

const CatalogDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <>
      <VhsDetails id={id} />
      <VhsRentalHistory vhsId={id} />
    </>
  );
};

export default CatalogDetailPage;
