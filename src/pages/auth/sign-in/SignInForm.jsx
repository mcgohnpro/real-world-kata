/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'

import styles from '../AuthFormCommonStyles.module.scss'

export default function SignInForm() {
  return (
    <form className={styles['sign-in-form']}>
      <h2 className={styles.title}>Sign in</h2>
      <p className={styles['form-items-group']}>
        <label className={styles['form-item-label']} htmlFor="email-input">
          Email address
        </label>
        <input className={styles['form-item-imput']} type="email" id="email-input" placeholder="Email address" />
      </p>
      <p className={styles['form-items-group']}>
        <label className={styles['form-item-label']} htmlFor="password-input">
          Password
        </label>
        <input className={styles['form-item-imput']} type="email" id="password-input" placeholder="Password" />
      </p>

      <p className={styles['form-items-group']}>
        <input className={styles['form-submit']} type="submit" value="Login" />
        <span className={styles['form-login-message']}>
          Don&apos;t have an account?{' '}
          <Link className={styles['form-login-message-link']} to="/">
            Sign Up.
          </Link>
        </span>
      </p>
    </form>
  )
}
