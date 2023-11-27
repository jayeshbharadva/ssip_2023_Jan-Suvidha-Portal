import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const New = () => {
  const { id } = useParams();
  const [objects, setObjects] = useState([]);

  // Move handleViewClick inside the component
  const handleViewClick = (object) => {
    // Add logic to handle the "View" button click, for example, navigate to the link or show more details.
    console.log(`View button clicked for ${object.name}`);
  };

  useEffect(() => {
    // Function to make API call and set response in objects state
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3108/document/userlist`, {
        method: "POST",
        body: JSON.stringify({ schemeid: id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setObjects(response);
    };

    // Call the API function
    fetchData();
  }, [id]); // Trigger the effect when the id parameter changes

  return (
    <div>
      <h2>Object List</h2>
      <ul>
        {objects.map((object, index) => (
          <li key={index}>
            <strong>Name:</strong> {object.name}{" "}
            <a href={object.link} target="_blank" rel="noopener noreferrer">
              (Link)
            </a>{" "}
            <button onClick={() => handleViewClick(object)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default New;
