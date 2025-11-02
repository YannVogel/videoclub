import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import CustomerPage from '@/app/customer/page';
import { Customer } from '@/models';

// ✅ Mock the CustomerList provider
vi.mock('@/components/api/customers/CustomerList', () => ({
  CustomerList: ({ children }: any) => {
    const mockState = (global as any).__CUSTOMER_LIST_STATE__;
    return children(mockState);
  },
}));

// Helper function to set the mock state
const setCustomerListState = (state: any) => {
  (global as any).__CUSTOMER_LIST_STATE__ = state;
};

describe('CustomerPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
    delete (global as any).__CUSTOMER_LIST_STATE__;
  });

  it('renders the header and add button', () => {
    setCustomerListState({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<CustomerPage />);

    expect(screen.getByText(/📇 Liste des clients/i)).toBeInTheDocument();
    const addButton = screen.getByRole('link', {
      name: /\+ Ajouter un client/i,
    });
    expect(addButton).toHaveAttribute('href', '/customer/create');
  });

  it('renders a loading message', () => {
    setCustomerListState({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<CustomerPage />);
    expect(screen.getByText(/Chargement…/i)).toBeInTheDocument();
  });

  it('renders an error message', () => {
    setCustomerListState({
      data: undefined,
      isLoading: false,
      error: new Error('Erreur réseau'),
    });

    render(<CustomerPage />);
    expect(screen.getByText(/Erreur de chargement/i)).toBeInTheDocument();
  });

  it('renders a message when no customers are found', () => {
    setCustomerListState({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<CustomerPage />);
    expect(
      screen.getByText(/Aucun client trouvé pour le moment/i),
    ).toBeInTheDocument();
  });

  it('renders a list of customers', () => {
    const fakeCustomers: Customer[] = [
      {
        id: 'b9d8a5d2-0f21-4c0d-a73e-39f4a1f2073a',
        firstName: 'Alice',
        lastName: 'Durand',
        email: 'alice@example.com',
        phone: '0600000000',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'a3f1b9c5-5d7c-4b4a-b6ad-8a9fef9c7a82',
        firstName: 'Bob',
        lastName: 'Martin',
        email: 'bob@example.com',
        phone: '0611111111',
        createdAt: new Date().toISOString(),
      },
    ];

    setCustomerListState({
      data: fakeCustomers,
      isLoading: false,
      error: null,
    });

    render(<CustomerPage />);

    // Vérifie que la liste et les liens sont bien rendus
    expect(screen.getByText(/Alice Durand/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob Martin/i)).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(
      links.some((l) => l.getAttribute('href')?.includes('/customer/')),
    ).toBe(true);
  });
});
