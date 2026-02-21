import React from "react";
import "./Table.css";

const Table = ({ data, columns, onAdd, title }) => {
  return (
    <div className="table-container">
      <div className="table-header">
        <h2>{title}</h2>
        <button className="add-button" onClick={onAdd}>
          <span className="plus-icon">+</span>
          Add New
        </button>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id || index}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
