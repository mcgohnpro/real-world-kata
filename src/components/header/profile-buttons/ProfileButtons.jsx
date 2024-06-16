/* eslint-disable no-unused-vars */

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logOutCurrentUser } from '../../../store/slices/currentUserSlice'
import ProfileAvatar from '../../profile-avatar/ProfileAvatar'

import styles from './ProfileButtons.module.scss'

export default function ProfileButtons() {
  const dispatch = useDispatch()
  const { username, image } = useSelector((store) => {
    return store.currentUser
  })
  return (
    <div className={styles['profile-buttons-group']}>
      <Link to="/" className={styles['create-article-link']}>
        Create article
      </Link>
      <Link className={styles['profile-link']} to="/profile">
        <ProfileAvatar author={{ username, image }} />
      </Link>
      <Link
        onClick={() => {
          localStorage.removeItem('jwt-token')
          dispatch(logOutCurrentUser())
        }}
        className={styles['logout-link']}
        to="/sign-in"
      >
        Log Out
      </Link>
    </div>
  )
}
