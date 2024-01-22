import { useEffect, useState } from "react";
import Card from "../components/General/Card";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/users",
          { credentials: "include" }
        );
        if (response.ok) {
          const json = await response.json();
          setUsers(json);
        } else {
          console.log("No.....");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAllUser();
  }, []);

  return (
    <>
      <h1>UserList</h1>
      <section>
        {users?.map((user) => (
          <Card key={user._id} {...user} />
        ))}
      </section>
    </>
  );
};

export default UserList;
