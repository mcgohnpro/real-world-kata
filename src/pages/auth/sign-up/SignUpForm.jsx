/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import styles from '../AuthFormCommonStyles.module.scss'

export default function SignUpForm() {
  const [check, setCheck] = useState(false)
  const { register, handleSubmit } = useForm()

  return (
    <form className={styles['sign-in-form']}>
      <h2 className={styles.title}>Create new account</h2>
      <p className={styles['form-items-group']}>
        <label className={styles['form-item-label']} htmlFor="username">
          Username
        </label>
        <input className={styles['form-item-imput']} type="text" id="username" placeholder="Username" />
      </p>
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
        <input className={styles['form-item-imput']} type="password" id="password-input" placeholder="Password" />
      </p>
      <p className={styles['form-items-group']}>
        <label className={styles['form-item-label']} htmlFor="repeat-password-input">
          Repeat Password
        </label>
        <input
          className={styles['form-item-imput']}
          type="password"
          id="repeat-password-input"
          placeholder="Password"
        />
      </p>
      <div className={styles.divider} />
      <label className={styles['data-processing-checkbox-wrapper']} htmlFor="data-processing-checkbox">
        <div className={styles['data-processing-checkbox']}>
          <input
            onChange={() => {
              setCheck((prevState) => {
                return !prevState
              })
            }}
            className={styles['data-processing-input']}
            type="checkbox"
            id="data-processing-checkbox"
            checked={check}
          />
          <span className={styles['data-processing-decore']} />
        </div>
        I agree to the processing of my personal <br />
        information
      </label>
      <p className={styles['form-items-group']}>
        <input className={styles['form-submit']} type="submit" value="Create" />
        <span className={styles['form-login-message']}>
          Already have an account?{' '}
          <Link className={styles['form-login-message-link']} to="/">
            Sign In.
          </Link>
        </span>
      </p>
    </form>
  )
}
