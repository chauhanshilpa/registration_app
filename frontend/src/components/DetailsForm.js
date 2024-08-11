import { bindActionCreators } from "redux";
import * as actionCreators from "../redux/action-creators/index";
import { useDispatch } from "react-redux";
import useRegistrationSelectors from "../hooks";
import { getUserDetails, addNewUser, updateUserData, getGenders } from "../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

/**
 *
 * @param type {string} It tells type of form where a register form or update form
 * @param setIsUpdateFormOpen {React.Dispatch<React.SetStateAction<boolean>> | null} It tells type of form where a register form or update form
 * @returns a form to register or update details of user
 */
const DetailsForm = ({ type, setIsUpdateFormOpen = null }) => {
  const [genderList, setGenderList] = useState([]);

  const { name, age, dateOfBirth, password, gender, about, userId } =
    useRegistrationSelectors();

  useEffect(() => {
    (async function () {
      const response = await getGenders();
      setGenderList(response);
    })();
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    setName,
    setAge,
    setDateOfBirth,
    setPassword,
    setGender,
    setAbout,
    setUserId,
    setUserDetails,
  } = bindActionCreators(actionCreators, dispatch);

  const handleRegister = async (event) => {
    event.preventDefault();
    if (type === "register") {
      const response = await addNewUser(
        name,
        age,
        dateOfBirth,
        password,
        gender,
        about
      );
      const user_id = response.data.userId;
      setUserId(user_id);
      navigate("/userDetails", { state: { userId: user_id } });
      setName("");
      setAge("");
      setDateOfBirth("");
      setPassword("");
      setGender("");
      setAbout("");
      console.log(userId);
    } else if (type === "update") {
      await updateUserData(
        userId,
        name,
        age,
        dateOfBirth,
        password,
        gender,
        about
      );
      setIsUpdateFormOpen && setIsUpdateFormOpen(false);
      const response = await getUserDetails(userId);
      setUserDetails({ ...response });
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md bg-[#E2DAD6] dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {type === "register" && (
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </h1>
            )}
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleRegister}
            >
              <div className="flex justify-end">
                {type !== "register" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6 text-gray-700 cursor-pointer hover:text-gray-900"
                    onClick={() =>
                      setIsUpdateFormOpen && setIsUpdateFormOpen(false)
                    }
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={name}
                  className="bg-[#F8EDED] border border-gray-400 focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="E.g. John Doe"
                  onChange={(event) => setName(event.target.value)}
                  minLength="2"
                  required={type === "register" ? true : false}
                />
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={age}
                  className="bg-[#F8EDED] border border-gray-400 focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  onChange={(event) =>
                    setAge(
                      event.target.value ? parseInt(event.target.value) : ""
                    )
                  }
                  min="0"
                  max="120"
                  placeholder="E.g. 25"
                  required={type === "register" ? true : false}
                />
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  value={dateOfBirth}
                  className="bg-[#F8EDED] border border-gray-400 focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  onChange={(event) => setDateOfBirth(event.target.value)}
                  required={type === "register" ? true : false}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  value={password}
                  className="bg-[#F8EDED] border border-gray-400 focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  onChange={(event) => setPassword(event.target.value)}
                  minLength="10"
                  required={type === "register" ? true : false}
                />
              </div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Choose Your Gender:
              </label>

              <select
                name="gender"
                id="gender"
                value={gender}
                className="bg-[#F8EDED] border border-gray-400 focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5"
                onChange={(event) => setGender(event.target.value)}
              >
                {genderList.map((gender) => (
                  <option value={gender} key={uuidv4()}>
                    {gender}
                  </option>
                ))}
              </select>
              <div>
                <label
                  htmlFor="about"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  About
                </label>
                <input
                  type="text"
                  name="about"
                  id="about"
                  value={about}
                  className="bg-[#F8EDED] border border-gray-400 focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  onChange={(event) => setAbout(event.target.value)}
                  placeholder="Briefly describe yourself"
                  maxLength="5000"
                  required={type === "register" ? true : false}
                />
              </div>
              {type === "update" ? (
                <button
                  type="submit"
                  className="w-full text-md text-gray-900 hover:text-gray-700 focus:outline-none font-medium rounded-lg px-5 py-2.5 text-center border border-gray-900"
                >
                  Update details
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-md text-white bg-[#508D4E] hover:bg-[#59a256] focus:outline-none font-medium rounded-lg px-5 py-2.5 text-center border border-gray-900"
                >
                  Create an account
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsForm;
