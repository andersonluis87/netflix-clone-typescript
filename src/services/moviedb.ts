import { Movie, MovieList } from '../defs'

const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY
const API_BASE = 'https://api.themoviedb.org/3/'
const LANGUAGE = 'pt-BR'
const NETFLIX_NETWORK_PARAM = 'with_network=213'

const basicFetch = async (endpoint: string) => {
  const req = await fetch(`${API_BASE}${endpoint}`)
  const json = await req.json()

  return json
}

export const moviedb = {
  getHomeList: async (): Promise<MovieList[]> => {
    return [
      {
        slug: 'originals',
        title: 'Originais do Netflix',
        items: await basicFetch(
          `discover/tv?${NETFLIX_NETWORK_PARAM}&language=${LANGUAGE}&api_key=${API_KEY}`
        ),
      },
      {
        slug: 'trending',
        title: 'Recomendados para Você',
        items: await basicFetch(
          `trending/all/week?language=${LANGUAGE}&api_key=${API_KEY}`
        ),
      },
      {
        slug: 'toprated',
        title: 'Em Alta',
        items: await basicFetch(
          `movie/top_rated?language=${LANGUAGE}&api_key=${API_KEY}`
        ),
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch(
          `discover/movie?with_genres=28&language=${LANGUAGE}&api_key=${API_KEY}`
        ),
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch(
          `discover/movie?with_genres=35&language=${LANGUAGE}&api_key=${API_KEY}`
        ),
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch(
          `discover/movie?with_genres=27&language=${LANGUAGE}&api_key=${API_KEY}`
        ),
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(
          `discover/movie?with_genres=10749&language=${LANGUAGE}&api_key=${API_KEY}`
        ),
      },
      {
        slug: 'documentary',
        title: 'Documentários',
        items: await basicFetch(
          `discover/movie?with_genres=99&language=${LANGUAGE}&api_key=${API_KEY}`
        ),
      },
    ]
  },
  getMovieInfo: async (id: number, type: string): Promise<Movie> => {
    let info

    if (id) {
      switch (type) {
        case 'movie':
          info = await basicFetch(
            `movie/${id}?language=${LANGUAGE}&api_key=${API_KEY}`
          )
          break
        case 'tv':
          info = await basicFetch(
            `tv/${id}?language=${LANGUAGE}&api_key=${API_KEY}`
          )
          break
        default:
          info = {}
      }
    }

    //handling media type movie that does not contain such attribute
    if (type === 'tv' && info?.success === false) {
      info = await basicFetch(
        `movie/${id}?language=${LANGUAGE}&api_key=${API_KEY}`
      )
    }
    return info
  },
}
