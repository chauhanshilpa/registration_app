const initialState = {
  name: "",
  age: "",
  dateOfBirth: "",
  password: "",
  gender: "Unknown",
  about: "",
  userDetails: {},
  userId: "",
};

export const inputValuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "age":
      return { ...state, age: action.payload };
    case "dateOfBirth":
      return { ...state, dateOfBirth: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "gender":
      return { ...state, gender: action.payload };
    case "about":
      return { ...state, about: action.payload };
    case "userDetails":
      return { ...state, userDetails: action.payload };
    case "userId":
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};
