import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import DataTable from "react-data-table-component";

// Component
function Flags() {
  const [flags, setFlags] = useState([]);
  let sno = 1;

  // DataTable Columns
  const columns = [
    {
      name: "Sno",
      selector: (row) => row.sno,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: "Capital",
      selector: (row) => row.capital,
      sortable: true,
    },
    {
      name: "",
      selector: (row) => row.action,
      sortable: false,
      cell: (data) => (
        <div>
          <Link
            to={`/update/${data.id}`}
            style={{ color: "white ", textDecoration: "none" }}
          >
            <button
              type="button"
              className="btn btn-primary btn-sm mx-2"
              onClick={() => handleUpdate(data.id)}
            >
              Update
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-danger  btn-sm mx-2"
            onClick={() => handleDelete(data.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // DataTable data
  const data = flags.map((flag) => {
    return {
      id: flag.id,
      sno: sno++,
      country: flag.country,
      capital: flag.capital,
    };
  });

  useEffect(() => {
    const fetchAllFlags = async () => {
      try {
        const res = await axios.get("http://localhost:8000/flags");
        setFlags(res.data);
      } catch (error) {}
    };

    fetchAllFlags();
  }, [flags, data]);

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8000/flags/" + id);
    } catch (error) {}
  };
  // update handler
  const handleUpdate = (e) => {};

  return (
    <>
      <div className="container my-5">
        <DataTable
          title="Country Info"
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          pointerOnHover
        />
      </div>
    </>
  );
}

export default Flags;
