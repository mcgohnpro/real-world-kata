import { Link } from 'react-router-dom'

import { ROUTE_PATH } from '../../../constants/routes-constants'

import styles from './AuthButtons.module.scss'

export default function AuthButtons() {
  return (
    <div className={styles['auth-group-buttons']}>
      <Link to={ROUTE_PATH.SIGN_IN} className={styles['header-link']}>
        Sign In
      </Link>
      <Link to={ROUTE_PATH.SIGN_UP} className={[styles['header-link'], styles['header-link--success']].join(' ')}>
        Sign Up
      </Link>
    </div>
  )
}
