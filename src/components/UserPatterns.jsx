import { useEffect } from "react";
import { useState } from "react";
import { getPatternsByUser, getUsers } from "../api";
import PatternCard from './PatternCard';

function UserPatterns () {
const [username, setUsername] = useState('zack81');
const [userPatterns, setUserPatterns] = useState([]);
const [userData, setUserData] = useState([]);

useEffect(() => {
  Promise.all([
    getPatternsByUser(username),
    getUsers()
  ]).then(([{data: {patterns}}, {data: {users}}]) => {
    setUserPatterns(patterns);
    users.forEach(user => {
      if(user.username === username){
        setUserData(user);
      }
    })
  })
}, []);

if (userPatterns.length && userData.username) {
  return (<main>
    <div className="user_title">
    <h1 className="user_h1">Welcome back, {userData.account_owner.split(" ")[0]}.</h1>
    <img className="user_img" src={userData.avatar_url}/></div>
    <article className="patterns_list">
        {userPatterns.map(pattern => {
          return <PatternCard key={pattern._id} username={pattern.username} pattern_name={pattern.pattern_name} avatar_url={pattern.avatar_url} created_at={pattern.created_at} pattern_body={pattern.pattern_body}/>
        })}
    </article>
  </main>)
}
};

export default UserPatterns;