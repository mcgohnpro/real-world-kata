/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { fetchLogin } from '../../../api'
import { addError } from '../../../store/slices/commonStateSlice'
import { updateCurrentUser, logOutCurrentUser } from '../../../store/slices/currentUserSlice'
import Input from '../input-form-item'
import styles from '../AuthFormCommonStyles.module.scss'

export default function SignInForm({ history }) {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitted },
  } = useForm({ mode: 'onBlur' })

  // TODO вынести всю сложную логику наружу
  const onSubmit = async (formData) => {
    localStorage.removeItem('jwt-token')
    dispatch(logOutCurrentUser())
    try {
      const data = await fetchLogin(formData)
      data.user.authorized = true
      dispatch(updateCurrentUser(data))
      history.push('/')
    } catch ({ name, message, stack, response: { status, url } }) {
      if (status === 422) {
        setError('email')
        setError(
          'password',
          { type: '422', message: 'Пожалуйста, укажите верные эл. почту и пароль' },
          { shouldFocus: true }
        )
      } else {
        dispatch(
          addError({
            name,
            message,
            stack,
            status,
            url,
          })
        )
      }
    }
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
            message: 'Некорректный email',
          },
          onChange: (e) => {
            if (isSubmitted && errors.email?.type === '422') {
              clearErrors()
            }
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
          onChange: (e) => {
            if (isSubmitted && errors.password?.type === '422') {
              clearErrors()
            }
          },
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
