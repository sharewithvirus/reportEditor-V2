import React, { useState } from "react";
import parse from "html-react-parser";
import copy from "copy-to-clipboard";
import { createTable } from "../../../../Services/tableServices";
import { useParams } from "react-router-dom";
import { UserDataContext } from "../../../../context/userContext";
import { useContext } from "react";
const TableUpload = ({ handleClose }) => {
  const [tableType, setTableType] = useState("fromScratch");
  const [tableName, setTableName] = useState("");
  const { setIsLoading } = useContext(UserDataContext);
  const [openSnack, setopenSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [snackMsg, setSnackMsg] = useState("");
  const { id } = useParams();
  return (
    <div>
      <div className="container">
        <div className="row clearfix">
          <div className="center">
            <label>Enter Table Name : </label>
            <input
              type={"text"}
              value={tableName}
              placeholder="ENTER TABLE NAME"
              onChange={(e) => setTableName(e.target.value)}
            />
          </div>
          <div
            onChange={(e) => {
              setTableType(e.target.value);
            }}
          >
            <input
              type="radio"
              name="table-type"
              
              checked={tableType === "fromScratch" ? true : false}
              value="fromScratch"
              id="1"
            />
            <label htmlFor="1">Create Table From Scratch</label>
            <input
              type="radio"
              name="table-type"
           
              checked={tableType === "copyToCreateTable" ? true : false}
              value="copyToCreateTable"
              id="2"
            />
            <label htmlFor="1">Create Table Copyieng Tabular Data</label>
          </div>
          <div className="col-md-12 column" style={{ overflow: "auto" }}>
            {tableType === "copyToCreateTable" ? (
              <CopyToCreateTable
                handleClose={handleClose}
                reportId={id}
                tableName={tableName} 
              />
            ) : (
              <TableFromScratch
                handleClose={handleClose}
                reportId={id}
                tableName={tableName} 
              />
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
const copyToClipboard = (copyText) => {
  copy(copyText);
  alert(`TABLE COPIED : ${copyText}`);
};
const setSnackbar = ({}) =>{

}
const saveTable = async (reportId, tableName, tableData,handleClose) => {
  console.log("table name..",tableName);
  const data = {
    reportId: reportId,
    name: tableName,
    rowData: tableData,
  };
  console.log("table data",data);
  const res = await createTable(data);
  console.log("...response", res);
  if (res.status === 201) {
    
    handleClose();
  }
  else {
    
  }
};
const TableFromScratch = ({ reportId, handleClose, tableName, }) => {
  const [rows, setRows] = useState([{}]);
  const [columnsArray, setColumnsArray] = useState(["id"]);
  const [finalisedTable, setFinalisedTable] = useState(null);

  const handleAddRow = () => {
    const item = {};
    setRows([...rows, item]);
  };
  const handleAddColumn = () => {
    const columnitem = prompt("Please enter your name", "Column Name");
    setColumnsArray([...columnsArray, columnitem]);
  };

  const postResults = () => {
    let formedTable = "";
    let table = [
      `<table style="border-collapse:collapse;border:1px solid #ccc;">`,
    ];
    let tRows = ["<tr/>"];
    console.log(rows); // there you go, do as you please
    console.log(columnsArray);
    let col = [];
    for (const x of columnsArray) {
      col.push(`<td style="border:1px solid #ccc;padding:.5em;">${x}</td>`);
    }
    tRows.push(col);
    table.push(tRows);
    for (let row of rows) {
      let tempRow = ["<tr/>"];
      console.log(row);
      let colKeys = Object.values(row);
      colKeys.forEach((value) =>
        tempRow.push(
          `<td style="border:1px solid #ccc;padding:.5em;">${value}</td>`
        )
      );
      table.push(tempRow);
    }
    for (let text of table) {
      if (text.length > 1) {
        for (let val of text) {
          if (val.length > 1) {
            for (let vl of val) {
              formedTable = formedTable + vl;
            }
          } else {
            formedTable = formedTable + val;
          }
        }
      } else {
        formedTable = formedTable + text;
      }
    }
    console.log(table);
    console.log("tabular data", formedTable);
    setFinalisedTable(formedTable);
  };
  const handleRemoveSpecificRow = (idx) => {
    const tempRows = [...rows]; // to avoid  direct state mutation
    tempRows.splice(idx, 1);
    setRows(tempRows);
  };

  const handleRemoveSpecificColumn = (idx) => {
    const tempColumns = [...columnsArray]; // to avoid  direct state mutation
    tempColumns.splice(idx, 1);
    setColumnsArray(tempColumns);
  };

  const updateState = (e) => {
    let prope = e.target.attributes.column.value; // the custom column attribute
    let index = e.target.attributes.index.value; // index of state array -rows
    let fieldValue = e.target.value; // value

    const tempRows = [...rows]; // avoid direct state mutation
    const tempObj = rows[index]; // copy state object at index to a temporary object
    tempObj[prope] = fieldValue; // modify temporary object
    // return object to rows` clone
    tempRows[index] = tempObj;
    setRows(tempRows); // update state
  };

  return (
    <>
      <div>
        <table className="table table-bordered table-hover" id="tab_logic">
          <thead>
            <tr>
              <th className="text-center"> # </th>
              {columnsArray.map((column, index) => (
                <th className="text-center" key={index}>
                  {column}{" "}
                  <button onClick={() => handleRemoveSpecificColumn(index)}>
                    x
                  </button>
                </th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                {columnsArray.map((column, index) => (
                  <td key={index}>
                    <input
                      type="text"
                      column={column}
                      value={rows[idx][column]}
                      index={idx}
                      className="form-control"
                      onChange={(e) => updateState(e)}
                    />
                  </td>
                ))}
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemoveSpecificRow(idx)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleAddRow} className="btn btn-primary">
          Add Row
        </button>
        <button onClick={handleAddColumn} className="btn btn-primary">
          Add Column
        </button>
        <button onClick={postResults} className="btn btn-success float-right">
          Generate Table
        </button>
      </div>
      <div style={{ marginTop: "15px" }}>
        {finalisedTable ? (
          <>
            {parse(finalisedTable)}
            <button
              style={{ marginTop: "15px", marginRight: "10px" }}
              onClick={() => {
                tableName
                  ? saveTable(reportId, tableName, finalisedTable,handleClose)
                  : alert("Enter Name");
              }}
            >
              SAVE TABLE
            </button>
            <button
              style={{ marginRight: "10px" }}
              onClick={() => copyToClipboard(finalisedTable)}
            >
              COPY TABLE HTML
            </button>
            {finalisedTable ? (
              <div className="col">
                <h4>Raw output</h4>
                <span>
                  You can copy this code below into wherever you want to use for
                  your website :-
                </span>{" "}
                <hr />
                <pre className="highlight">
                  <code className="language-html">
                    <div className="raw" id="raw">
                      {finalisedTable ? finalisedTable : ""}
                    </div>
                  </code>
                </pre>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
const CopyToCreateTable = ({ reportId, handleClose, tableName, }) => {
  const [data, setData] = useState("");
  const [formTable, setFormTable] = useState(null);
  const generateTable = () => {
    if (!data) {
      alert("please insert the apropriate data");
    } else {
      alert(data);
      let finalTable = "";
      let rows = data.split("\n");
      let table = [
        `<table style="border-collapse:collapse;border:1px solid #ccc;">`,
      ];
      for (let y in rows) {
        let cells = rows[y].split("\t");
        let row = ["<tr/>"];
        for (let x in cells) {
          row.push(
            `<td style="border:1px solid #ccc;padding:.5em;">${cells[x]}</td>`
          );
        }
        table.push(row);
      }
      table.push("</table>");
      for (const x of table) {
        if (x.length > 1) {
          for (const e of x) {
            finalTable = finalTable + e;
          }
        } else {
          finalTable = finalTable + x;
        }
      }
      setFormTable(finalTable);
    }
  };
  return (
    <div>
      <div className="container-fluid mt-4">
        <div className="col">
          <div className="form-group">
            <label htmlFor="exampleTextarea">
              <h4 id="inline-forms">Copy/Paste Excel data here:</h4>
            </label>
            <textarea
              name="excel_data"
              className="form-control"
              rows={8}
              value={data}
              cols={100}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <input
            type="button"
            className="btn btn-primary"
            onClick={() => generateTable()}
            defaultValue="Genereate Table"
          />
        </div>
        <div className="w100 mt-4" />
        <div className="col">
          <h4>Table data will appear below</h4>
          <hr />
          <div id="excel_table">{formTable ? parse(formTable) : ""}</div>
        </div>
        {formTable ? (
          <div style={{ marginTop: "10px" }}>
            <button
              style={{ marginRight: "10px" }}
              onClick={() => {
                tableName
                  ? saveTable(reportId, tableName, formTable,handleClose)
                  : alert("Enter Name");
              }}
            >
              SAVE
            </button>
            <button style={{ marginLeft: "10px" }} onClick={handleClose}>
              CANCEL
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="w100 mt-4" />
        {formTable ? (
          <div className="col">
            <h4>Raw output</h4>
            <span>
              You can copy this code below into wherever you want to use for
              your website :-
            </span>{" "}
            <button onClick={() => copyToClipboard(formTable)}>
              COPY TABLE HTML
            </button>
            <hr />
            <pre className="highlight">
              <code className="language-html">
                <div className="raw" id="raw">
                  {formTable ? formTable : ""}
                </div>
              </code>
            </pre>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default TableUpload;
