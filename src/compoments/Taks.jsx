import React from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Taks({ titre, nom, taskId, supp }) {
  return (
    <TableRow>
      <TableCell>{nom}</TableCell>
      <TableCell>{titre}</TableCell>
      <TableCell>
        <input type="checkbox" style={{ cursor: "pointer" }} />
      </TableCell>
      <TableCell>
        <DeleteIcon
          style={{ cursor: "pointer" }}
          onClick={(e) => supp(taskId)}
        ></DeleteIcon>
      </TableCell>
    </TableRow>
  );
}
