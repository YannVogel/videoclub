import CustomerDetails from '@/components/CustomerDetails';

type PageProps = { params: { id: string } };

const CustomerDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;

  return <CustomerDetails id={id} />;
};

export default CustomerDetailPage;
