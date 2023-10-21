const initialState = {
  content: [],
};

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CONTENT_SUCCESS': {
      return {
        ...state,
        content: action.payload,
      };
    }
    case 'FETCH_CONTENT_FAILURE': {
      return {
        ...state,
      };
    }
    case 'ADD_LIKE': {
      const updatedContent = state.content.map((contentItem) => {
        if (contentItem._id === action.payload._id) {
          return { ...contentItem, ...action.payload }
        } else {
          return { ...contentItem }
        }
      }
      );
      console.log(updatedContent);
      return {
        ...state,
        content: updatedContent,
      };
      
    }


    case 'REMOVE_LIKE': {
      return {
        content: state.content.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              ...action.payload
            };
          }
          return post;
        }),
      };
    }
  
    case 'ADD_COMMENT': {
      console.log('add comment', action.payload)
      const { postId } = action.payload;
      const updatedContent = state.content.map((content) => {
        console.log(content)
        if (content._id === postId) {
          return {
            ...content,
            comments: [...content.comments, action.payload]
          };
        }
        return content;
      });
      return { ...state, content: updatedContent };
    }
    
    case 'REMOVE_COMMENT': {
      const { commentId } = action.payload;
      const updatedContent = state.content.map((content) => {
        // Filter out the deleted comment from the comments array
        return {
          ...content,
          comments: content.comments.filter((comment) => comment._id !== commentId),
        };
      });
      return { ...state, content: updatedContent };
    }

    case 'REMOVE_CONTENT': {
      const result = state.content.filter((ele) => {
        console.log(ele)
        return ele._id !== action.payload
      })
      console.log(result, 'content removed')
      return {
        ...state, content: result
      }
    }
    default: {
      return state;
    }
  }

};


export default contentReducer
