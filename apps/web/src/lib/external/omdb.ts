import axios from 'axios';

const OMDB_API_URL = 'https://www.omdbapi.com/';
const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || '';

export const searchMovies = async (title: string) => {
  const { data } = await axios.get(OMDB_API_URL, {
    params: { s: title, type: 'movie', apikey: API_KEY },
  });
  return data.Search || [];
};

export const getMovieDetails = async (imdbID: string) => {
  const { data } = await axios.get(OMDB_API_URL, {
    params: { i: imdbID, apikey: API_KEY },
  });
  return data;
};
