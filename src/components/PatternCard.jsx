import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import DeletePattern from './DeletePattern';

const stringToArray = str => str.split(" ").map(m => m.split("").map(m => +m));

function PatternCard ({id, username, pattern_name, avatar_url, created_at, pattern_body, setPatternsData}) {
  const [deleteMsg, setDeleteMsg] = useState(false);
  const gridcolumns = "1fr ".repeat(pattern_body.split(" ")[0].length);

    return <><Card>
    <Card.Header>
        <Nav variant="pills" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link href="#first">Go 3D</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#link">Go 2D</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#">
              More patterns
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      {/* <Card.Img variant="top" src={avatar_url} /> */}
      <Card.Body>
        <Card.Title>"{pattern_name}"</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">By {username}</Card.Subtitle>
        <Card.Text>
          Added on {created_at.slice(0, 10)}
        </Card.Text>
        <div className="cellboard" 
        style={{
          width: '280px',
          backgroundColor: 'rgb(120, 120, 120)',
          height: '280px',
          borderRadius: 0,
          gridTemplateColumns: gridcolumns,
          boxShadow: "6px 10px 17px" }}>
       {stringToArray(pattern_body).map((row, i) => {
        return row.map((col, k) => (
         <div className="cell"
          key={`${i}-${k}`}
          style={{
            backgroundColor: stringToArray(pattern_body)[i][k] ? "rgb(255, 31, 200)" : '',
            boxShadow: stringToArray(pattern_body)[i][k] ? "0px 0 6px inset" : "",
            border: "solid 1px rgb(90, 90, 90)",
          }}
         />
         ))
        }
        )}
        </div>
        <Button onClick={() => setDeleteMsg(true)} className="pattern_delete" variant="primary">Delete</Button>
      </Card.Body>
    </Card>
    
    <DeletePattern id={id}
        show={deleteMsg}
        onHide={() => setDeleteMsg(false)}
        setPatternsData={setPatternsData}
      />
    </>
};

export default PatternCard;