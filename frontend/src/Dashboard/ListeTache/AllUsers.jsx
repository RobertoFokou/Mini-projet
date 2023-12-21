import React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { isEmpty } from "../../Services/utils";
import { useSelector } from "react-redux";
import UserBd from "./User";

export default function AllUsers() {
  const user = useSelector((state) => state.tacheUserAPI);
  localStorage.setItem("dataSelectAPI", JSON.stringify(user));
  return (
    <div className="App">
      <h1>
        Nombre total d'utilisateurs :{" "}
        <span style={{ color: "red" }}> {user.length}</span>
      </h1>
      <div>
        <Link to="/index">
          <button
            type="button"
            style={{
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "blue",
              fontSize: "14px",
              margin: "10px",
            }}
          >
            Retour
          </button>
        </Link>
        <Link to="/dashbord/ajout">
          <button
            type="button"
            style={{
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "blue",
              fontSize: "14px",
            }}
          >
            Ajouter une donnée
          </button>
        </Link>
        <br />
        <br />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: "red" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>Nom</TableCell>
                <TableCell style={{ color: "white" }}>Prenom</TableCell>
                <TableCell style={{ color: "white" }}>Numéro </TableCell>
                <TableCell style={{ color: "white" }}>email</TableCell>
                <TableCell style={{ color: "white" }}>Privilège</TableCell>
                <TableCell style={{ color: "white" }}>photo</TableCell>
                <TableCell style={{ color: "white" }}>Bloquer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isEmpty(user) &&
                user.map((e) => (
                  <UserBd
                    key={e.id}
                    nom={e.nom}
                    prenom={e.prenom}
                    numero={e.telephone}
                    email={e.email}
                    privilege ={e.privilege}
                    photo={e?.photo}
                    taskId={e._id}
                    // supp={deletetTaches}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
