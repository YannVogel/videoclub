import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Catalog from '@/app/catalog/page';
import { Vhs } from '@/models';

// ✅ Mock the VhsList provider
vi.mock('@/components/api', () => ({
  VhsList: ({ children }: any) => {
    // We'll manually control what children receive using a mock implementation
    const mockState = (global as any).__VHS_LIST_STATE__;
    return children(mockState);
  },
}));

// ✅ Mock VhsCard to simplify rendering
vi.mock('@/components/VhsCard', () => ({
  default: ({ vhs }: { vhs: Vhs }) => (
    <div data-testid="vhs-card">{vhs.title}</div>
  ),
}));

// Helper function to set mock provider state
const setVhsListState = (state: any) => {
  (global as any).__VHS_LIST_STATE__ = state;
};

describe('Catalog Page', () => {
  afterEach(() => {
    vi.clearAllMocks();
    delete (global as any).__VHS_LIST_STATE__;
  });

  it('renders the header and add link', () => {
    setVhsListState({
      data: [],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<Catalog />);

    expect(screen.getByText(/📼 Catalogue VHS/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /\+ Ajouter une VHS/i }),
    ).toHaveAttribute('href', '/catalog/create');
  });

  it('renders a loading message', () => {
    setVhsListState({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });

    render(<Catalog />);
    expect(screen.getByText(/Chargement du catalogue/i)).toBeInTheDocument();
  });

  it('renders an error message and allows retry', () => {
    const refetchMock = vi.fn();

    setVhsListState({
      data: undefined,
      isLoading: false,
      error: new Error('Erreur réseau'),
      refetch: refetchMock,
    });

    render(<Catalog />);

    expect(screen.getByText(/Erreur : Erreur réseau/i)).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: /Réessayer/i });
    fireEvent.click(retryButton);

    expect(refetchMock).toHaveBeenCalledTimes(1);
  });

  it('renders a list of VHS items', () => {
    const fakeData: Vhs[] = [
      {
        id: '1',
        title: 'Blade Runner',
        year: 1982,
        genres: [],
        synopsis: '...',
        coverUrl: 'https://example.com/blade.jpg',
        status: 'available',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Ghostbusters',
        year: 1984,
        genres: [],
        synopsis: '...',
        coverUrl: 'https://example.com/ghost.jpg',
        status: 'available',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    setVhsListState({
      data: fakeData,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<Catalog />);

    const cards = screen.getAllByTestId('vhs-card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText(/Blade Runner/i)).toBeInTheDocument();
    expect(screen.getByText(/Ghostbusters/i)).toBeInTheDocument();
  });
});
