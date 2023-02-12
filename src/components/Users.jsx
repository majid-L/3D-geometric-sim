import { useEffect, useState } from "react";
import { getUsers } from "../api";
import { UserCard } from "./UserCard";
import {Loading} from './Loading';
import Alert from 'react-bootstrap/Alert';

const ErrorAlert = ({error}) => {
  return <Alert style={{margin: '5px auto 0', maxWidth: '800px'}} key="info" variant="info">
    <Alert.Heading>Something went wrong.</Alert.Heading>
    {error}
  <div style={{display: 'flex'}}>
  </div>
  </Alert>
} 

export const Users = () => {
const [users, setUsers] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(false);

useEffect(() => {
  setIsLoading(true);
  getUsers().then(({data : {users}}) => {
    setUsers(users);
    setIsLoading(false);
  }).catch(err => {
    console.log(err);
    setIsLoading(false);
    setError(err.response.data.msg)
  })
}, []);


return(
<main>
<h1 className="users_h1">Users</h1>
{isLoading && !error ? <Loading/> : error ? <ErrorAlert error={error}/> : <section className="users_list">
{users && users.map(({_id, account_owner, email, username, avatar_url}) => {
    return <UserCard key={_id} id={_id} username={username} accountOwner={account_owner} email={email} avatar={avatar_url} />
})}
</section>}
</main>
);
};