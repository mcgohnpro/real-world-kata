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
        {articles.map((slug) => {
          return (
            <li key={slug}>
              <ArticleListItem articleId={slug} />
            </li>
          )
        })}
      </ul>
      <Pagination currentPage={currentPage} articlesCount={articlesCount} />
    </>
  )
}
