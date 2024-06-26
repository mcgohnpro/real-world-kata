import { Skeleton } from 'antd'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import { fetchArticleBySlug, fetchFavoriteArticleBySlug, fetchUnfavoriteArticleBySlug } from '../../api'
import { addError } from '../../store/slices/commonStateSlice'
import getId from '../../utils/idGenerators'
import ProfileAvatar from '../profile-avatar'

import styles from './ArticleListItem.module.scss'
import EditArticleButtons from './edit-article-buttons'

export default function ArticleListItem({ articleId, withBody }) {
  const [article, setArticle] = useState()
  const currentUser = useSelector((store) => store.currentUser.username)
  const token = useSelector((store) => store.currentUser.token)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    fetchArticleBySlug(articleId, token)
      .then((data) => {
        setArticle(data)
      })
      .catch((error) => {
        const {
          name,
          message,
          stack,
          response: { status, url },
        } = error
        if (error !== 404) {
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
      })
  }, [])

  if (!article)
    return (
      <article className={styles.article}>
        <Skeleton active />
      </article>
    )
  const { title, description, favorited, favoritesCount, author, createdAt, tagList, slug, body } = article
  const articleBody = withBody ? (
    <div className={styles['article-body']}>
      <Markdown>{body}</Markdown>
    </div>
  ) : null

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.description}>
          <div className={styles['title-wrapper']}>
            <Link to={`/articles/${slug}`} className={styles.title}>
              {title}
            </Link>
            <div className={styles['like-wrapper']}>
              <button
                onClick={async () => {
                  if (favorited) {
                    try {
                      const data = await fetchUnfavoriteArticleBySlug(articleId, token)
                      setArticle(data)
                    } catch (error) {
                      if (error.response?.status === 401) {
                        history.push('/sign-in')
                      }
                    }
                  } else {
                    try {
                      const data = await fetchFavoriteArticleBySlug(articleId, token)
                      setArticle(data)
                    } catch (error) {
                      if (error.response?.status === 401) {
                        history.push('/sign-in')
                      }
                    }
                  }
                }}
                type="button"
                className={`${styles['like-icon']} ${favorited ? styles['like-icon--liked'] : null}`}
                aria-label="like-button"
              />
              <span className={styles['like-count']}>{favoritesCount}</span>
            </div>
          </div>
          <ul className={styles['tags-wrapper']}>
            {tagList.map((tag) => {
              return (
                <li key={getId()} className={styles.tag}>
                  {tag}
                </li>
              )
            })}
          </ul>
          <p className={styles.annotation}>{description}</p>
        </div>
        <div className={styles['article-profile-wrapper']}>
          <ProfileAvatar author={author} date={createdAt} />
          <EditArticleButtons author={author} currentUser={currentUser} />
        </div>
      </div>
      {articleBody}
    </article>
  )
}

ArticleListItem.defaultProps = {
  withBody: false,
}

ArticleListItem.propTypes = {
  withBody: PropTypes.bool,
  articleId: PropTypes.string.isRequired,
}
