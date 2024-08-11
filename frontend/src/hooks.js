import { useSelector } from "react-redux";

const useRegistrationSelector = () => {
  const name = useSelector((state) => state.valuesReducer.name);
  const age = useSelector((state) => state.valuesReducer.age);
  const dateOfBirth = useSelector((state) => state.valuesReducer.dateOfBirth);
  const password = useSelector((state) => state.valuesReducer.password);
  const gender = useSelector((state) => state.valuesReducer.gender);
  const about = useSelector((state) => state.valuesReducer.about);
  const userDetails = useSelector((state) => state.valuesReducer.userDetails);
  const userId = useSelector((state) => state.valuesReducer.userId);

  return {
    name,
    age,
    dateOfBirth,
    password,
    gender,
    about,
    userDetails,
    userId,
  };
};

export default useRegistrationSelector;
