import PropTypes from 'prop-types'
import { format } from 'date-fns'

import styles from './ProfileAvatar.module.scss'

export default function ProfileAvatar({ author, date }) {
  const { image, username } = author

  return (
    <div className={styles['article-author-wrapper']}>
      <div className={styles['author-name-wrapper']}>
        <span className={styles['author-name']}>{username}</span>
        {date ? <span className={styles['article-date']}>{format(date, 'MMMM d, yyyy')}</span> : null}
      </div>
      {image ? <img src={image} alt="avatar" className={styles.avatar} /> : null}
    </div>
  )
}

ProfileAvatar.defaultProps = {
  author: {
    username: '',
    bio: '',
    image: null,
    following: false,
  },
}

ProfileAvatar.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    following: PropTypes.bool,
  }),
}
