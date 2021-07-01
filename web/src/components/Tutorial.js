import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTutorial, deleteTutorial } from "../actions/tutorials";
import TutorialDataService from "../services/TutorialService";

const Tutorial = (props) => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };

  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  // 튜토리얼 가져오기
  const getTutorial = (id) => {
    TutorialDataService.get(id)
      .then((res) => {
        console.log(`data`, res.data);
        setCurrentTutorial(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // prop으로 받은 파라미터 아이디가 달라질 경우 재렌더링
  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updateStatus = (status) => {
    const data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status,
    };

    dispatch(updateTutorial(currentTutorial.id, data))
      .then((response) => {
        console.log(response);

        setCurrentTutorial({ ...currentTutorial, published: status });
        setMessage("상태 업데이트 성공!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateTutorial(currentTutorial.id, currentTutorial))
      .then((res) => {
        console.log(`data`, res.data);
        setMessage("튜토리얼 업데이트 성공!");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const removeTutorial = () => {
    dispatch(deleteTutorial(currentTutorial.id))
      .then(() => {
        props.history.push("/tutorials");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>튜토리얼</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">타이틀</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">설명</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>상태:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="btn btn-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="btn btn-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className="btn btn-danger mr-2" onClick={removeTutorial}>
            삭제
          </button>

          <button
            type="submit"
            className="btn btn-success"
            onClick={updateContent}
          >
            업데이트
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...!</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
