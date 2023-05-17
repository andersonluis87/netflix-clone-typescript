export const constants = {
  MOVIEDB_API_URL: 'https://api.themoviedb.org/3/',
  MOVIEDB_API_CONFIGS: `language=pt-BR&api_key=${
    import.meta.env.VITE_MOVIEDB_API_KEY
  }`,
  MOVIEDB_NETFLIX_TV_ID: 'with_network=213',
}
