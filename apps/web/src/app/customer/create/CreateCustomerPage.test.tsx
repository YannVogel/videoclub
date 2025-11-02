import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import CreateCustomerPage from '@/app/customer/create/page';

// === Mocks ===
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const mockMutate = vi.fn();

vi.mock('@/components/api/customers/CustomerCreate', () => ({
  CustomerCreate: ({ children }: any) =>
    children({
      mutate: mockMutate,
      isPending: false,
      error: null,
    }),
}));

describe('CreateCustomerPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title and form fields', () => {
    render(<CreateCustomerPage />);

    expect(
      screen.getByRole('heading', { name: /ajouter un client/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Prénom')).toBeInTheDocument();
    expect(screen.getByLabelText('Nom')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Téléphone')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /créer le client/i }),
    ).toBeInTheDocument();
  });

  it('shows validation messages when fields are empty', async () => {
    render(<CreateCustomerPage />);
    fireEvent.click(screen.getByRole('button', { name: /créer le client/i }));

    await waitFor(() => {
      // on vérifie les vrais messages français de votre schéma
      expect(
        screen.getByText(/Le prénom est obligatoire/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/Le nom est obligatoire/i)).toBeInTheDocument();
    });
  });
});
