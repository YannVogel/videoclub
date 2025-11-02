import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HomePage from '@/app/page';
import { Vhs } from '@/models';
// Import the mocked function *after* mocking
import { useQuery } from '@tanstack/react-query';

// ✅ Mock React Query BEFORE import of HomePage
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

// Mock VhsCard so we don't depend on its rendering
vi.mock('@/components/VhsCard', () => ({
  default: ({ vhs }: { vhs: Vhs }) => (
    <div data-testid="vhs-card">{vhs.title}</div>
  ),
}));

// Mock the API module if necessary
vi.mock('@/lib/api', () => ({
  api: { get: vi.fn() },
}));

describe('HomePage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders a loading message', () => {
    (useQuery as any).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });

    render(<HomePage />);
    expect(
      screen.getByText(/Chargement des cassettes en cours/i),
    ).toBeInTheDocument();
  });

  it('renders an error message and allows retry', () => {
    const refetchMock = vi.fn();
    (useQuery as any).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Erreur réseau'),
      refetch: refetchMock,
    });

    render(<HomePage />);

    expect(screen.getByText(/Erreur : Erreur réseau/i)).toBeInTheDocument();
    const retryButton = screen.getByRole('button', { name: /réessayer/i });
    fireEvent.click(retryButton);
    expect(refetchMock).toHaveBeenCalledTimes(1);
  });

  it('renders a message when there are no rented tapes', () => {
    (useQuery as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<HomePage />);
    expect(
      screen.getByText(/Aucune cassette actuellement en location/i),
    ).toBeInTheDocument();
  });

  it('renders a list of rented tapes', () => {
    const fakeData: Vhs[] = [
      {
        id: '1',
        title: 'Matrix',
        year: 1999,
        genres: [],
        synopsis: '...',
        coverUrl: 'https://example.com/matrix.jpg',
        status: 'rented',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Alien',
        year: 1979,
        genres: [],
        synopsis: '...',
        coverUrl: 'https://example.com/alien.jpg',
        status: 'rented',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    (useQuery as any).mockReturnValue({
      data: fakeData,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<HomePage />);
    const cards = screen.getAllByTestId('vhs-card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText(/Matrix/i)).toBeInTheDocument();
    expect(screen.getByText(/Alien/i)).toBeInTheDocument();
  });
});
