import { useSelector } from "react-redux";

const useRegistrationSelector = () => {
  const name = useSelector((state) => state.inputValuesReducer.name);
  const age = useSelector((state) => state.inputValuesReducer.age);
  const dateOfBirth = useSelector(
    (state) => state.inputValuesReducer.dateOfBirth
  );
  const password = useSelector((state) => state.inputValuesReducer.password);
  const gender = useSelector((state) => state.inputValuesReducer.gender);
  const about = useSelector((state) => state.inputValuesReducer.about);
  const userDetails = useSelector(
    (state) => state.inputValuesReducer.userDetails
  );

  return {
    name,
    age,
    dateOfBirth,
    password,
    gender,
    about,
    userDetails,
  };
};

export default useRegistrationSelector;
