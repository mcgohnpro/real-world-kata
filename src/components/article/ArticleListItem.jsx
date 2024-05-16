import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import ProfileAvatar from '../profile-avatar'
import getId from '../../utils/idGenerators'
import fetchArticleBySlug from '../../api'

import styles from './ArticleListItem.module.scss'

export default function ArticleListItem({ articleId, withBody }) {
  const [article, setArticle] = useState()
  useEffect(() => {
    fetchArticleBySlug(articleId).then((fetchedArticle) => {
      setArticle(fetchedArticle)
    })
  }, [])

  if (!article) return null
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
        <ProfileAvatar author={author} date={createdAt} />
      </div>
      {articleBody}
    </article>
  )
}
