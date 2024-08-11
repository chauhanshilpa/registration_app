import React, { useEffect, useState } from "react";
import { deleteUserData, getUserDetails } from "../api";
import { bindActionCreators } from "redux";
import * as actionCreators from "../redux/action-creators/index";
import { useDispatch } from "react-redux";
import useRegistrationSelectors from "../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import DetailsForm from "./DetailsForm";

/**
 *
 * @returns a page with box containing user details with update and delete options
 */
const UserDetails = () => {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  const { state } = useLocation();
  const userId = state?.userId;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { setUserDetails } = bindActionCreators(actionCreators, dispatch);
  const { userDetails } = useRegistrationSelectors();

  useEffect(() => {
    (async function () {
      const response = await getUserDetails(userId);
      setUserDetails({ ...response });
    })();
    // eslint-disable-next-line
  }, []);

  const handleUpdate = async () => {
    setIsUpdateFormOpen(true);
  };

  const handleDelete = async () => {
    await deleteUserData(userId);
    navigate("/");
  };

  return (
    <section>
      {isUpdateFormOpen && (
        <div className="absolute w-full z-10">
          <DetailsForm
            type="update"
            setIsUpdateFormOpen={setIsUpdateFormOpen}
          />
        </div>
      )}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md bg-[#E2DAD6] dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {/* <div className="mt-10 text-gray-800 p-10 rounded bg-[#E2DAD6] border border-gray-700"> */}
            <div className="text-4xl font-bold text-center my-10 underline">
              Your Details
            </div>
            <div className="text-lg font-semibold my-2">
              <span className="text-xl">Name:</span>&nbsp;&nbsp;
              <span className="text-gray-700 break-words">
                {userDetails.name}
              </span>
            </div>
            <div className="text-lg font-semibold my-2">
              <span className="text-xl">Age:</span>&nbsp;&nbsp;
              <span className="text-gray-700">{userDetails.age}</span>
            </div>
            <div className="text-lg font-semibold my-2">
              <span className="text-xl">Date of Birth:</span>&nbsp;&nbsp;
              <span className="text-gray-700">{userDetails.dateOfBirth}</span>
            </div>
            <div className="text-lg font-semibold my-2">
              <span className="text-xl">Password:</span>&nbsp;&nbsp;
              <span className="text-gray-700 break-words">
                {userDetails.password}
              </span>
            </div>
            <div className="text-lg font-semibold my-2">
              <span className="text-xl">Gender:</span>&nbsp;&nbsp;
              <span className="text-gray-700">{userDetails.gender}</span>
            </div>
            <div className="text-lg font-semibold my-2">
              <span className="text-xl">About:</span>&nbsp;&nbsp;
              <span className="text-gray-700 break-words">
                {userDetails.about}
              </span>
            </div>
            <div className="text-right">
              <span onClick={handleUpdate} className="cursor-pointer">
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
