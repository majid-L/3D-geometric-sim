import Spinner from 'react-bootstrap/Spinner';

export const Loading = () => {
  return (<><Spinner style={{
    display: 'block',
    height: '100px',
    width: '100px',
    margin: '30px auto',
    fontSize: '30px'
  }} animation="border" variant="warning"/>
  <p style={{
    textAlign: 'center',
    color: 'whitesmoke',
    fontSize: '20px',
    margin: '0 auto'
  }}>Loading...</p>
  </>)
};