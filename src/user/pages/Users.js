import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Sung Ahn",
      image: "https://avatars.githubusercontent.com/u/941784?s=400&v=4 ",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
