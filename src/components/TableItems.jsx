import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export default function TableItems({ properties, isEditing }) {
  const [items, setItems] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const newValues = properties.map(() => [null]);

  const updateNewValues = (event, index) => {
    const input = event.target;
    newValues[index] = [input.value, input.type];
  };

  const saveItem = () => {
    const emptyIndex = newValues.findIndex((item) => !item[0]);
    if (emptyIndex !== -1) {
      return alert(`${properties[emptyIndex][0]} cannot be empty`);
    }

    setItems([...items, { id: uuid(), values: newValues }]);
    setIsAdding(false);
  };

  const updateItem = (event, id, index) => {
    setItems(
      items.map((item) => {
        if (item.id === id) item.values[index][0] = event.target.value;
        return item;
      })
    );
  };

  const removeItem = (id) => {
    const confirmation = confirm('Are you sure?');
    if (confirmation) setItems(items.filter((item) => item.id !== id));
  };

  const sortItems = (event) => {
    const index = event.target.value;
    if (index < 0) return;

    setItems(
      items.toSorted((a, b) =>
        a.values[index][0].localeCompare(b.values[index][0])
      )
    );
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            {properties.map((property, index) => (
              <th key={index}>{property[0]}</th>
            ))}
            {isEditing && items.length > 1 && (
              <th className="no-print">
                Sort ASC by
                <select style={{ marginLeft: '5px' }} onChange={sortItems}>
                  <option value={-1}></option>
                  {properties.map((property, index) => (
                    <option key={index} value={index}>
                      {property[0]}
                    </option>
                  ))}
                </select>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {item.values.map((value, index) => (
                <td key={index}>
                  {isEditing ? (
                    <input
                      type={value[1]}
                      onChange={(e) => updateItem(e, item.id, index)}
                      defaultValue={value[0]}
                    ></input>
                  ) : (
                    value[0]
                  )}
                </td>
              ))}
              {items.length > 0 && isEditing && (
                <td>
                  <button
                    title="delete item"
                    style={{ border: 'none', color: 'red', cursor: 'pointer' }}
                    onClick={() => removeItem(item.id)}
                  >
                    ✘
                  </button>
                </td>
              )}
            </tr>
          ))}
          {isAdding && (
            <tr className="new-item">
              {properties.map((property, index) => (
                <td key={index}>
                  <input
                    autoFocus={index === 0 ? true : false}
                    required
                    type={property.length > 1 ? property[1] : 'text'}
                    onChange={(e) => updateNewValues(e, index)}
                  ></input>
                </td>
              ))}
              <td>
                <button
                  title="save item"
                  style={{ border: 'none', color: 'green', cursor: 'pointer' }}
                  onClick={saveItem}
                >
                  ✔
                </button>
                <button
                  title="cancel item adding"
                  style={{ border: 'none', color: 'red', cursor: 'pointer' }}
                  onClick={() => setIsAdding(false)}
                >
                  ✘
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!isAdding && (
        <button
          className="no-print"
          style={{ border: 'none', cursor: 'pointer' }}
          title="add item"
          onClick={() => setIsAdding(true)}
        >
          ✚
        </button>
      )}
    </>
  );
}
