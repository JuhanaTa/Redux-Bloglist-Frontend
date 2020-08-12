import React from 'react'


const ShowUsers = ({ username, blogCount }) => {
  return (
    <tr>
      <td>{username}</td>
      <td>{blogCount}</td>
    </tr>

  )
}




export default ShowUsers