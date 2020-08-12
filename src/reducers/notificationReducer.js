const initialState = []
let timeoutID

const notificationReducer = (state = initialState, action) => {

  switch(action.type) {
  case 'CREATE_NOTIFICATION':
    return action.data
  case 'SET_HIDDEN':
    return action.data
  default:
    return state
  }
}


export const createNotification = (content, type, time) => {
  window.clearTimeout(timeoutID)
  time = time * 1000

  return async dispatch => {

    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: { content, type }
    })
    timeoutID = setTimeout(() => {
      content = ''

      dispatch({
        type: 'SET_HIDDEN',
        data: { content }
      })
    }, time)

  }

}

export const hideNotification = () => {
  const content = ''
  return async dispatch => {
    dispatch({
      type: 'SET_HIDDEN',
      data: { content }
    })
  }}


export default notificationReducer