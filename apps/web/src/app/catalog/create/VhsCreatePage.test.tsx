import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import VhsCreatePage from '@/app/catalog/create/page';

// === 🧩 Mocks globaux ===
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const mockSearch = vi.fn();
const mockGetDetails = vi.fn();

vi.mock('@/lib/external/omdb', () => ({
  searchMovies: (...args: any[]) => mockSearch(...args),
  getMovieDetails: (...args: any[]) => mockGetDetails(...args),
}));

vi.mock('@/components/api/VhsCreate', () => ({
  default: ({ children }: any) =>
    children({
      mutate: vi.fn((data, opts) => opts?.onSuccess?.()),
      isPending: false,
      error: null,
    }),
}));

vi.mock('@/components/MovieSearchResults', () => ({
  MovieSearchResults: ({ results, onSelect }: any) => (
    <div data-testid="movie-results">
      {results.map((r: any) => (
        <button
          key={r.imdbID}
          onClick={() => onSelect(r.imdbID)}
          data-testid={`movie-${r.imdbID}`}
        >
          {r.Title}
        </button>
      ))}
    </div>
  ),
}));

describe('VhsCreatePage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the page title and search input', () => {
    render(<VhsCreatePage />);
    expect(screen.getByText(/Ajouter une VHS/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Rechercher un film/i),
    ).toBeInTheDocument();
  });

  it('performs a search when clicking "Rechercher"', async () => {
    mockSearch.mockResolvedValueOnce([
      { imdbID: 'tt0133093', Title: 'The Matrix' },
    ]);

    render(<VhsCreatePage />);

    const input = screen.getByPlaceholderText(/Rechercher un film/i);
    fireEvent.change(input, { target: { value: 'Matrix' } });

    const button = screen.getByRole('button', { name: /Rechercher/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('Matrix');
    });

    expect(await screen.findByTestId('movie-results')).toBeInTheDocument();
  });

  it('selects a movie and pre-fills the form', async () => {
    mockSearch.mockResolvedValueOnce([
      { imdbID: 'tt0133093', Title: 'Matrix' },
    ]);
    mockGetDetails.mockResolvedValueOnce({
      Title: 'Matrix',
      Plot: 'A hacker discovers reality.',
      Poster: 'poster.jpg',
      Year: '1999',
      Genre: 'Action, Sci-Fi',
    });

    render(<VhsCreatePage />);

    // Simule une recherche
    const input = screen.getByPlaceholderText(/Rechercher un film/i);
    fireEvent.change(input, { target: { value: 'Matrix' } });
    fireEvent.click(screen.getByRole('button', { name: /Rechercher/i }));

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalled();
    });

    // Sélection du film
    const selectButton = await screen.findByTestId('movie-tt0133093');
    fireEvent.click(selectButton);

    await waitFor(() => {
      expect(mockGetDetails).toHaveBeenCalledWith('tt0133093');
    });

    // Vérifie que le formulaire apparaît et contient les bonnes données
    expect(
      await screen.findByDisplayValue('A hacker discovers reality.'),
    ).toBeInTheDocument();
  });
});
