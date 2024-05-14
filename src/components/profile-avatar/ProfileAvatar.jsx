import PropTypes from 'prop-types'
import { format } from 'date-fns'

import styles from './ProfileAvatar.module.scss'

export default function ProfileAvatar({ author, date }) {
  const { image, username } = author

  return (
    <div className={styles['article-author-wrapper']}>
      <div className={styles['author-name-wrapper']}>
        <span className={styles['author-name']}>{username}</span>
        <span className={styles['article-date']}>{format(date, 'MMMM d, yyyy')}</span>
      </div>
      <img src={image} alt="avatar" className={styles.avatar} />
    </div>
  )
}

ProfileAvatar.defaultProps = {
  author: {},
}

ProfileAvatar.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    following: PropTypes.bool,
  }),
}
