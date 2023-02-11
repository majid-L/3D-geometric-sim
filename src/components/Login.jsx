import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import {login, signup, postUser} from '../api';
import { GameControlsContext } from '../contexts/GameControlsContext';
import { Smiley } from './Icons';

export const Login = () => {
const [formType, setFormType] = useState('login');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [passwordConf, setPasswordConf] = useState('');
const [email, setEmail] = useState('');
const [name, setName] = useState('');

const [alertMsg, setAlertMsg] = useState(false);
const [showAlert, setShowAlert] = useState(false);
const [successMsg, setSuccessMsg] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);

const { gameParameters, setGameParameters} = useContext(GameControlsContext);

const handleLogin = e => {
  e.preventDefault();
  if (gameParameters.username) {
    setAlertMsg(`You're already logged in, ${gameParameters.username}!`);
    setShowAlert(true);
  } else if (!username || !password) {
    setAlertMsg('Please complete all required fields.');
    setShowAlert(true);
  } else {
    setShowAlert(false);
    login(username, password).then(() => {
      setUsername('');
      setPassword('');
      setGameParameters(prev => ({...prev, username}));
      setSuccessMsg(`Welcome back, ${username}!`);
      setShowSuccess(true);
    }).catch(({response: {data}}) => {
        setShowAlert(true);
        if (data.error_msg) {
          setAlertMsg(data.error_msg);
        } else if (data.data.error_msg) {
          setAlertMsg(data.data.error_msg);
        } else {
          setAlertMsg("Login failed. Please ensure you are using the correct details and try again.");
        }
    })
  }
};

const handleSignup = e => {
  e.preventDefault();
  if (!username || !password || !email || !name || !passwordConf) {
    setAlertMsg('Please complete all required fields.');
    setShowAlert(true);
  } else if (password !== passwordConf) {
    setAlertMsg('Passwords do not match.');
    setShowAlert(true);
  } else if (password.length < 10 || !/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)/.test(password)) {
    setAlertMsg('Password does not meet requirements.');
    setShowAlert(true);
  } else {
    setShowAlert(false);
    signup(username, email, password)
    .then(() => {
        postUser(name, username, email, 'https://img.icons8.com/emoji/256/bust-in-silhouette.png')
    })
    .then((res) => {
        setSuccessMsg('Signup successful. You can now login to your account.');
        setShowSuccess(true);
        setFormType('login');
        setUsername('');
        setPassword('');
        setPasswordConf('');
        setName('');
        setEmail('');
    }).catch(err => {
        if (err.response.data.data.error_msg) {
          setAlertMsg(err.response.data.data.error_msg);
        } else if (err.response.data.msg) {
          setAlertMsg(err.response.data.msg);
        } else {
          setAlertMsg("Signup failed.");
        };
        setShowAlert(true);
    })
  };
}

  return (
    <main>
    <h1 className="login_h1">{formType === 'login' ? 'Login' : 'Sign up for a new account.'}</h1>
    <p className="login_text">{formType === 'login' ? 'Sign in to your account.' : 'Create a new account.'}</p>

    <Alert id="login_success" show={showSuccess} variant="success">
        <Alert.Heading>Login successful.</Alert.Heading>
        <p>{successMsg}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowSuccess(false)} variant="outline-success">
            Close.
          </Button>
        </div>
      </Alert>

    {showAlert && <Alert id="login_alert" variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Something went wrong.</Alert.Heading>
        <p style={{margin: 0}}>{alertMsg}{gameParameters.username && <Smiley/>}</p>
      </Alert>}

    <Form onSubmit={formType === "login" ? handleLogin : handleSignup} id="login_form">
    
    {formType === "signup" && <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)}/>
      </Form.Group>}

    <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      {formType === "signup" && <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
      </Form.Group>}

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {formType === "signup" && <Form.Text className="text-muted">
          Must be at least 10 characters long and include at least 1 number, 1 lowercase letter and 1 capital letter.
        </Form.Text>}
      </Form.Group>

      {formType === "signup" && <Form.Group className="mb-3" controlId="formBasicPasswordConf">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control type="password" placeholder="Confirm password" value={passwordConf} onChange={e => setPasswordConf(e.target.value)} />
      </Form.Group>}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    <div className="signup d-grid gap-2">
      <Button onClick={() => {
        formType === "login" ? setFormType('signup') : setFormType('login');
        setShowAlert(false);
      }} variant="secondary" size="lg">
        {formType === 'login' ? 'Need a new account? Click here to sign up.' : 'Already have an account? Click here to sign in.'}
      </Button>
    </div>
    </main>
  );
};