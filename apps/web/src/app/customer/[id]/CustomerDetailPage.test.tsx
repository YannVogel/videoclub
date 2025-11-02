import { render, screen } from '@testing-library/react';
import CustomerDetailPage from '@/app/customer/[id]/page';

// === Mocks des composants enfants ===
vi.mock('@/components/CustomerDetails', () => ({
  __esModule: true,
  default: ({ id }: any) => (
    <div data-testid="customer-details">CustomerDetails: {id}</div>
  ),
}));

vi.mock('@/components/CustomerRentalHistory', () => ({
  __esModule: true,
  default: ({ customerId }: any) => (
    <div data-testid="customer-rentals">
      CustomerRentalHistory: {customerId}
    </div>
  ),
}));

describe('CustomerDetailPage', () => {
  it('renders CustomerDetails and CustomerRentalHistory with correct IDs', async () => {
    const params = { id: '1234-abcd' };

    render(await CustomerDetailPage({ params }));

    expect(screen.getByTestId('customer-details')).toHaveTextContent(
      'CustomerDetails: 1234-abcd',
    );
    expect(screen.getByTestId('customer-rentals')).toHaveTextContent(
      'CustomerRentalHistory: 1234-abcd',
    );
  });
});
