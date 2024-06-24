/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './ProfileAvatar.module.scss'

export default function ProfileAvatar({ author, date }) {
  const currentUser = useSelector((store) => store.currentUser.username)
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
