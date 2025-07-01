import { useEffect, useState } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
