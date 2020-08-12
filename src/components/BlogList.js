import React from 'react'
import Blog from '../components/Blog'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'


const BlogList = () => {

  const blogs = useSelector( state => {
    return state.blogs
  })

  let ident = 0
  blogs.sort(function (a, b) {
    return b.likes - a.likes
  })
  return (
    <div>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <Blog key={blog.id} id={ident++} blog={blog}/>
          )}
        </tbody>
      </Table>
    </div>
  )
}


export default BlogList