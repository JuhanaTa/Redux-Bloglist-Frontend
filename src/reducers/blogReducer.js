import blogService from '../services/blogs'

const reducer = (state = [], action) => {

  switch(action.type) {
  case 'ADDNEW':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    return action.data
  case 'DELETE_BLOG':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE': {
    const id = action.data.id
    const blogTochange = state.find(n => n.id === id)
    const changedBlog = {
      ...blogTochange,
    }
    const returningItem = state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )
    console.log('return ' + returningItem)
    return action.data.blogs
  }
  case 'COMMENT': {
    const id = action.data.id
    const blogTochange = state.find(n => n.id === id)
    const changedBlog = {
      ...blogTochange,
    }
    const returningItem = state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )
    console.log('return ' + returningItem)
    return action.data.blogs
  }
  default:
    return state
  }
}

export const createBlog = (blogObject) => {
  console.log('reducer used')
  return async dispatch => {
    const blog = await blogService.create(blogObject)
    dispatch({
      type: 'ADDNEW',
      data: {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        id: blog.id,
        likes: 0
      }
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'DELETE_BLOG',
      data: blogs,
    })
  }
}

export const addLike = (id, updatedBLog) => {
  return async dispatch => {
    const newBlog = await blogService.update(id, updatedBLog)
    const blogs = await blogService.getAll()
    console.log('liked blog: ' +newBlog.id)
    dispatch({
      type: 'LIKE',
      data: { id, blogs }
    })
  }
}

export const addComment = (id, updatedBLog) => {
  return async dispatch => {
    const newBlog = await blogService.update(id, updatedBLog)
    const blogs = await blogService.getAll()
    console.log('commented blog: ' +newBlog.id)
    dispatch({
      type: 'COMMENT',
      data: { id, blogs }
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default reducer