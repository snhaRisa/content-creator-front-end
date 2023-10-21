import axios from "axios";


export const createContent = (formData) => {
  console.log(formData, 'in redux')
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found in localStorage");
      }
      // const config = {
      //   headers: {
      //   'Content-Type': 'multipart/form-data'
      //   },
      // };
      // console.log(config)

      const response = await axios.post(`http://localhost:3997/api/content/create`, formData, { headers: { 'authorization': localStorage.getItem('token') } });
      console.log(response.data, 'response data')
      dispatch(content(response.data))

      // Dispatch an action if needed (you might want to update your Redux state)
      // For example, dispatch an action to update the content list with the new content
      //   dispatch({ type: "CONTENT_CREATED", payload: response.data });
      console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  };
};


export const content = (data) => {
  return {
    type: 'NEW_CONTENT',
    payload: data
  }
}

// export const deleteContent = (contentId) => {
//   return async (dispatch) => {
//     console.log('hi')
//     try {
//       const token = localStorage.getItem("token");
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       // Make a DELETE request to your API endpoint with the contentId
//       const response = await axios.delete(`http://localhost:3997/api/deleteContent/${contentId}`,config );
//           console.log(response.data)
//           // dispatch(removeContent(response.data._id))

//     } catch (e) {
//       console.error(e.message);
//     }
//   };
// };
export const deleteContent = (id) => {
  return async (dispatch) => {
    console.log(id, 'content id ')
    try {
      const response = await axios.delete(`http://localhost:3997/api/content/${id}`, 
      { 
        headers: { 'authorization': localStorage.getItem('token') } 
    })
      console.log(response.data, 'data')
      dispatch(removeContent(response.data))
    } catch (e) {
      console.log(e.message)
    }
  }
}
export const removeContent = (data) => {
  return {
    type: 'REMOVE_CONTENT',
    payload: data
  }
}

