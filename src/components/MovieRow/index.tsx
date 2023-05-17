import { useState } from 'react'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import './styles.scss'
import { Movie, MovieRowProps } from '../../defs'

export const MovieRow = ({
  title,
  items,
  changeFeaturedMovie,
}: MovieRowProps) => {
  const [scrollX, setScrollX] = useState(0)

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2)
    if (x > 0) {
      x = 0
    }
    setScrollX(x)
  }

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2)
    const listWidth = items.results.length * 150
    if (window.innerWidth - listWidth > x) {
      x = window.innerWidth - listWidth - 60
    }
    setScrollX(x)
  }

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow--left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--listarea">
        <div
          className="movieRow--list"
          style={{
            marginLeft: scrollX,
            width: items.results.length * 150,
          }}
        >
          {items.results.length > 0 &&
            items.results.map((item: Movie, key: number) => (
              <div key={key} className="movieRow--item">
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item?.original_title}
                  onClick={() => changeFeaturedMovie(item)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
