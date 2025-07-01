const initialState = {
  theme: "",
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "themeChange":
      return { ...state, theme: action.value };
    default:
      return state;
  }
};
console.log("action", initialState);

export default themeReducer;
