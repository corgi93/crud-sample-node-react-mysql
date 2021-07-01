import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTutorial } from "../actions/tutorials";

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  // store dispatch
  const dispatch = useDispatch();
  const handleInputChange = event => {
      const {name, value} = event.target;
      setTutorial({...tutorial, [name]: value})
  }
  const saveTutorial = () => {
      const { title, description } = tutorial;
      dispatch(createTutorial(title, description))
      .then(data => {
          setTutorial({
              id : data.id,
              title: data.title,
              description : data.description,
              published : data.published
          });
          setSubmitted(true);

          console.log('data!' , data);
      })
      .catch(e => {
          console.error(e);
      });
  }

  const newTutorial = () => {
      setTutorial(initialTutorialState);
      setSubmitted(false);
  }

  return (
    <div className="submit-form">
    {submitted ? (
      <div>
        <h4>제출 성공!</h4>
        <button className="btn btn-success" onClick={newTutorial}>
          +추가
        </button>
      </div>
    ) : (
      <div>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
            value={tutorial.title}
            onChange={handleInputChange}
            name="title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">설명</label>
          <input
            type="text"
            className="form-control"
            id="description"
            required
            value={tutorial.description}
            onChange={handleInputChange}
            name="description"
          />
        </div>

        <button onClick={saveTutorial} className="btn btn-success">
          제출
        </button>
      </div>
    )}
  </div>
  );
};

export default AddTutorial;
