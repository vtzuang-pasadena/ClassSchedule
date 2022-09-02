import React from 'react';
import axios from 'axios';
import '../App.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function CreateClass() {
  const [subject, setSubject] = React.useState([]);
  const [showSubjectWarning, setSubjectWarning] = React.useState(false);
  const [chosenSubject, setChosenSubject] = React.useState();
  const [courseNumber, setCourseNumber] = React.useState();

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

  React.useEffect(() => {
    if (chosenSubject) {
      setSubjectWarning(false);
    } else {
      setSubjectWarning(true);
    }
  }, [chosenSubject]);

  function checkCourseNumber(event) {
    let enteredNumber = event.target.value;
    // console.log(enteredNumber);

    if (enteredNumber >= 1 && enteredNumber <= 499) {
      setCourseNumber(enteredNumber);
    }
  }

  function checkDuplicateCourseNumber() {
    console.log(courseNumber);

    chosenSubject
      ? axios
          .post('http://localhost:8080/checkCourseNumber', {
            subject: chosenSubject,
            courseNumber: courseNumber,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
      : setSubjectWarning(true);
  }

  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Create a class</h2>

      <Form className='createClassForm'>
        <Form.Group className='mb-4'>
          <Row>
            <Form.Label htmlFor='subject'>Subject</Form.Label>
          </Row>

          <Row className='mb-4' style={{ marginBottom: '1em' }}>
            <Form.Select
              id='subject'
              onChange={(evt) => {
                setChosenSubject(evt.target.value);
              }}
              onBlur={checkDuplicateCourseNumber}
            >
              <option value='' key=''>
                Select One
              </option>
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
            </Form.Select>

            {showSubjectWarning ? (
              <Row style={{ color: '#ff5349', fontWeight: '800' }}>
                <em>Select a subject</em>
              </Row>
            ) : (
              <></>
            )}
          </Row>
        </Form.Group>

        <Form.Group>
          <Row>
            <Form.Label htmlFor='courseNumber'>Course Number</Form.Label>
          </Row>
          <Form.Control
            type='number'
            id='courseNumber'
            name='courseNumber'
            min='1'
            max='999'
            size='4'
            onChange={checkCourseNumber}
            value={courseNumber}
            onBlur={checkDuplicateCourseNumber}
          ></Form.Control>
        </Form.Group>
      </Form>
    </main>
  );
}
