import React, { useState } from "react";
import axios from "axios";
import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import { REACT_APP_API_URL } from "../../data";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = (props: Props) => {
  const { slug, columns, setOpen } = props;

  // Initialize form data state
  const initialFormData = columns.reduce((acc, column) => {
    if (
      column.field !== "id" &&
      column.field !== "img" &&
      column.field !== "createdAt" &&
      column.field !== "verified"
    ) {
      acc[column.field] = "";
    }
    return acc;
  }, {} as { [key: string]: string });

  const [formData, setFormData] = useState(initialFormData);

  console.log("formData", formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page refresh

    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/${slug}s`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Item added:", response.data);
      setOpen(false); // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Add new {slug}</h1>
        <form onSubmit={handleSubmit}>
          {columns
            .filter(
              (item) =>
                item.field !== "id" &&
                item.field !== "img" &&
                item.field !== "createdAt"
            )
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input
                  type={column.type || "text"}
                  name={column.field}
                  placeholder={column.field}
                  value={formData[column.field]}
                  onChange={handleChange}
                />
              </div>
            ))}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
