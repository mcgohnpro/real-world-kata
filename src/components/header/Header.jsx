import { Link } from 'react-router-dom'

import AuthButtons from './auth-buttons'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles['home-link']} to="/">
        Realworld Blog
      </Link>
      <AuthButtons />
    </header>
  )
}
