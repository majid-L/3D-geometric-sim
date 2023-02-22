import { useEffect, useState } from "react";
import { getPatterns, getUsers } from "../api";
import PatternCard from './PatternCard';
import { Loading } from "./Loading";
import Alert from 'react-bootstrap/Alert';
import { Button } from "react-bootstrap";

function Patterns() {
  const [patternsData, setPatternsData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getPatterns(), getUsers()])
    .then(([{data: {patterns}}, {data: {users}}]) => {
      const patternsData = patterns.map(pattern => {
        users.forEach(user => {
          if (user.username === pattern.username) {
            pattern.avatar_url = user.avatar_url;
          }
        });
        return pattern;
      })
      setPatternsData(patternsData);
    }).catch(({response: {data}}) => {
      if (data.msg) {
        setAlertMsg(data.msg);
        setShowAlert(true);
      };
    }).finally(() => {
      setIsLoading(false);
    })
  }, []);

  return (<main>
    <h1 className="patterns_h1">Patterns</h1>

      {showAlert && <Alert style={{width: '80%', maxWidth: '820px'}} id="profile_alert" variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Something went wrong.</Alert.Heading>
        <p style={{margin: 0}}>{alertMsg}</p>
      </Alert>}

    {isLoading ? <Loading/> : !alertMsg ? <section className="patterns_list">
      {patternsData && patternsData.map(pattern => {
        return <PatternCard key={pattern._id} id={pattern._id} username={pattern.username} pattern_name={pattern.pattern_name} avatar_url={pattern.avatar_url} created_at={pattern.created_at} pattern_body={pattern.pattern_body} setPatternsData={setPatternsData}/>
      })}
    </section> : null}
    {!isLoading && <Button style={{margin: '-30px auto 60px'}} className="back-to-top" onClick={() => window.scrollTo(0, 0)} variant="primary">Back to top</Button>}
  </main>)

}
export default Patterns;