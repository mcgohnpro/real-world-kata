import { Link } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'

import styles from './EditArticleButtons.module.scss'

export default function EditArticleButtons({ author, currentUser }) {
  const {
    path,
    params: { slug },
  } = useRouteMatch()

  if (!(path !== '/articles/:slug') && !(currentUser !== author.username))
    return (
      <div className={styles['edit-article-buttons-wrapper']}>
        <button
          type="button"
          onClick={() => {}}
          className={`${styles['edit-article-button']} ${styles['edit-article-button--delete']}`}
        >
          Delete
        </button>
        <Link
          to={`/articles/${slug}/edit`}
          className={`${styles['edit-article-button']} ${styles['edit-article-button--edit']}`}
        >
          Edit
        </Link>
      </div>
    )
}
