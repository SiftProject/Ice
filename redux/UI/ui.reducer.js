const initState = {
  showSlider: {
    show: false,
    type: null,
    msg: null,
  },
  showLogin: { show: false },
  showSignup: { show: false },
  showForgotPass: { show: false },
};

const UiReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SHOW_SIGNUP":
      return { ...state, showSignup: { show: true } };

    case "CLOSE_SIGNUP":
      return { ...state, showSignup: { show: false } };

    default:
      return state;
  }
};

export default UiReducer;
