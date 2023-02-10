import { useEffect, useState } from "react";
import { getUsers } from "../api";
import { UserCard } from "./UserCard";

export const Users = () => {
const [users, setUsers] = useState('');

useEffect(() => {
  getUsers().then(({data : {users}}) => {
    setUsers(users);
  })
}, []);

return(
<main>
<h1 className="users_h1">Users</h1>
<section className="users_list">
{users && users.map(({_id, account_owner, email, username, avatar_url}) => {
    return <UserCard key={_id} id={_id} username={username} accountOwner={account_owner} email={email} avatar={avatar_url} />
})}
</section>
</main>
);
};