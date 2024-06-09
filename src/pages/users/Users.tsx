import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Add from "../../components/add/Add";
import DataTable from "../../components/dataTable/DataTable";
import { REACT_APP_API_URL } from "../../data";
import "./users.scss";

const columns: GridColDef[] = [
  // { field: "_id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 150,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 150,
    type: "boolean",
  },

  // action column in users page
];

const Users = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Function to fetch users from the API
    async function fetchUsers() {
      try {
        // Use the fetch function to send a GET request to the API
        const response = await fetch(`${REACT_APP_API_URL}/users`);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const users = await response.json();
        // console.log("response", response);
        setUsers(users);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }

    fetchUsers();
  });

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      <div>
        <DataTable slug="users" columns={columns} rows={users} />
        {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
      </div>
    </div>
  );
};

export default Users;
