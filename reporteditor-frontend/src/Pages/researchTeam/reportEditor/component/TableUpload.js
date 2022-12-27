import React, { useState } from "react";

const TableUpload = () => {
  const [tableType, setTableType] = useState("fromScratch");
  console.log(".....", tableType);
  return (
    <div>
      <div className="container">
        <div className="row clearfix">
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
            <label for="1">Create Table From Scratch</label>
            <input
              type="radio"
              name="table-type"
              checked={tableType === "copyToCreateTable" ? true : false}
              value="copyToCreateTable"
              id="2"
            />
            <label for="1">Create Table Copyieng Tabular Data</label>
          </div>
          <div className="col-md-12 column" style={{ overflow: "auto" }}>
            {tableType === "copyToCreateTable" ? (
              <CopyToCreateTable />
            ) : (
              <TableFromScratch />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TableFromScratch = () => {
  const [rows, setRows] = useState([{}]);
  const [columnsArray, setColumnsArray] = useState(["id"]);

  const handleAddRow = () => {
    const item = {};
    setRows([...rows, item]);
  };

  const handleAddColumn = () => {
    const columnitem = prompt("Please enter your name", "Column Name");
    setColumnsArray([...columnsArray, columnitem]);
  };

  const postResults = () => {
    console.log(rows); // there you go, do as you please
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
        Save Results
      </button>
    </div>
  );
};
const CopyToCreateTable = () => {
  const [data, setData] = useState("");
  const generateTable = () => {
    if (!data) {
      alert("please insert the apropriate data");
    } else {
      alert(data);
      
      let rows = data.split("\n");

      let table = (`<table style="border-collapse:collapse;border:1px solid #ccc;" />`);

      for(let y in rows) {
         let cells = rows[y].split("\t");
          let row = ('<tr />');
          for(let x in cells) {
              row.append(`<td style="border:1px solid #ccc;padding:.5em;>+${cells[x]}+</td>`);
          }
          table.append(row);
      }

      // // Insert into DOM
      // ('#excel_table').html(table);

      // // add class this and that
      // //$( "tr:first td" ).attr( "class", "lightgray" );
      // ( "table" ).attr( "class", "table" );

      // //replace first row of td with th :-)
      // ("tr:first-child td").replaceWith(function() {
      //     return `<th style='background-color:#5B9BD5;color:#fff;border:0px solid #ccc;padding:.5em;'> + ${this.innerHTML} + </th>`;
      // });

      // // RAW output so you can copy paste to your project :-)
      // ("#raw").text(("#excel_table").html());
      // ("#raw").html(("#raw").html().replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;'));
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
              rows={4}
              value={data}
              defaultValue={""}
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
          <div id="excel_table" />
        </div>
        <div className="w100 mt-4" />
        <div className="col">
          <h4>Raw output</h4>
          <span>
            You can copy this code below into your Wordpress or whatever you use
            for your website :-
          </span>
          <hr />
          <pre className="highlight">
            <code className="language-html">
              <div className="raw" id="raw" />
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
export default TableUpload;
