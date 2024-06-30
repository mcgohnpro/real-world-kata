/* eslint-disable react/jsx-props-no-spreading */
import { Redirect, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadCurrentUser } from '../../store/slices/currentUserSlice'
import { ROUTE_PATH } from '../../constants/routes-constants'

function PrivateRoute({ component: Component, ...rest }) {
  const { authorized } = useSelector((store) => store.currentUser)
  const [checkAuthorizedState, setAuthorizedState] = useState(undefined)

  const dispatch = useDispatch()

  useEffect(() => {
    if (authorized) {
      setAuthorizedState(true)
    } else {
      dispatch(loadCurrentUser()).then((response) => {
        setAuthorizedState(response.payload.user.authorized)
      })
    }
  }, [])

  return (
    <Route
      {...rest}
      render={(props) => {
        if (checkAuthorizedState === undefined) {
          return null
        }
        if (!checkAuthorizedState) {
          return <Redirect to={ROUTE_PATH.ROOT_PATH} />
        }
        return <Component {...props} />
      }}
    />
  )
}

export default PrivateRoute
