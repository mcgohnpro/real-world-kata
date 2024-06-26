import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import { useState } from 'react'

import DeleteArticleModal from '../delete-article-modal/DeleteArticleModal'

import styles from './EditArticleButtons.module.scss'

export default function EditArticleButtons({ author, currentUser }) {
  const [showDeleteArticleModal, setShowDeleteArticleModal] = useState(false)

  const {
    path,
    params: { slug },
  } = useRouteMatch()

  if (!(path !== '/articles/:slug') && !(currentUser !== author.username))
    return (
      <div className={styles['edit-article-buttons-wrapper']}>
        {showDeleteArticleModal ? <DeleteArticleModal setShowDeleteArticleModal={setShowDeleteArticleModal} /> : null}
        <button
          type="button"
          onClick={() => {
            setShowDeleteArticleModal(true)
          }}
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

EditArticleButtons.defaultProps = {
  author: {
    username: '',
    image: '',
    following: false,
  },
  currentUser: '',
}

EditArticleButtons.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string,
    image: PropTypes.string,
    following: PropTypes.bool,
  }),
  currentUser: PropTypes.string,
}
