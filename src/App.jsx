import React from "react";
import { MdDeleteForever, MdSearch } from "react-icons/md";
export default function Todo() {
  const [newitem, setNewitem] = React.useState("");
  const [list, setList] = React.useState([]);
  const addItem = (value) => {
    const newItem = {
      id: list.length + 1,
      value,
      isDone: false,
      editable: false,
    };
    setNewitem("");
    setList((prev) => [...prev, newItem]);
  };

  const deleteItem = (id) => {
    alert(id);
    const updatedlist = [...list].filter((item) => item.id !== id); //list er j element id er sathe match korbe seta chere baki sob dekhao
    setList(updatedlist);
  };
  const updateItemValue = (id, newValue) => {
    const updatedList = list.map((todo) => {
      if (todo.id === id) {
        return { ...todo, value: newValue };
      }

      return todo;
    });

    setList(updatedList);
  };

  const onCheck = (id) => {
    const updatedList = list.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone, editable: !todo.editable };
      }
      return todo;
    });
    setList(updatedList);
  };
  const searchStyle = {
    background: "white",
    input: {
      border: "2px solid transparent",
    },
    container: {
      background: "yellow",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "10px",
      margin: "auto auto",
    },
    list: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      listStyle: "upper-roman",
      color: list.length > 0 ? "white" : "black",
      background: list.length > 0 ? "red" : "yellow",
    },
  };
  console.log(list);
  return (
    <div style={searchStyle.container}>
      <div style={searchStyle}>
        <MdSearch />
        <input
          type="text"
          style={searchStyle["input"]}
          placeholder="add item..."
          required
          value={newitem}
          onChange={(e) => setNewitem(e.target.value)}
        />
      </div>
      <button
        clasName="add-btn"
        onClick={() => addItem(newitem)}
        disabled={!newitem}
      >
        Add Todo
      </button>
      <div>
        <ul style={searchStyle.list}>
          {list.length > 0 ? (
            list.map((item) => (
              <li key={item.id}>
                <input
                  type="checkbox"
                  checked={item.isDone}
                  onChange={() => onCheck(item.id)}
                />
                <span
                  contentEditable={item.editable}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => updateItemValue(item.id, e.target.textContent)}
                >
                  {item.value}
                </span>
                <button className="btn" onClick={() => deleteItem(item.id)}>
                  <MdDeleteForever size="1.2em" />
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p>Please add item</p>
          )}
        </ul>
      </div>
    </div>
  );
}
