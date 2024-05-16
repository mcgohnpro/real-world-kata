import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import styles from './Pagination.module.scss'

export default function Pagination() {
  const history = useHistory()
  const { currentPage, articlesCount } = useSelector((store) => {
    return store.articles
  })
  const [startPage, setStartPage] = useState(0)

  const pages = useMemo(() => {
    const arr = []
    for (let i = 0; i < Math.ceil(articlesCount / 5); i += 1) {
      arr[i] = String(i + 1)
    }
    return arr
  }, [articlesCount])

  if (currentPage > startPage + 5) {
    setStartPage(currentPage - 1)
  }

  if (currentPage <= startPage) {
    setStartPage(currentPage - 1)
  }

  return (
    <div className={styles['pagination-wrapper']}>
      <button
        onClick={() => {
          history.push(`/articles/?page=${+currentPage - 1}`)
        }}
        disabled={currentPage === 1}
        type="button"
        aria-label="backward page"
        className={styles['page-arrow-button']}
      />
      {pages.slice(startPage, startPage + 5).map((page) => {
        return (
          <button
            onClick={() => {
              history.push(`/articles/?page=${page}`)
            }}
            key={page}
            type="button"
            aria-label="page number button"
            className={page === currentPage ? [styles['page-button'], styles.current].join(' ') : styles['page-button']}
          >
            {page}
          </button>
        )
      })}
      <button
        type="button"
        aria-label="forward page"
        className={styles['page-arrow-button']}
        onClick={() => {
          history.push(`/articles/?page=${+currentPage + 1}`)
        }}
      />
    </div>
  )
}
