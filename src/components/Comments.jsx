import { useContext, useEffect, useState } from "react";
import { deleteComment, getComments, getUsers, postComment } from "../api";
import Card from 'react-bootstrap/Card';
import { Loading } from "./Loading";
import Button from 'react-bootstrap/Button';
import { GameControlsContext } from "../contexts/GameControlsContext";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

export const Comments = () => {
const [comments, setComments] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [avatar_url, setAvatarUrl] = useState('');
const {gameParameters : {username : loggedInUser}} = useContext(GameControlsContext);

const [newComment, setNewComment] = useState('');
const [alertMsg, setAlertMsg] = useState('');
const [showAlert, setShowAlert] = useState(false);
const [successMsg, setSuccessMsg] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);

const [confirmDelete, setConfirmDelete] = useState(false);

useEffect(() => {
  setIsLoading(true);
  Promise.all([getComments(), getUsers()])
  .then(([{data: {comments}}, {data : {users}}]) => {
    setComments(() => {
      return comments.map(comment => {
        users.forEach(({username, avatar_url}) => {
          if (username === comment.username) {
            comment.avatar_url = avatar_url;
          } else if (username === loggedInUser) {
            setAvatarUrl(avatar_url);
          }
        });
        return comment;
      })
    })
  }).catch(err => {
    return;
  }).finally(() => setIsLoading(false));
}, []);

const handleSubmit = e => {
    setShowSuccess(false);
    setShowAlert(false);
    setAlertMsg('');
  e.preventDefault();
  if (!newComment) {
    setAlertMsg('Unable to post a blank comment.');
    setShowAlert(true);
  } else if (newComment) {
    postComment({comment: newComment, username: loggedInUser}).then(({data : {comment}}) => {
      setNewComment('');
      setComments (prev => {
        const commentsCopy = prev.map(comment => ({...comment}));
        commentsCopy.unshift({...comment, avatar_url});
        return commentsCopy;
      })
      setSuccessMsg('Your comment has been successfully posted.');
      setShowSuccess(true);
    }).catch(({response: {data}}) => {
        if (data.msg) {
            setAlertMsg(data.msg);
            setShowAlert(true);
        }
    })
  }
};

const showDelete = e => {
  setConfirmDelete(e.target.id);
}

const handleDelete = id => {
  return () => { 
    setConfirmDelete(false);
    deleteComment(id).then(() => {
      setComments(prev => prev.filter(comment => comment._id !== id));
      setSuccessMsg('Your comment has been successfully deleted.');
      setShowSuccess(true);
      window.scrollTo(0, 0);
    }).catch(({response : {data}}) => {
        if (data.msg) {
          setAlertMsg(data.msg);
          setShowAlert(true);
        }
    })
}
}

return(<main>
<h1 className="comments_h1">Join the conversation!</h1>
<p style={{color: 'whitesmoke', textAlign: 'center', margin: '60px auto 30px', fontSize: '20px'}}>{loggedInUser ? 'Use the form below to add a comment and continue the discussion.' : 'Log in to post a comment.'}</p>

     <section style={{marginBottom: 0}} className="comments_list">
      <Alert style={{marginBottom: 0, maxWidth: '1000px'}} id="login_success" show={showSuccess} variant="success">
        <Alert.Heading>Login successful.</Alert.Heading>
        <p>{successMsg}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowSuccess(false)} variant="outline-success">
            Close.
          </Button>
        </div>
      </Alert>
      </section>

    <section style={{marginBottom: 0}} className="comments_list">

      {showAlert && <Alert style={{margin: '60px auto 0', maxWidth: '1000px'}} id="login_alert" variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Something went wrong.</Alert.Heading>
        <p style={{margin: 0}}>{alertMsg}</p>
      </Alert>}

     {loggedInUser && <Form onSubmit={handleSubmit} id="new_comment">
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Add a new comment</Form.Label>
        <Form.Control as="textarea" placeholder="Type your comment here." value={newComment} onChange={e => setNewComment(e.target.value)}/>
      </Form.Group>
      <Button disabled={isLoading} variant="primary" type="submit">
        {isLoading ? 'Please wait...' : 'Submit'}
      </Button>
    </Form>}
    </section>

    <h2 className="profile_h2">Viewing latest comments</h2>

{isLoading ? <Loading/> : comments.length ? <section className="comments_list">{comments.map(comment => {
    return <Card style={{ maxWidth: '1000px', margin: '10px', boxShadow: '0 0 6px 2px rgb(207, 137, 7)'}} key={comment._id}>
      <Card.Body style={{display: 'flex', padding: '4px'}}>
        <div style={{width: '100px'}}>
      <Card.Img style={{
        height: '100px', 
        width: '100px', 
        margin: '1px 0', 
        borderRadius: '6px',
        border: '2px solid grey'
        }} variant="left" src={comment.avatar_url} />
        
        {loggedInUser === comment.username && !confirmDelete && 
            <Button id={comment._id} onClick={showDelete} style={{width: '100px', margin: '7px 0 0'}} variant="primary">
                Delete
            </Button>}
        </div>

      <div style={{margin: '0 10px'}}>
        <Card.Title>{comment.username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{`Posted on ${comment.created_at.slice(0, 10)} at ${comment.created_at.slice(10, 16)}`}</Card.Subtitle>
        <Card.Text style={{marginBottom: '3px'}}>{comment.comment}</Card.Text>
      </div>
      
      </Card.Body>
      {loggedInUser === comment.username && confirmDelete === comment._id && <Alert style={{margin: '5px 0 0'}} key="info" variant="info">If you're sure you want to delete this comment, click the delete button again to confirm.
      
      <div style={{display: 'flex'}}>
      <Button onClick={handleDelete(comment._id)} style={{display: 'block', margin: '10px 10px 0 0'}} variant="primary" type="submit">
        Confirm
        </Button>

      <Button onClick={() => setConfirmDelete(false)} style={{display: 'block', margin: '10px 0 0'}} variant="primary" type="submit">
        Cancel
        </Button>
      </div>
      
      </Alert>}
    </Card>
})}
<Button className="back-to-top" onClick={() => window.scrollTo(0, 0)} variant="primary">Back to top</Button>
</section> : null}
</main>)
};