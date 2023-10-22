import axios from "axios";


export const createContent = (formData, resetForm) => {

  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const response = await axios.post(`http://localhost:3997/api/content/create`, formData, { headers: { 'authorization': localStorage.getItem('token') } });
      if(response.data.hasOwnProperty('title'))
      {
        dispatch(content(response.data));
        resetForm();
      }
    } 
    catch (e) 
    {
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

