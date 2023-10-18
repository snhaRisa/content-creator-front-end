const initialState = {
    newContent: {}
    
  }
  
  const newContentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_CONTENT': {
            return {
                ...state,
                newContent: {}
            }
        }
        default: {
            return state; // Add this default case
        }
    }
  }
  
  
  export default newContentReducer;