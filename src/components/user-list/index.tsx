import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import routeNames from "../../routes/routeNames";

interface IUser {
  username: string;
}

export default function UserList() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<IUser[]>([]);

  const fetchUserList = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/userlist`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result = await response.json();

      if (result.status === 200) {
        setUserList(result.data);
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    navigate(routeNames.LOGIN);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div className="">
      <div className="d-flex justify-content-between">
        <h1>UserList</h1>
        <button className="btn btn-primary" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>

      <ul>
        {userList &&
          userList.length &&
          userList.map((item, index) => <li key={index}>{item?.username}</li>)}
      </ul>
    </div>
  );
}
