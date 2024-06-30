/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ROUTE_PATH } from '../../constants/routes-constants'

import AuthButtons from './auth-buttons'
import styles from './Header.module.scss'
import ProfileButtons from './profile-buttons'

export default function Header() {
  const authorized = useSelector((store) => store.currentUser.authorized)
  return (
    <header className={styles.header}>
      <Link className={styles['home-link']} to={ROUTE_PATH.ROOT_PATH}>
        Realworld Blog
      </Link>
      {authorized ? <ProfileButtons /> : <AuthButtons />}
    </header>
  )
}
