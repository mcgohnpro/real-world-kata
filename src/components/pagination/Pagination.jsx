/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { fetchArticles, updateCurrentPage } from '../../store/slices/articleSlice'

import styles from './Pagination.module.scss'

export default function Pagination({ currentPage, articlesCount }) {
  const [startPage, setStartPage] = useState(0)
  const dispatch = useDispatch()
  const pages = useMemo(() => {
    const arr = []
    for (let i = 0; i <= Math.ceil(articlesCount / 5); i += 1) {
      arr[i] = i + 1
    }
    return arr
  }, [articlesCount])

  return (
    <div className={styles['pagination-wrapper']}>
      <button disabled type="button" aria-label="backward page" className={styles['page-arrow-button']} />
      {pages.slice(startPage, startPage + 5).map((page, index) => {
        return (
          <button
            onClick={() => {
              dispatch(updateCurrentPage(startPage + index + 1))
              dispatch(fetchArticles(`${(startPage + index) * 5}`))
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
          setStartPage((prevState) => {
            return prevState + 1
          })
        }}
      />
    </div>
  )
}

Pagination.defaultProps = {
  currentPage: 1,
  articlesCount: 1,
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  articlesCount: PropTypes.number,
}
