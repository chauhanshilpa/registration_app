import { bindActionCreators } from "redux";
import * as actionCreators from "../redux/action-creators/index";
import { useDispatch } from "react-redux";
import useRegistrationSelectors from "../hooks";
import { getUserDetails, addNewUser, updateUserData } from "../api";
import { useNavigate } from "react-router-dom";

const RegistrationForm = ({ type }) => {
  const { name, age, dateOfBirth, password, gender, about, userId } =
    useRegistrationSelectors();

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
      navigate("/userDetails", { state: { userId: user_id } });
      setUserId(user_id);
      setName("");
      setAge("");
      setDateOfBirth("");
      setPassword("");
      setGender("");
      setAbout("");
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
      const response = await getUserDetails(userId);
      setUserDetails({ ...response });
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {type === "register" && (
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
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
                    className="size-6 text-white cursor-pointer hover:text-gray-400"
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
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="E.g. John Doe"
                  onChange={(event) => setName(event.target.value)}
                  minLength="2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={age}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(event) =>
                    setAge(
                      event.target.value ? parseInt(event.target.value) : ""
                    )
                  }
                  placeholder="E.g. 25"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  value={dateOfBirth}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  min="0"
                  max="120"
                  onChange={(event) => setDateOfBirth(event.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  value={password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(event) => setPassword(event.target.value)}
                  minLength="10"
                  required
                />
              </div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Choose Your Gender:
              </label>

              <select
                name="gender"
                id="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => setGender(event.target.value)}
              >
                <option value="Other">Other</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <div>
                <label
                  htmlFor="about"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  About
                </label>
                <input
                  type="text"
                  name="about"
                  id="about"
                  value={about}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(event) => setAbout(event.target.value)}
                  placeholder="Briefly describe yourself"
                  maxLength="5000"
                  required
                />
              </div>
              {type === "update" ? (
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border border-white"
                >
                  Update details
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border border-white"
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

export default RegistrationForm;
