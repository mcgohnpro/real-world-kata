import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logOutCurrentUser } from '../../../store/slices/currentUserSlice'
import ProfileAvatar from '../../profile-avatar/ProfileAvatar'
import { ROUTE_PATH } from '../../../constants/routes-constants'

import styles from './ProfileButtons.module.scss'

export default function ProfileButtons() {
  const dispatch = useDispatch()

  const username = useSelector((store) => store.currentUser.username)
  const image = useSelector((store) => store.currentUser.image)

  return (
    <div className={styles['profile-buttons-group']}>
      <Link to={ROUTE_PATH.NEW_ARTICLE} className={styles['create-article-link']}>
        Create article
      </Link>
      <Link className={styles['profile-link']} to={ROUTE_PATH.PROFILE}>
        <ProfileAvatar author={{ username, image }} />
      </Link>
      <Link
        onClick={() => {
          localStorage.removeItem('jwt-token')
          dispatch(logOutCurrentUser())
        }}
        className={styles['logout-link']}
        to={ROUTE_PATH.SIGN_IN}
      >
        Log Out
      </Link>
    </div>
  )
}
