import { getUserDetails, addNewUser, updateUserData, getGenders } from "../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import { v4 as uuidv4 } from "uuid";

/**
 *
 * @param type {string} has conditional values register or update
 * @param userId {string} contains unique if for a new register
 * @param name {string} name of user (after register or after update)
 * @param age {"" || number} age of user (after register or after update)
 * @param dateOfBirth {string} date of birth of user (after register or after update)
 * @param password {string} password set by user (after register or after update)
 * @param gender {string} gender set by user (after register or after update)
 * @param about {string} about data of user (after register or after update)
 * @param setName {React.Dispatch<React.SetStateAction<string>>} set function to set name of user (during registration or updation)
 * @param setAge {React.Dispatch<React.SetStateAction<string | number>>} set function to set age of user (during registration or updation)
 * @param setDateOfBirth {React.Dispatch<React.SetStateAction<string>>} set function to set date of birth of user (during registration or updation)
 * @param setPassword {React.Dispatch<React.SetStateAction<string>>} set function to set password of user (during registration or updation)
 * @param setGender {React.Dispatch<React.SetStateAction<string>>} set function to set gender of user (during registration or updation)
 * @param setUserId {React.Dispatch<React.SetStateAction<string>>} optional set function to set unique if of user (during registration)
 * @param setAbout {React.Dispatch<React.SetStateAction<string>>} set function to set about data of user (during registration or updation)
 * @param setIsUpdateFormOpen {React.Dispatch<React.SetStateAction<boolean>>} optional set function to set boolean value of update form's open state (during updation)
 * @param setModalData {React.Dispatch<React.SetStateAction<{title: string; body: string;}>>} set function to set modal data if error occurs
 * @param modalButtonRef {React.MutableRefObject<null>} reference of modal button
 * @returns a reusable form. Here it is used for register as well as for update.
 */
const DetailsForm = ({
  type,
  userId,
  name,
  age,
  dateOfBirth,
  password,
  gender,
  about,
  setName,
  setAge,
  setDateOfBirth,
  setPassword,
  setGender,
  setUserId = null,
  setAbout,
  setIsUpdateFormOpen = null,
  setModalData,
  modalButtonRef
}) => {
  const [genderList, setGenderList] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await getGenders();
        setGenderList(response);
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.message
          : error.message;
        setModalData({
          title: "Error",
          body:
            errorMessage ||
            "Oops, something went wrong. Please try again later.",
        });
        modalButtonRef.current.click();
      }
    })();
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const setUserDetails = async (responseData) => {
    setName(responseData.name);
    setAge(responseData.age);
    setDateOfBirth(responseData.dateOfBirth);
    setPassword(responseData.password);
    setGender(responseData.gender);
    setAbout(responseData.about);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (type === "register") {
      try {
        const response = await addNewUser(
          name,
          age,
          dateOfBirth,
          password,
          gender,
          about
        );
        setUserId && setUserId(response.data.userId);
        navigate("/userDetails", {
          state: {
            userId: response.data.userId,
            name: name,
            age: age,
            dateOfBirth: dateOfBirth,
            password: password,
            gender: gender,
            about: about,
          },
        });
        setName("");
        setName("");
        setAge("");
        setDateOfBirth("");
        setPassword("");
        setGender("Other");
        setAbout("");
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.message
          : error.message;
        setModalData({
          title: "Error",
          body:
            errorMessage ||
            "Oops, something went wrong. Please try again later.",
        });
        modalButtonRef.current.click();
      }
    } else if (type === "update") {
      try {
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
        setUserDetails(response);
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.message
          : error.message;
        setModalData({
          title: "Error",
          body:
            errorMessage ||
            "Oops, something went wrong. Please try again later.",
        });
        modalButtonRef.current.click();
      }
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto z-10">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md bg-[#E2DAD6] dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {type === "register" && (
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </h1>
            )}
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleFormSubmit}
            >
              <div className="flex justify-end">
                {type !== "register" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-gray-700 cursor-pointer hover:text-gray-900"
                    onClick={() =>
                      setIsUpdateFormOpen && setIsUpdateFormOpen(false)
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                  onWheel={(e) => e.target.blur()}
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
