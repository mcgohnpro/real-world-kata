import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useEffect, useMemo } from 'react'

import { updateCurrentPage, fetchArticles } from '../../../store/slices/articleSlice'
import ArticleListItem from '../../article'
import Pagination from '../../pagination'

// TODO переименовать сам файл

import styles from './ArticlesList.module.scss'

function useQuery() {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

export default function ArticlesListPage() {
  const dispatch = useDispatch()
  const query = useQuery()

  useEffect(() => {
    const page = query.get('page')

    if (page) {
      dispatch(updateCurrentPage(page))
      dispatch(fetchArticles((page - 1) * 5))
    } else {
      dispatch(updateCurrentPage('1'))
      dispatch(fetchArticles())
    }
  }, [query])

  const { articles, articlesCount } = useSelector((store) => {
    return store.articles
  })
  return (
    <>
      <ul className={styles['articles-list']}>
        {articles.map((slug) => {
          return (
            <li key={slug}>
              <ArticleListItem articleId={slug} />
            </li>
          )
        })}
      </ul>
      <Pagination articlesCount={articlesCount} />
    </>
  )
}
