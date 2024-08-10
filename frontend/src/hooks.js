import { useSelector } from "react-redux";

const useGameSelector = () => {
  const name = useSelector((state) => state.inputValuesReducer.name);
  const age = useSelector((state) => state.inputValuesReducer.age);
  const dateOfBirth = useSelector(
    (state) => state.inputValuesReducer.dateOfBirth
  );
  const password = useSelector((state) => state.inputValuesReducer.password);
  const gender = useSelector((state) => state.inputValuesReducer.gender);
  const about = useSelector((state) => state.inputValuesReducer.about);

  return {
    name,
    age,
    dateOfBirth,
    password,
    gender,
    about,
  };
};

export default useGameSelector;
