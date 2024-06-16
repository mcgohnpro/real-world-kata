const translateResponse = (errorText) => {
  switch (errorText) {
    case 'is invalid':
      return 'Неверный формат данных'
    case 'is already taken.':
      return 'Такой идентификатор уже занят'
    default:
      return ''
  }
}

export default translateResponse
