const initialState = {
    spotlayout: "",
  };
  
  const spotlayoutReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SPOT_LAYOUT":
        return { ...state, spotlayout: action.value };
      default:
        return state;
    }
  };
  
  export default spotlayoutReducer;
  