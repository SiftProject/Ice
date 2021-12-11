const initState = {
  user: {},
  isAuthen: null,
  dummy: "this data is from redux",
};

const UserReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "FETCH_USER":
      return { ...state };

    default:
      return state;
  }
};

export default UserReducer;
