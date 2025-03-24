import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Input from './Input';

export default function TableItems({ properties, isEditing }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState(properties.map(() => ['']));
  const [isAdding, setIsAdding] = useState(false);

  const updateNewItem = (event, index) => {
    const input = event.target;
    setNewItem(
      newItem.map((val, i) => (index === i ? [input.value, input.type] : val))
    );
  };

  const saveItem = () => {
    const emptyIndex = newItem.findIndex((item) => !item[0]);
    if (emptyIndex !== -1) {
      return alert(`${properties[emptyIndex][0]} cannot be empty`);
    }

    setItems([...items, { id: uuid(), values: newItem }]);
    setNewItem(properties.map(() => ['']));
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
                    <Input
                      type={value[1]}
                      value={value[0]}
                      required={true}
                      disabled={false}
                      isEditing={isEditing}
                      onChange={(e) => updateItem(e, item.id, index)}
                      onClear={() =>
                        updateItem({ target: { value: '' } }, item.id, index)
                      }
                    />
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
                <td key={index} style={{ position: 'relative' }}>
                  <Input
                    type={property.length > 1 ? property[1] : 'text'}
                    value={newItem[index][0]}
                    required={true}
                    focus={index === 0}
                    isEditing={isEditing}
                    onChange={(e) => updateNewItem(e, index)}
                    onClear={(e) =>
                      updateNewItem(
                        {
                          target: { value: '', type: e.target.type },
                        },
                        index
                      )
                    }
                  />
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
