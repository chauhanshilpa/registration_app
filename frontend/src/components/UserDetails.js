import React, { useState } from "react";
import { deleteUserData } from "../api";
import { useNavigate, useLocation } from "react-router-dom";
import DetailsForm from "./DetailsForm";

/**
 *  @param setModalData {React.Dispatch<React.SetStateAction<{title: string;body: string;}>>} set function to set modal data if error occurs
 *  @param modalButtonRef {React.MutableRefObject<null>} referenceof modal button
 *  @returns a page with box containing user details with update and delete options and conditionally shows update form
 */
const UserDetails = ({ setModalData, modalButtonRef }) => {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const location = useLocation();
  const { userId, name, age, dateOfBirth, password, gender, about } =
    location.state || {};

  const [defaultName, setDefaultName] = useState(name);
  const [defaultAge, setDefaultAge] = useState(age);
  const [defaultDateOfBirth, setDefaultDateOfBirth] = useState(dateOfBirth);
  const [defaultPassword, setDefaultPassword] = useState(password);
  const [defaultGender, setDefaultGender] = useState(gender);
  const [defaultAbout, setDefaultAbout] = useState(about);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteUserData(userId);
      navigate("/");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      setModalData({
        title: "Error",
        body:
          errorMessage || "Oops, something went wrong. Please try again later.",
      });
      modalButtonRef.current.click();
    }
  };

  return (
    <section>
      {isUpdateFormOpen && (
        <div className="absolute w-full z-10">
          <DetailsForm
            type="update"
            userId={userId}
            name={defaultName}
            age={defaultAge}
            dateOfBirth={defaultDateOfBirth}
            password={defaultPassword}
            gender={defaultGender}
            about={defaultAbout}
            setName={setDefaultName}
            setAge={setDefaultAge}
            setDateOfBirth={setDefaultDateOfBirth}
            setPassword={setDefaultPassword}
            setGender={setDefaultGender}
            setAbout={setDefaultAbout}
            setIsUpdateFormOpen={setIsUpdateFormOpen}
            setModalData={setModalData}
            modalButtonRef={modalButtonRef}
          />
        </div>
      )}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md bg-[#E2DAD6] dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="text-4xl font-bold text-center my-10 underline">
              Your Details
            </div>
            <div className="text-lg font-semibold my-2 hidden">
              <span className="text-xl">User Id:</span>&nbsp;&nbsp;
              <span className="text-gray-700 break-words">{userId}</span>
            </div>
            <div className="text-lg font-semibold my-2">
              <span className="text-xl">Name:</span>&nbsp;&nbsp;
              <span className="text-gray-700 break-words">{defaultName}</span>
            </div>
            <div className="text-lg font-semibold my-2">
              <span className="text-xl">Age:</span>&nbsp;&nbsp;
              <span className="text-gray-700">{defaultAge}</span>
            </div>
            <div className="text-lg font-semibold my-2">
              <span className="text-xl">Date of Birth:</span>&nbsp;&nbsp;
              <span className="text-gray-700">{defaultDateOfBirth}</span>
            </div>
            <div className="text-lg font-semibold my-2">
              <span className="text-xl">Password:</span>&nbsp;&nbsp;
              <span className="text-gray-700 break-words">
                {defaultPassword}
              </span>
            </div>
            <div className="text-lg font-semibold my-2">
              <span className="text-xl">Gender:</span>&nbsp;&nbsp;
              <span className="text-gray-700">{defaultGender}</span>
            </div>
            <div className="text-lg font-semibold my-2">
              <span className="text-xl">About:</span>&nbsp;&nbsp;
              <span className="text-gray-700 break-words">{defaultAbout}</span>
            </div>
            <div className="text-right">
              <span
                onClick={() => setIsUpdateFormOpen(true)}
                className="cursor-pointer"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/lsrcesku.json"
                  trigger="hover"
                  style={{ width: "2rem", height: "2rem" }}
                ></lord-icon>
              </span>
              <span onClick={handleDelete} className="cursor-pointer">
                <lord-icon
                  src="https://cdn.lordicon.com/xekbkxul.json"
                  trigger="hover"
                  style={{ width: "2rem", height: "2rem" }}
                ></lord-icon>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
