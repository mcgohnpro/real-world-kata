import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { useQuery } from '../../hooks'
import { ROUTE_PATH_TEMPLATES } from '../../constants/routes-constants'

import styles from './Pagination.module.scss'

export default function Pagination() {
  const history = useHistory()
  const articlesCount = useSelector((store) => store.articles.articlesCount)
  const query = useQuery()
  const currentPage = Number(query.get('page')) || 1

  if (Math.sign(currentPage) === -1) {
    history.push(ROUTE_PATH_TEMPLATES.ARTICLES_PAGES(1))
  }

  const [startPage, setStartPage] = useState(0)

  const pages = useMemo(() => {
    const arr = []
    for (let i = 0; i < Math.ceil(articlesCount / 5); i += 1) {
      arr[i] = i + 1
    }
    return arr
  }, [articlesCount])

  useEffect(() => {
    if (pages.length && currentPage > pages.length) {
      history.push(ROUTE_PATH_TEMPLATES.ARTICLES_PAGES(pages.length))
    }
  }, [pages])

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
          history.push(ROUTE_PATH_TEMPLATES.ARTICLES_PAGES(currentPage - 1))
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
              history.push(ROUTE_PATH_TEMPLATES.ARTICLES_PAGES(page))
            }}
            key={page}
            type="button"
            aria-label={`page number ${page} button`}
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
          history.push(ROUTE_PATH_TEMPLATES.ARTICLES_PAGES(currentPage + 1))
        }}
        disabled={currentPage >= pages.length}
      />
    </div>
  )
}
