/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'

import styles from './ArticleListItem.module.scss'

export default function ArticleListItem() {
  return (
    <li>
      <article className={styles.article}>
        <div className={styles.header}>
          <div className={styles.description}>
            <div className={styles['title-wrapper']}>
              <h2 className={styles.title}>Some article title</h2>
              <div className={styles['like-wrapper']}>
                <button type="button" className={styles['like-icon']} aria-label="like-button" />
                <span className={styles['like-count']}>42</span>
              </div>
            </div>
            <ul className={styles['tags-wrapper']}>
              <li className={styles.tag}>Tag 1</li>
              <li className={styles.tag}>SomTag</li>
            </ul>
            <p className={styles.annotation}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
          </div>
          <div className={styles['article-author-wrapper']}>
            <div className={styles['author-name-wrapper']}>
              <span className={styles['author-name']}>John Doe</span>
              <span className={styles['article-date']}>March 5, 2020</span>
            </div>
            <div className={styles.avatar} />
          </div>
        </div>
        <div className={styles['article-body']} />
      </article>
    </li>
  )
}
