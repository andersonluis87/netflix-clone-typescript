export type Movie = {
  id: number
  title: string
  original_title: string
  poster_path: string
  adult: boolean
  overview: string
  release_date: Date
  genres: {
    id: number
    name: string
  }[]
  original_language: string
  original_name: string
  backdrop_path: string
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
  media_type: 'movie' | 'tv'
  first_air_date: string
  number_of_seasons: number
}

export interface SearchResults<T> {
  page: number
  results: T
  total_pages: number
  total_results: number
}

export interface HeaderProps {
  dark?: boolean
}

export interface MovieRowProps {
  title: string
  items: SearchResults<Movie[]>
  changeFeaturedMovie: (item: Movie) => void
}

export interface FeaturedMovieProps {
  item: Movie
}

export interface MovieList {
  slug: string
  title: string
  items: SearchResults<Movie[]>
}
