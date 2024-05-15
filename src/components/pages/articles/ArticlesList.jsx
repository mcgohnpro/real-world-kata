/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux'

import ArticleListItem from '../../article'
import Pagination from '../../pagination'

import styles from './ArticlesList.module.scss'

export default function ArticlesListPage() {
  const { articles, currentPage, articlesCount } = useSelector((store) => {
    return store.articles
  })
  return (
    <>
      <ul className={styles['articles-list']}>
        {articles.map((article) => {
          return (
            <li key={article.slug}>
              <ArticleListItem article={article} />
            </li>
          )
        })}
      </ul>
      <Pagination currentPage={currentPage} articlesCount={articlesCount} />
    </>
  )
}
