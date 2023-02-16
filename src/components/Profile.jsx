import { useContext, useEffect, useState } from "react";
import { getUsers, updateUser } from "../api";
import { GameControlsContext } from "../contexts/GameControlsContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

export const Profile = () => {
const [userDetails, setUserDetails] = useState('');
const {gameParameters : {username: loggedInUser}} = useContext(GameControlsContext);

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [avatarUrl, setAvatarUrl] = useState('');

const [alertMsg, setAlertMsg] = useState('');
const [showAlert, setShowAlert] = useState(false);
const [successMsg, setSuccessMsg] = useState('');
const [showSuccess, setShowSuccess] = useState(false);
const [rerender, setRerender] = useState(0);

useEffect(() => {
  getUsers().then(({data : {users}}) => {
    users.forEach(user => {
      if (user.username === loggedInUser) {
        setUserDetails(user);
      }
    })
  })
}, [rerender]);

const handleSubmit = e => {
  setShowSuccess(false);
  setShowAlert(false);
  e.preventDefault();
  if (!name && !email && !avatarUrl) {
    setAlertMsg('Please update at least one field before submitting the form.');
    setShowAlert(true);
  } else {
    const requestBody = {};
    if (name) {
      requestBody.account_owner = name;
    };
    if (email) {
      requestBody.email = email;
    };
    if (avatarUrl) {
      requestBody.avatar_url = avatarUrl;
    };

    updateUser(requestBody, userDetails._id).then(() => {
      setSuccessMsg('You\'ve successfully updated your details.');
      setShowSuccess(true);
      setRerender(prev => prev + 1);
    }).catch(err => {
        if (err.response.data.msg) {
          setAlertMsg(err.response.data.msg);
          setShowAlert(true);
        };
    }).finally(() => {
        setName('');
        setEmail('');
        setAvatarUrl('');
    })
  }
};

const handleError = ({ currentTarget }) => {
  currentTarget.onerror = null; // prevents looping
  currentTarget.src=`avatar${[0, 1, 2, 3, 4, 5, 6][Math.floor(Math.random() * 7)]}.png`;
};

return (<main>
    <h1 className="profile_h1">Profile</h1>

    {userDetails && <div className="profile_card">
    <img className="profile_img" src={userDetails.avatar_url} onError={handleError}/>
    <div>
    <p style={{fontWeight: 'bold'}}>{userDetails.account_owner}</p>
    <p>{userDetails.username}</p>
    <p>{userDetails.email}</p>
    </div>
    </div>}

<h2 className="profile_h2">Update profile information</h2>

       {showAlert && <Alert style={{width: '80%', maxWidth: '820px'}} id="profile_alert" variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Something went wrong.</Alert.Heading>
        <p style={{margin: 0}}>{alertMsg}</p>
      </Alert>}

      <Alert style={{width: '80%', maxWidth: '820px'}} id="profile_success" show={showSuccess} variant="success">
        <Alert.Heading>Done.</Alert.Heading>
        <p>{successMsg}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowSuccess(false)} variant="outline-success">
            Close.
          </Button>
        </div>
      </Alert>

<Form onSubmit={handleSubmit} id="profile_form">
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Update your name" value={name} onChange={e => setName(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Update your email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Avatar URL</Form.Label>
        <Form.Control type="text" placeholder="Update your avatar" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)}/>
        <Form.Text className="text-muted">
          If your avatar image above doesn't instantly update, there's probably an issue with the url!
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    
</main>)
};