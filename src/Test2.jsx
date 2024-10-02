import React, { useEffect, useState } from "react";
import Dropdown from "./Components/Dropdown";
import Card from "./Components/Card";
import urgentImg from "./Assets/SVG - Urgent Priority colour.svg";
import highImg from "./Assets/Img - High Priority.svg";
import mediumImg from "./Assets/Img - Medium Priority.svg";
import lowImg from "./Assets/Img - Low Priority.svg";
import noImg from "./Assets/No-priority.svg";
import backlogImg from "./Assets/Backlog.svg";
import completedImg from "./Assets/Done.svg";
import inProgressImg from "./Assets/in-progress.svg";
import toDoImg from "./Assets/To-do.svg";
import cancelledImg from "./Assets/Cancelled.svg";
import addBtn from "./Assets/add.svg";
import menuBtn from "./Assets/3 dot menu.svg";
import "./Test.css";

function Test() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [sortOption, setSortOption] = useState("priority");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();
        console.log("Fetched data:", data);
        setTickets(data.tickets || []);
        setUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  const priorityNames = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No Priority",
  };

  const possibleGroups = {
    status: ["Backlog", "Todo", "In progress", "Completed", "Cancelled"],
    priority: ["No Priority", "Low", "Medium", "High", "Urgent"],
    user: users.map((user) => user.name),
  };

  const groupedTickets = possibleGroups[grouping].reduce((acc, groupKey) => {
    acc[groupKey] = tickets.filter((ticket) => {
      if (grouping === "user") return userMap[ticket.userId] === groupKey;
      if (grouping === "priority")
        return priorityNames[ticket.priority] === groupKey;
      return ticket[grouping] === groupKey;
    });
    return acc;
  }, {});
  console.log("Grouped tickets:", groupedTickets);

  const sortedTickets = Object.entries(groupedTickets).map(
    ([key, groupTickets]) => {
      const sorted = groupTickets.sort((a, b) => {
        if (sortOption === "priority") {
          return a.priority - b.priority;
        } else if (sortOption === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
      return [key, sorted];
    }
  );

  console.log("Sorted tickets:", sortedTickets);

  const priorityIcons = {
    Urgent: urgentImg,
    High: highImg,
    Medium: mediumImg,
    Low: lowImg,
    No: noImg,
  };

  const statusIcons = {
    Backlog: backlogImg,
    Completed: completedImg,
    Todo: toDoImg,
    "In progress": inProgressImg,
    Cancelled: cancelledImg,
  };

  const getIconForGroup = (groupKey) => {
    if (grouping === "priority") {
      return priorityIcons[groupKey] || noImg;
    } else if (grouping === "status") {
      return statusIcons[groupKey] || "";
    }
    return null;
  };

  return (
    <div className="App">
      <header>
        <div className="controls">
          <Dropdown
            options={[
              {
                label: "Grouping",
                values: ["status", "user", "priority"],
              },
              {
                label: "Ordering",
                values: ["priority", "title"],
              },
            ]}
            onGroupByChange={setGrouping}
            onSortByChange={setSortOption}
          />
        </div>
      </header>

      <div className="kanban-board">
        {sortedTickets.map(([groupKey, groupTickets]) => (
          <div key={groupKey} className="kanban-column">
            <div className="column-heading">
              <h2>
                {getIconForGroup(groupKey) && (
                  <img
                    src={getIconForGroup(groupKey)}
                    alt={`${groupKey} icon`}
                    style={{ marginRight: "10px" }}
                  />
                )}
                {groupKey}
              </h2>
              <div className="buttons">
                <img src={addBtn} alt="add" />
                <img src={menuBtn} alt="menu" />
              </div>
            </div>
            {groupTickets.length > 0 ? (
              groupTickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  title={ticket.title}
                  id={ticket.id}
                  tag={ticket.tag || ""}
                  status={ticket.status}
                  userId={ticket.userId}
                  priority={ticket.priority}
                  grouping={grouping}
                />
              ))
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Test;
