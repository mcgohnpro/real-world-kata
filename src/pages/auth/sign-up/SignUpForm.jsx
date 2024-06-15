/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { message } from 'antd'

import Input from '../input-form-item'
import styles from '../AuthFormCommonStyles.module.scss'

export default function SignUpForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: 'onBlur' })
  const onSubmit = (data) => {
    console.log('📢[SignUpForm.jsx:15]: data: ', data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['sign-in-form']}>
      <h2 className={styles.title}>Create new account</h2>
      <Input
        id="username"
        label="Username"
        register={register}
        validation={{
          required: 'Обязательное поле',
          minLength: {
            value: 3,
            message: 'Поле должно содержать от 3 до 20 символов',
          },
          maxLength: {
            value: 20,
            message: 'Поле должно содержать от 3 до 20 символов',
          },
          onChange: (e) => {
            setValue('username', e.target.value.trim())
          },
        }}
        type="text"
        placeholder="Username"
        errors={errors}
      />
      <Input
        id="email"
        label="Email address"
        register={register}
        validation={{
          required: 'Обязательное поле',
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
          minLength: {
            value: 6,
            message: 'Поле должно содержать от 6 до 40 символов',
          },
          maxLength: {
            value: 40,
            message: 'Поле должно содержать от 6 до 40 символов',
          },
        }}
        type="password"
        placeholder="Password"
        errors={errors}
      />
      <Input
        id="repeat-password"
        label="Repeat Password"
        register={register}
        validation={{
          required: 'Обязательное поле',
          validate: (value, form) => value === form['password-input'] || 'Пароли не совпадают',
        }}
        type="password"
        placeholder="Password"
        errors={errors}
      />
      <div className={styles.divider} />
      <label
        className={`${styles['data-processing-checkbox-wrapper']} ${errors['data-processing-input'] ? styles.invalid : null}`}
        htmlFor="data-processing-checkbox"
      >
        <div className={styles['data-processing-checkbox']}>
          <input
            {...register('data-processing', { required: true })}
            className={styles['data-processing-input']}
            type="checkbox"
            id="data-processing-checkbox"
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
          <Link className={styles['form-login-message-link']} to="/sign-in">
            Sign In.
          </Link>
        </span>
      </p>
    </form>
  )
}
