import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'

import { fetchDeleteArticle } from '../../../api'
import { addError } from '../../../store/slices/commonStateSlice'
import { ROUTE_PATH } from '../../../constants/routes-constants'

import styles from './DeleteArticleModal.module.scss'

export default function DeleteArticleModal({ setShowDeleteArticleModal }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector((store) => store.currentUser.token)

  const {
    params: { slug },
  } = useRouteMatch()
  return (
    <div className={styles['delete-article-modal']}>
      <div className={styles['modal-title']}>
        <div className={styles['modal-img']} />
        Are you sure to delete this
        <br /> article?
      </div>
      <div className={styles['confirm-modal-wrapper']}>
        <button
          onClick={() => {
            setShowDeleteArticleModal(false)
          }}
          className={`${styles['modal-button']} ${styles['modal-button--reject']}`}
          type="button"
        >
          No
        </button>
        <button
          onClick={async () => {
            try {
              await fetchDeleteArticle(slug, token)
            } catch (error) {
              const {
                name,
                message,
                stack,
                response: { status, url },
              } = error
              dispatch(
                addError({
                  name,
                  message,
                  stack,
                  status,
                  url,
                })
              )
            }
            history.push(ROUTE_PATH.ROOT_PATH)
          }}
          className={`${styles['modal-button']} ${styles['modal-button--confirm']}`}
          type="button"
        >
          Yes
        </button>
      </div>
    </div>
  )
}

DeleteArticleModal.defaultProps = {
  setShowDeleteArticleModal: () => {},
}

DeleteArticleModal.propTypes = {
  setShowDeleteArticleModal: PropTypes.func,
}
