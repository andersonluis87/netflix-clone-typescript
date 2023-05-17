import { useEffect, useState } from 'react'
import { Movie, MovieList } from './defs'
import { moviedb } from './services/moviedb'

import { Header } from './components/Header'
import { FeaturedMovie } from './components/FeaturedMovie'
import { MovieRow } from './components/MovieRow'

import './App.scss'

function App() {
  const [movieList, setMovieList] = useState<MovieList[]>([])
  const [featuredData, setFeaturedData] = useState<Movie>()
  const [darkHeader, setDarkHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      const list = await moviedb.getHomeList()

      setMovieList(list)
      setRandomFeaturedMovie(list)
    }

    loadAll()
  }, [])

  const setFeaturedMovie = async (featuredMovie: Movie) => {
    const mediaType = featuredMovie?.media_type === 'movie' ? 'movie' : 'tv'
    const featuredMovieInfo = await moviedb.getMovieInfo(
      featuredMovie.id,
      mediaType
    )

    setFeaturedData(featuredMovieInfo)
  }

  const setRandomFeaturedMovie = (list: MovieList[]) => {
    const originals = list.filter((item) => item.slug === 'originals')
    const randomItem = Math.floor(
      Math.random() * (originals[0].items.results.length - 1)
    )
    const featuredMovie = originals[0].items.results[randomItem]

    setFeaturedMovie(featuredMovie)
  }

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setDarkHeader(true)
      } else {
        setDarkHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className="page">
      <Header dark={darkHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow
            key={key}
            title={item.title}
            items={item.items}
            changeFeaturedMovie={setFeaturedMovie}
          />
        ))}
      </section>

      <footer>
        Feito com{' '}
        <span role="img" aria-label="heart">
          ❤️
        </span>
        <br />
        Direitos de imagem para Netflix
        <br />
        Dados obtidos pela API do TMDB (themoviedb.org)
      </footer>
      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_500/Netflix_LoadTime.gif"
            alt="loading..."
          />
        </div>
      )}
    </div>
  )
}

export default App
