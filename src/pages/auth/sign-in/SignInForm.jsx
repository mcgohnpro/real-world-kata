/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { fetchLogin } from '../../../api'
import { updateCurrentUser } from '../../../store/slices/currentUserSlice'
import Input from '../input-form-item'
import styles from '../AuthFormCommonStyles.module.scss'

export default function SignInForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const onSubmit = async (formData) => {
    const data = await fetchLogin(formData)
    dispatch(updateCurrentUser(data))
    history.push('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['sign-in-form']}>
      <h2 className={styles.title}>Sign in</h2>
      <Input
        id="email"
        label="Email address"
        register={register}
        validation={{
          required: {
            value: true,
            message: 'Обязательное поле',
          },
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Неверный email',
          },
        }}
        type="email"
        placeholder="Email address"
        errors={errors}
      />
      <Input
        id="password"
        label="Password"
        register={register}
        validation={{
          required: 'Обязательное поле',
        }}
        type="password"
        placeholder="Password"
        errors={errors}
      />
      <p className={styles['form-items-group']}>
        <input className={styles['form-submit']} type="submit" value="Login" />
        <span className={styles['form-login-message']}>
          Don&apos;t have an account?{' '}
          <Link className={styles['form-login-message-link']} to="/sign-up">
            Sign Up.
          </Link>
        </span>
      </p>
    </form>
  )
}
