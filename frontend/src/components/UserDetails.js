import React, { useEffect } from "react";
import { getUserDetails } from "../api";
import { bindActionCreators } from "redux";
import * as actionCreators from "../redux/action-creators/index";
import { useDispatch } from "react-redux";
import useRegistrationSelectors from "../hooks";
import { useLocation } from "react-router-dom";

const UserDetails = () => {
  const { state } = useLocation();
  const userName = state?.name;
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

  return (
    <div className="m-4 text-white p-5">
      <div>name:{userDetails.name}</div>
      <div>age: {userDetails.age}</div>
      <div>date of birth: {userDetails.dateOfBirth}</div>
      <div>age: {userDetails.password}</div>
      <div>age: {userDetails.gender}</div>
      <div>age: {userDetails.about}</div>
    </div>
  );
};

export default UserDetails;
