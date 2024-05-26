/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Spin } from 'antd'

import { loadArticles } from '../../../store/slices/articleSlice'
import ArticleListItem from '../../article'
import Pagination from '../../pagination'
import { useQuery } from '../../../hooks'

// TODO переименовать сам файл

import styles from './ArticlesList.module.scss'

export default function ArticlesListPage() {
  const { loading } = useSelector((store) => store.commonState)
  const dispatch = useDispatch()
  const query = useQuery()

  useEffect(() => {
    const page = query.get('page')
    if (page) {
      dispatch(loadArticles((page - 1) * 5))
    } else {
      dispatch(loadArticles())
    }
  }, [query])

  const { articles, articlesCount } = useSelector((store) => {
    return store.articles
  })

  // if (loading) {
  //   return <Spin size="large" />
  // }
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
