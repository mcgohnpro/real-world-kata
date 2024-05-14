/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'

import ProfileAvatar from '../profile-avatar'
import getId from '../../utils/idGenerators'

import styles from './ArticleListItem.module.scss'

export default function ArticleListItem({ article }) {
  const { title, description, favoritesCount, author, createdAt, tagList, slug } = article
  return (
    <li>
      <article className={styles.article}>
        <div className={styles.header}>
          <div className={styles.description}>
            <div className={styles['title-wrapper']}>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles['like-wrapper']}>
                <button type="button" className={styles['like-icon']} aria-label="like-button" />
                <span className={styles['like-count']}>{favoritesCount}</span>
              </div>
            </div>
            <ul className={styles['tags-wrapper']}>
              {tagList.map((tag, index) => {
                return (
                  <li key={getId()} className={styles.tag}>
                    {tag[index]}
                  </li>
                )
              })}
            </ul>
            <p className={styles.annotation}>{description}</p>
          </div>
          <ProfileAvatar author={author} date={createdAt} />
        </div>
        <div className={styles['article-body']} />
      </article>
    </li>
  )
}
