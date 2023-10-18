import axios from "axios"
// import contentReducer from "../reducers/contentReducer"

export const showContent = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3997/api/content')
      console.log('data', response.data)
      dispatch(content(response.data))
      console.log('Dispatched FETCH_CONTENT_SUCCESS action');
    } catch (e) {
      alert(e.message)
    }
  }
}

export const content = (data) => {
  return {
    type: 'FETCH_CONTENT_SUCCESS',
    payload: data
  }
}

export const addLikeAsync = (contentId) => {
  return async (dispatch) => {
    try {
      const formData = {
        postId: contentId,
      };
      console.log(formData, 'formdata')
      const token = localStorage.getItem('token');
      console.log(token, 'token')
      if (token) {
        const response = await axios.put(
          `http://localhost:3997/api/post/like`,
          formData,
          {
            headers: {
              'authorization': token,
            },
          }
        );

        const data = response.data;
        console.log(data, 'data')
        dispatch(addLikeSuccess(data));
      }
    }
    catch (error) {
      console.log(error)
    }
  }
}

export const addLikeSuccess = (content) => ({
  type: 'ADD_LIKE',
  payload: content,
})

export const removeLikeAsync = (contentId) => {
  console.log(contentId, 'remove id')
  return async (dispatch) => {
    try {
      const formData = {
        postId: contentId,
      }
      // Send a DELETE request to remove a like from the content with the given contentId
      const response = await axios.put(
        `http://localhost:3997/api/post/unlike`,
        formData, {
        headers: { 'authorization': localStorage.getItem('token') },
      })
      console.log(response.data, 'contentId')
      const data = response.data
      dispatch(removeLike(data))
      // Dispatch the action to update the liked state
      // dispatch(removeLike(response?.data?.content))
    } catch (error) {
      // dispatch(error.message)
      console.log({ error })

      // Handle errors and dispatch an error action if needed
      // dispatch(likeError(error));
    }
  }
}
export const removeLike = (data) => ({
  type: 'REMOVE_LIKE',
  payload: data
})

export const addComment = (contentId, body) => {
  return async (dispatch) => {
    try {
      // Create a comment object with userId, postId, and body properties
      const commentData = {
        body,
        contentId
      }
      console.log(commentData, 'commentData')
      // Make an API call to add a comment
      const response = await axios.post(`http://localhost:3997/api/comments`, commentData, { headers: { authorization: localStorage.getItem("token") } })
      console.log(response.data)
      dispatch(newComment(response.data.comment))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const newComment = (data) => {
  return {
    type: 'ADD_COMMENT',
    payload: data
  }
}

export const deleteComment = (commentId, contentId) => {
  console.log(commentId, contentId, 'ids')
  return async (dispatch) => {
    try {
      const response = await axios.delete(`http://localhost:3997/api/comments/${contentId}/${commentId}`,
        {
          headers: { 'authorization': localStorage.getItem('token') },
        })

      const data = response.data;
      console.log(data, 'comment deleted data')
      dispatch(updateComment(commentId));

    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }
}

export const updateComment = (commentId) => {
  return {
    type: 'REMOVE_COMMENT',
    payload: { commentId }
  }
}
