import React from 'react';
import axios from 'axios';

export default function CreateClass() {
  const [subject, setSubject] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('http://localhost:8080/subject')
      .then(function (response) {
        console.log(response.data);
        setSubject(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Create a class</h2>

      <form>
        <label htmlFor='subject' style={{ paddingRight: '1em' }}>
          Subject
        </label>
        <select id='subject'>
          {subject ? (
            subject.map((item) => {
              return (
                <option value={item.subject} key={item.subject}>
                  {item.subject}
                </option>
              );
            })
          ) : (
            <></>
          )}
        </select>
      </form>
    </main>
  );
}
