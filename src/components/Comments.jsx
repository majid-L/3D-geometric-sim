import { useContext, useEffect, useState } from "react";
import { getComments, getUsers } from "../api";
import Card from 'react-bootstrap/Card';
import { Loading } from "./Loading";
import Button from 'react-bootstrap/Button';
import { GameControlsContext } from "../contexts/GameControlsContext";
import Form from 'react-bootstrap/Form';

export const Comments = () => {
const [comments, setComments] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const {gameParameters : {username : loggedInUser}} = useContext(GameControlsContext);

useEffect(() => {
  setIsLoading(true);
  Promise.all([getComments(), getUsers()])
  .then(([{data: {comments}}, {data : {users}}]) => {
    setComments(() => {
      return comments.map(comment => {
        users.forEach(({username, avatar_url}) => {
          if (username === comment.username) {
            comment.avatar_url = avatar_url;
          };
        });
        return comment;
      })
    })
  }).catch(err => {

  }).finally(() => setIsLoading(false));
}, []);

const handleSubmit = e => {
  e.preventDefault();
}

return(<main>
<h1 className="comments_h1">Join the conversation!</h1>
<p style={{color: 'whitesmoke', textAlign: 'center'}}>Use the form below to add a comment and continue the discussion.</p>

    <section style={{marginBottom: 0}} className="comments_list">
     <Form onSubmit={handleSubmit} id="new_comment">
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Add a new comment</Form.Label>
        <Form.Control as="textarea" placeholder="Type your comment here." />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </section>

    <h2 className="profile_h2">Viewing latest comments</h2>

{isLoading ? <Loading/> : comments.length ? <section className="comments_list">{comments.map(comment => {
    return <Card style={{ maxWidth: '1000px', margin: '10px'}} key={comment._id}>
      <Card.Body style={{display: 'flex', padding: '4px'}}>
        <div style={{width: '100px'}}>
      <Card.Img style={{
        height: '100px', 
        width: '100px', 
        margin: '1px 0', 
        borderRadius: '6px',
        border: '2px solid grey'
        }} variant="left" src={comment.avatar_url} />
        {loggedInUser === comment.username && <Button style={{width: '100px', margin: '7px 0 0'}} variant="primary">Delete</Button>}</div>
      <div style={{margin: '0 10px'}}>
        <Card.Title>{comment.username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{`Posted on ${comment.created_at.slice(0, 10)} at ${comment.created_at.slice(10, 16)}`}</Card.Subtitle>
        <Card.Text style={{marginBottom: '3px'}}>{comment.comment}</Card.Text>
      </div></Card.Body>
    </Card>
})}
<Button className="back-to-top" onClick={() => window.scrollTo(0, 0)} variant="primary">Back to top</Button>
</section> : null}
</main>)
};