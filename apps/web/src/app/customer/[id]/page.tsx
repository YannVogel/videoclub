import CustomerDetails from '@/components/CustomerDetails';
import CustomerRentalHistory from '@/components/CustomerRentalHistory';

type PageProps = { params: { id: string } };

const CustomerDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <>
      <CustomerDetails id={id} />
      <CustomerRentalHistory customerId={id} />
    </>
  );
};

export default CustomerDetailPage;
