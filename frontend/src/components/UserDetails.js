import React, { useEffect } from "react";
import { deleteUserData, getUserDetails, updateUserData } from "../api";
import { bindActionCreators } from "redux";
import * as actionCreators from "../redux/action-creators/index";
import { useDispatch } from "react-redux";
import useRegistrationSelectors from "../hooks";
import { useLocation, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { state } = useLocation();
  const userName = state?.name;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { setUserDetails } = bindActionCreators(actionCreators, dispatch);
  const { userDetails } = useRegistrationSelectors();

  useEffect(() => {
    (async function () {
      const response = await getUserDetails(userName);
      setUserDetails({ ...response });
    })();
    // eslint-disable-next-line
  }, []);

  const handleUpdate = async () => {
    await updateUserData();
  };

  const handleDelete = async () => {
    await deleteUserData(userName);
    navigate("/");
  };

  return (
    <div className="flex justify-center">
      <div className="m-4 text-white p-5">
        <div className="text-4xl font-bold text-center my-10 drop-shadow-md shadow-slate-200">
          Your Details
        </div>
        <div className="text-lg font-semibold my-2">
          <span className="text-xl">Name:</span>&nbsp;&nbsp;
          <span>{userDetails.name}</span>
        </div>
        <div className="text-lg font-semibold my-2">
          <span className="text-xl">Age:</span>&nbsp;&nbsp;
          <span>{userDetails.age}</span>
        </div>
        <div className="text-lg font-semibold my-2">
          <span className="text-xl">Date of Birth:</span>&nbsp;&nbsp;
          <span></span>
          {userDetails.dateOfBirth}
        </div>
        <div className="text-lg font-semibold my-2">
          <span className="text-xl">Password:</span>&nbsp;&nbsp;
          <span>{userDetails.password}</span>
        </div>
        <div className="text-lg font-semibold my-2">
          <span className="text-xl">Gender:</span>&nbsp;&nbsp;
          <span>{userDetails.gender}</span>
        </div>
        <div className="text-lg font-semibold my-2">
          <span className="text-xl">About:</span>&nbsp;&nbsp;
          <span>{userDetails.about}</span>
        </div>
        <div className="text-right">
          <span onClick={handleUpdate}>
            <lord-icon
              src="https://cdn.lordicon.com/lsrcesku.json"
              trigger="hover"
              style={{ width: "2rem", height: "2rem" }}
            ></lord-icon>
          </span>
          <span onClick={handleDelete}>
            <lord-icon
              src="https://cdn.lordicon.com/xekbkxul.json"
              trigger="hover"
              style={{ width: "2rem", height: "2rem" }}
            ></lord-icon>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
