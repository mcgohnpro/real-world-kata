import { Link } from 'react-router-dom'

import styles from './AuthButtons.module.scss'

export default function AuthButtons() {
  return (
    <div className={styles['auth-group-buttons']}>
      <Link className={styles['header-link']} to="/">
        Sign In
      </Link>
      <Link to="/" className={[styles['header-link'], styles['header-link--success']].join(' ')}>
        Sign Up
      </Link>
    </div>
  )
}
