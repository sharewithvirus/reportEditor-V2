import React, { useState } from "react";

const TableUpload = () => {
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
      <div className="container">
        <div className="row clearfix">
          <div className="col-md-12 column">
            <table className="table table-bordered table-hover" id="tab_logic">
              <thead>
                <tr>
                  <th className="text-center"> # </th>
                  {columnsArray.map((column, index) => (
                    <th className="text-center" key={index}>
                      {column}  <span onClick={() => handleRemoveSpecificColumn(index)}>x</span>
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
            <button
              onClick={postResults}
              className="btn btn-success float-right"
            >
              Save Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableUpload;
