/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
// TODO переместить компонент в компоненты
import PropTypes from 'prop-types'

import styles from '../AuthFormCommonStyles.module.scss'
// TODO вынести все компоненты в компоненты, перенести общий файл стилей в папку со стилями

export default function Input({ field, label, id, placeholder, error, type }) {
  // const { id, label, register, validation, type, placeholder, errors } = props
  return (
    <p className={styles['form-items-group']}>
      <label className={styles['form-item-label']} htmlFor={id}>
        {label}
      </label>
      <input
        {...field}
        id={id}
        // eslint-disable-next-line react/jsx-props-no-spreading
        className={`${styles['form-item-input']} ${error ? styles.invalid : null}`}
        type={type}
        placeholder={placeholder}
      />
      {error ? <span className={styles['validate-error']}>{error.message}</span> : null}
    </p>
  )
}

// Input.defaultProps = {
//   label: '',
//   register: () => {},
//   validation: {},
//   placeholder: '',
//   errors: {},
// }

// Input.propTypes = {
//   id: PropTypes.string.isRequired,
//   label: PropTypes.string,
//   register: PropTypes.func,
//   validation: PropTypes.objectOf([PropTypes.string, PropTypes.object]),
//   type: PropTypes.string.isRequired,
//   placeholder: PropTypes.string,
//   // eslint-disable-next-line react/forbid-prop-types
//   errors: PropTypes.object,
// }
