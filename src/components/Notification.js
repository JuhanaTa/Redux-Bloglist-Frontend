import React from 'react'
import { connect } from 'react-redux'


const Notification = (props) => {

  if(props.notification.content === ''){
    return ( null )
  }
  else if(props.notification.type === 'success'){
    return (
      <div className='success'>
        {props.notification.content}
      </div>
    )
  }
  else if(props.notification.type === 'error'){
    return (
      <div className='error'>
        {props.notification.content}
      </div>
    )
  }
  else return ( null )

}

const stateToProps = (state) => {
  return{ notification: state.notification }
}

const connectedNotifications = connect(
  stateToProps
)(Notification)

export default connectedNotifications