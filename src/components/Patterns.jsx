import { useEffect, useState } from "react";
import { getPatterns, getUsers } from "../api";
import PatternCard from './PatternCard';

function Patterns() {
  const [patternsData, setPatternsData] = useState([]);

  useEffect(() => {
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
    });
  }, []);

  return (<main>
    <h1 className="patterns_h1">Patterns</h1>
    <section className="patterns_list">
      {patternsData.map(pattern => {
        return <PatternCard key={pattern._id} id={pattern._id} username={pattern.username} pattern_name={pattern.pattern_name} avatar_url={pattern.avatar_url} created_at={pattern.created_at} pattern_body={pattern.pattern_body} setPatternsData={setPatternsData}/>
      })}
    </section>
  </main>)

}
export default Patterns;



/*

return  <Card key={pattern._id} style={{ width: '21rem' }}>
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
          <Card.Img variant="top" src={pattern.avatar_url} />
          <Card.Body>
            <Card.Title>"{pattern.pattern_name}"</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">By {pattern.username}</Card.Subtitle>
            <Card.Text>
              Added on {pattern.created_at.slice(0, 10)}
            </Card.Text>
            <div className="grid" 
            style={{
              'display': "grid", 
              'gridTemplateColumns': `repeat(${pattern.pattern_body.split(" ")[0].length}, 25px)`,
              'boxShadow': "6px 10px 17px" }}>
           {stringToArray(pattern.pattern_body).map((row, i) => {
            return row.map((col, k) => (
             <div className="cell"
              key={`${i}-${k}`}
              style={{
                'width': '100%',
                'height': '25px',
                'backgroundColor': stringToArray(pattern.pattern_body)[i][k] ? "pink" : '',
                'boxShadow': stringToArray(pattern.pattern_body)[i][k] ? "0px 0 6px inset" : "",
                'border': "solid 1px black",
              }}
             />
             ))
            }
            )}
            </div>
            <Button className="pattern_delete" variant="primary">Delete</Button>
          </Card.Body>
        </Card>
*/