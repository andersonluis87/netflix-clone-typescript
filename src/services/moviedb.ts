import { Movie, MovieList } from '../defs'
import { constants } from '../constants'

const basicFetch = async (endpoint: string) => {
  const req = await fetch(`${constants.MOVIEDB_API_URL}${endpoint}`)
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
          `discover/tv?${constants.MOVIEDB_NETFLIX_TV_ID}&${constants.MOVIEDB_API_CONFIGS}`
        ),
      },
      {
        slug: 'trending',
        title: 'Recomendados para Você',
        items: await basicFetch(
          `trending/all/week?${constants.MOVIEDB_API_CONFIGS}`
        ),
      },
      {
        slug: 'toprated',
        title: 'Em Alta',
        items: await basicFetch(
          `movie/top_rated?${constants.MOVIEDB_API_CONFIGS}`
        ),
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch(
          `discover/movie?with_genres=28&${constants.MOVIEDB_API_CONFIGS}`
        ),
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch(
          `discover/movie?with_genres=35&${constants.MOVIEDB_API_CONFIGS}`
        ),
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch(
          `discover/movie?with_genres=27&${constants.MOVIEDB_API_CONFIGS}`
        ),
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(
          `discover/movie?with_genres=10749&${constants.MOVIEDB_API_CONFIGS}`
        ),
      },
      {
        slug: 'documentary',
        title: 'Documentários',
        items: await basicFetch(
          `discover/movie?with_genres=99&${constants.MOVIEDB_API_CONFIGS}`
        ),
      },
    ]
  },
  getMovieInfo: async (id: number, type: 'movie' | 'tv'): Promise<Movie> => {
    let info = await basicFetch(
      `${type}/${id}?${constants.MOVIEDB_API_CONFIGS}`
    )

    //handling media type movie that does not contain such attribute
    if (type === 'tv' && info?.success === false) {
      info = await basicFetch(`movie/${id}?${constants.MOVIEDB_API_CONFIGS}`)
    }

    return info
  },
}
