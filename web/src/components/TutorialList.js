import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveTutorials,
  findTutorialsByTitle,
  deleteAllTutorials,
} from "../actions/tutorials";
import { Link } from "react-router-dom";

const TutorialList = () => {
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const tutorials = useSelector((state) => state.tutorials);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("tutorials state", tutorials);
    dispatch(retrieveTutorials());
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    dispatch(deleteAllTutorials())
      .then((res) => {
        console.log(`res`, res);
        refreshData();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findTutorialsByTitle(searchTitle));
  };


  /**
   * event 조작
   */
  const onKeyPress = (event) => {
    if(event.key === 'Enter'){
      findByTitle();
    }
  }

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onKeyUp={onKeyPress}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              검색
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>튜토리얼 리스트</h4>

        <ul className="list-group">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          전체 삭제
        </button>
      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <div>
            <h4>튜토리얼</h4>
            <div>
              <label>
                <strong>타이틀:</strong>
              </label>{" "}
              {currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>설명:</strong>
              </label>{" "}
              {currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>상태:</strong>
              </label>{" "}
              {currentTutorial.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/tutorials/" + currentTutorial.id}
              className="badge badge-warning"
            >
              <button className="m-3 btn btn-sm btn-primary">수정</button>
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial.....</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default TutorialList;
