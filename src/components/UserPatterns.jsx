import { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getPatternsByUser, getUsers } from "../api";
import { GameControlsContext } from "../contexts/GameControlsContext";
import PatternCard from './PatternCard';

function UserPatterns () {
const [userPatterns, setUserPatterns] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const {gameParameters: {username: loggedInUser}} = useContext(GameControlsContext);
const {username} = useParams();

useEffect(() => {
  getPatternsByUser(username)
  .then(({data: {patterns}}) => {
    setUserPatterns(patterns);
    setIsLoading(false);
  })
  .catch(err => {
    setIsLoading(false);
    return;
  })
}, []);

if (userPatterns) {
  return (<main>
    <h1 className="user_h1">{loggedInUser === username ? `Welcome back, ${username}.` : `${username}'s patterns`}</h1>
    {!isLoading && userPatterns.length ? <p className="user_intro">{loggedInUser === username ? 'Here are your saved patterns.' : `You are currently viewing all patterns submitted by ${username}.`}</p> : !isLoading && !userPatterns.length ? <p className="user_intro">{loggedInUser === username ? 'You haven\'t created any patterns yet.' : `${username} hasn\'t posted any patterns yet.`}</p> : null}
    <article className="patterns_list">
        {userPatterns.map(pattern => {
          return <PatternCard key={pattern._id} id={pattern._id} username={pattern.username} pattern_name={pattern.pattern_name} avatar_url={pattern.avatar_url} created_at={pattern.created_at} pattern_body={pattern.pattern_body} setPatternsData={setUserPatterns}/>
        })}
    </article>
  </main>)
}
};

export default UserPatterns;