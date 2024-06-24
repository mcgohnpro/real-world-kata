/* eslint-disable no-unused-vars */
import { Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { fetchArticleBySlug } from '../../api'
import getId from '../../utils/idGenerators'
import ProfileAvatar from '../profile-avatar'

import styles from './ArticleListItem.module.scss'
import EditArticleButtons from './edit-article-buttons'

export default function ArticleListItem({ articleId, withBody }) {
  const [article, setArticle] = useState()
  const currentUser = useSelector((store) => store.currentUser.username)

  // FIXME что за fetchedArticle, переименовать в респонс
  useEffect(() => {
    fetchArticleBySlug(articleId).then((fetchedArticle) => {
      setArticle(fetchedArticle)
    })
  }, [])

  if (!article)
    return (
      <article className={styles.article}>
        <Skeleton active />
      </article>
    )
  const { title, description, favoritesCount, author, createdAt, tagList, slug, body } = article
  const articleBody = withBody ? <div className={styles['article-body']}>{body}</div> : null

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.description}>
          <div className={styles['title-wrapper']}>
            <Link to={`/articles/${slug}`} className={styles.title}>
              {title}
            </Link>
            <div className={styles['like-wrapper']}>
              <button type="button" className={styles['like-icon']} aria-label="like-button" />
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
