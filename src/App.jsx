import { useState } from "react";

const App = () => {
  const initial = {
    name: "",
    quantity: 0,
    rating: 0,
  };
  const [items, setItems] = useState([]);
  const [newItems, setNewItems] = useState(initial);
  const [update, setUpdate] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setNewItems((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (update && editIndex !== null) {
      //first way
      // const updatedItems = [...items];
      // updatedItems[editIndex] = newItems;
      // setItems(updatedItems);

      //second way
      // const updatedData =
      //   items.length > 0 &&
      //   items.map((item, index) => (index === editIndex ? newItems : item));

      //third way
      const updatedData = items.map((item, index) => {
        if (index === editIndex) {
          return { ...item, newItems };
        }
        return item;
      });
      setItems(updatedData);
      setUpdate(false);
      setNewItems(initial);
    } else {
      setItems([...items, newItems]);
      setNewItems(initial);
    }
  };
  const handleDelete = (id) => {
    const deletedData =
      items.length > 0 &&
      items.filter((elem, index) => {
        return index !== id;
      });

    setItems(deletedData);
  };

  const handleUpdate = (id) => {
    // setUpdate(true);
    // const updatedData =
    //   items.length > 0 && items.find((elem, index) => index === id);
    // setNewItems(updatedData);
    //new
    setEditIndex(id);
    setUpdate(true);
    setNewItems(items[id]);
  };
  return (
    <div>
      <input name="name" value={newItems.name} onChange={handleChange} />
      <input
        name="quantity"
        value={newItems.quantity}
        onChange={handleChange}
      />
      <input name="rating" value={newItems.rating} onChange={handleChange} />

      <button onClick={handleSubmit}>{update ? "Update" : "Add"}</button>

      {items.length > 0 &&
        items.map((elem, index) => {
          return (
            <div key={index}>
              <p>
                <span style={{ marginRight: "20px" }}>
                  Product Name: {elem.name}
                </span>
                <span style={{ marginRight: "20px" }}>
                  Quantity: {elem.quantity}
                </span>
                <span style={{ marginRight: "20px" }}>Rating{elem.rating}</span>
                <span
                  style={{ marginRight: "20px" }}
                  onClick={() => handleUpdate(index)}
                >
                  Edit
                </span>
                <span
                  style={{ marginRight: "20px" }}
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </span>
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default App;
