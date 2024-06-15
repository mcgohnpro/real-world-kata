/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'

import styles from '../AuthFormCommonStyles.module.scss'

export default function Input(props) {
  const { id, label, register, validation, type, placeholder, errors } = props

  return (
    <p className={styles['form-items-group']}>
      <label className={styles['form-item-label']} htmlFor={id}>
        {label}
      </label>
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(id, validation)}
        className={`${styles['form-item-input']} ${errors[id] ? styles.invalid : null}`}
        type={type}
        placeholder={placeholder}
      />
      {errors[id] ? <span className={styles['validate-error']}>{errors[id].message}</span> : null}
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
