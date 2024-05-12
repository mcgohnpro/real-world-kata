/* eslint-disable no-unused-vars */
import ArticleListItem from '../../article'

import styles from './ArticlesList.module.scss'

export default function ArticlesListPage() {
  return (
    <main>
      <ul className={styles['articles-list']}>
        <ArticleListItem />
        <ArticleListItem />
      </ul>
    </main>
  )
}
