import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import CatalogDetailPage from '@/app/catalog/[id]/page';
import { Vhs } from '@/models';

// ✅ Mock VhsById provider
vi.mock('@/components/api', () => ({
  VhsById: ({ children, id }: any) => {
    const mockState = (global as any).__VHS_BY_ID_STATE__;
    return children(mockState);
  },
}));

// ✅ Mock RentalListByVhs provider
vi.mock('@/components/api/rentals', () => ({
  RentalListByVhs: ({ children }: any) => {
    const mockState = (global as any).__RENTAL_LIST_STATE__;
    return children(mockState);
  },
}));

// ✅ Mock subcomponents to keep tests lightweight
vi.mock('@/components/RentalCreateForm', () => ({
  default: () => <div data-testid="rental-create-form">RentalCreateForm</div>,
}));
vi.mock('@/components/VhsMarkLostButton', () => ({
  default: () => <div data-testid="mark-lost-button">MarkLostButton</div>,
}));
vi.mock('@/components/RentalReturnButton', () => ({
  default: ({ rentalId }: { rentalId: string }) => (
    <button data-testid={`return-${rentalId}`}>Return {rentalId}</button>
  ),
}));

// Helper to set provider states
const setVhsState = (state: any) => {
  (global as any).__VHS_BY_ID_STATE__ = state;
};
const setRentalState = (state: any) => {
  (global as any).__RENTAL_LIST_STATE__ = state;
};

describe('CatalogDetailPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
    delete (global as any).__VHS_BY_ID_STATE__;
    delete (global as any).__RENTAL_LIST_STATE__;
  });

  it('renders loading state', async () => {
    setVhsState({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });
    setRentalState({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });

    render(await CatalogDetailPage({ params: { id: '1' } }));
    expect(screen.getAllByText(/Chargement/i).length).toBeGreaterThan(0);
  });

  it('renders error state with retry', async () => {
    const refetchMock = vi.fn();
    setVhsState({
      data: undefined,
      isLoading: false,
      error: new Error('Erreur réseau'),
      refetch: refetchMock,
    });
    setRentalState({
      data: [],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(await CatalogDetailPage({ params: { id: '1' } }));
    expect(screen.getByText(/Erreur : Erreur réseau/i)).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: /Réessayer/i });
    fireEvent.click(retryButton);
    expect(refetchMock).toHaveBeenCalledTimes(1);
  });

  it('renders "Introuvable" if no data', async () => {
    setVhsState({
      data: null,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
    setRentalState({
      data: [],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(await CatalogDetailPage({ params: { id: 'notfound' } }));
    expect(screen.getByText(/Introuvable/i)).toBeInTheDocument();
  });

  it('renders VHS details with status, synopsis and genres', async () => {
    const fakeVhs: Vhs = {
      id: 'vhs123',
      title: 'The Matrix',
      year: 1999,
      genres: ['science-fiction', 'action'],
      synopsis: 'A hacker discovers the truth about reality.',
      coverUrl: 'https://example.com/matrix.jpg',
      status: 'available',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setVhsState({
      data: fakeVhs,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
    setRentalState({
      data: [],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(await CatalogDetailPage({ params: { id: 'vhs123' } }));

    expect(screen.getByText(/The Matrix/i)).toBeInTheDocument();
    expect(screen.getByText(/Sortie en 1999/i)).toBeInTheDocument();
    expect(screen.getByText(/science-fiction/i)).toBeInTheDocument();
    expect(screen.getByText(/A hacker discovers/i)).toBeInTheDocument();
    expect(screen.getByTestId('mark-lost-button')).toBeInTheDocument();
    expect(screen.getByTestId('rental-create-form')).toBeInTheDocument();
  });

  it('renders rental history items with correct status', async () => {
    const now = new Date();
    const rentals = [
      {
        id: 'r1',
        rentedAt: now.toISOString(),
        dueDate: new Date(now.getTime() + 86400000).toISOString(),
        returnedAt: null,
        customer: { firstName: 'Alice', lastName: 'Durand' },
      },
      {
        id: 'r2',
        rentedAt: now.toISOString(),
        dueDate: new Date(now.getTime() - 86400000).toISOString(),
        returnedAt: null,
        customer: { firstName: 'Bob', lastName: 'Martin' },
      },
      {
        id: 'r3',
        rentedAt: now.toISOString(),
        dueDate: new Date(now.getTime() - 172800000).toISOString(),
        returnedAt: now.toISOString(),
        customer: { firstName: 'Charlie', lastName: 'Dupont' },
      },
    ];

    setVhsState({
      data: {
        id: 'vhs123',
        title: 'The Matrix',
        coverUrl: 'https://example.com/matrix.jpg',
        status: 'available',
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
    setRentalState({
      data: rentals,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(await CatalogDetailPage({ params: { id: 'vhs123' } }));

    // three rental rows rendered
    expect(screen.getAllByText(/👤/i)).toHaveLength(3);
    // corresponding return buttons
    expect(screen.getByTestId('return-r1')).toBeInTheDocument();
    expect(screen.getByTestId('return-r2')).toBeInTheDocument();
  });
});
