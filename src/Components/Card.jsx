import React from "react";
import urgentImg from "../Assets/SVG - Urgent Priority grey.svg";
import highImg from "../Assets/Img - High Priority.svg";
import mediumImg from "../Assets/Img - Medium Priority.svg";
import lowImg from "../Assets/Img - Low Priority.svg";
import noImg from "../Assets/No-priority.svg";
import backlogImg from "../Assets/Backlog.svg";
import completedImg from "../Assets/Done.svg";
import inProgressImg from "../Assets/in-progress.svg";
import toDoImg from "../Assets/To-do.svg";
import cancelledImg from "../Assets/Cancelled.svg";
import "./Card.css";

const Card = ({ title, id, tag, status, userId, priority, grouping }) => {
  const priorityImg = [
    {
      prior: "Urgent",
      pid: 4,
      img: urgentImg,
    },
    {
      prior: "High",
      pid: 3,
      img: highImg,
    },
    {
      prior: "Medium",
      pid: 2,
      img: mediumImg,
    },
    {
      prior: "Low",
      pid: 1,
      img: lowImg,
    },
    {
      prior: "No",
      pid: 0,
      img: noImg,
    },
  ];

  const statusImg = [
    {
      status: "Backlog",
      img: backlogImg,
    },
    {
      status: "Completed",
      img: completedImg,
    },
    {
      status: "Todo",
      img: toDoImg,
    },
    {
      status: "In progress",
      img: inProgressImg,
    },
    {
      status: "Cancelled",
      img: cancelledImg,
    },
  ];

  const getStatusImage = (status) => {
    const foundStatus = statusImg.find((item) => item.status === status);
    return foundStatus ? foundStatus.img : null;
  };

  const currentStatusImg = getStatusImage(status);

  return (
    <>
      <div className="card">
        <div className="heading">
          <div className="ids">
            <p>{id}</p>
          </div>
          {grouping !== "user" && (
            <div className="profileImg">
              <div className="im">{userId}</div>
            </div>
          )}
        </div>
        <div className="title">
          {grouping !== "status" && currentStatusImg && (
            <div className="status">
              <img src={currentStatusImg} alt={status} />
            </div>
          )}
          <div className="description">
            <p>{title}</p>
          </div>
        </div>
        <div className="priority_tags">
          {grouping !== "priority" && (
            <div className="priority">
              <img src={priorityImg[priority].img} alt="img" />
            </div>
          )}
          <div className="tag">
            <div className="circle"></div>
            <p>{tag}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
