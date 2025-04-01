import { Fragment, useState } from 'react';
import { v4 as uuid } from 'uuid';
import MediaQuery from 'react-responsive';
import Input from './Input';

function SortSelect({ properties, onChange }) {
  return (
    <>
      <span style={{ fontWeight: 'bold' }}>Sort ASC by</span>
      <select style={{ marginLeft: '5px' }} onChange={onChange}>
        <option value={-1}></option>
        {properties.map((property, index) => (
          <option key={property[0]} value={index}>
            {property[0]}
          </option>
        ))}
      </select>
    </>
  );
}

function ItemAddButtons({ onSave, onReset }) {
  return (
    <>
      <button
        title="save item"
        style={{ border: 'none', color: 'green', cursor: 'pointer' }}
        onClick={onSave}
      >
        ✔
      </button>
      <button
        title="cancel item adding"
        style={{ border: 'none', color: 'red', cursor: 'pointer' }}
        onClick={onReset}
      >
        ✘
      </button>
    </>
  );
}

export default function TableItems({ properties, className, isEditing }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState(properties.map(() => ['']));
  const [isAdding, setIsAdding] = useState(false);

  const resetNewItem = () => setNewItem(properties.map(() => ['']));

  const updateNewItem = (event, index) => {
    const input = event.target;
    setNewItem(
      newItem.map((val, i) => (index === i ? [input.value, input.type] : val))
    );
  };

  const saveItem = () => {
    const emptyIndex = newItem.findIndex((item) => !item[0]);
    if (emptyIndex >= 0) {
      document
        .querySelector(`.${className} .new-item .input-${emptyIndex}`)
        .focus();
      return alert(`${properties[emptyIndex][0]} cannot be empty`);
    }

    setItems([...items, { id: uuid(), values: newItem }]);
    resetNewItem();
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
    <div className={className}>
      <MediaQuery maxWidth={780}>
        {isEditing && items.length > 1 && (
          <div style={{ margin: '0.5rem 0 ' }}>
            <SortSelect properties={properties} onChange={sortItems} />
          </div>
        )}
        {items.map((item, itemIndex) => (
          <Fragment key={item.id}>
            {itemIndex > 0 && <hr />}
            <table>
              <tbody>
                {item.values.map((value, index) => (
                  <tr key={index} style={{ textAlign: 'center' }}>
                    <th>{properties[index][0]}</th>
                    <td style={{ width: '100%' }}>
                      {isEditing ? (
                        <Input
                          type={value[1]}
                          value={value[0]}
                          required={true}
                          isEditing={isEditing}
                          onChange={(e) => updateItem(e, item.id, index)}
                          onClear={() =>
                            updateItem(
                              { target: { value: '' } },
                              item.id,
                              index
                            )
                          }
                        />
                      ) : (
                        value[0]
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Fragment>
        ))}
        {isAdding && (
          <ul className="new-item" style={{ marginTop: '0.5rem' }}>
            {properties.map((property, index) => {
              return (
                <li
                  key={property[0]}
                  style={{ marginBottom: '1rem', textAlign: 'center' }}
                >
                  <label style={{ textAlign: 'center' }}>
                    <span style={{ display: 'block', marginBottom: '0.5rem' }}>
                      {property[0]}
                    </span>
                    <Input
                      className={`input-${index}`}
                      type={property.length > 1 ? property[1] : 'text'}
                      value={newItem[index][0]}
                      required={true}
                      autoFocus={index === 0}
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
                  </label>
                </li>
              );
            })}
            <li style={{ textAlign: 'center', marginTop: '1rem' }}>
              <ItemAddButtons
                onSave={saveItem}
                onReset={() => {
                  resetNewItem();
                  setIsAdding(false);
                }}
              />
            </li>
          </ul>
        )}
      </MediaQuery>
      <MediaQuery minWidth={781}>
        <table>
          <thead>
            <tr>
              {properties.map((property) => (
                <th key={property[0]}>{property[0]}</th>
              ))}
              {isEditing && items.length > 1 && (
                <th className="no-print">
                  <SortSelect properties={properties} onChange={sortItems} />
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
                      style={{
                        border: 'none',
                        color: 'red',
                        cursor: 'pointer',
                      }}
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
                  <td key={property[0]}>
                    <Input
                      className={`input-${index}`}
                      type={property.length > 1 ? property[1] : 'text'}
                      value={newItem[index][0]}
                      required={true}
                      autoFocus={index === 0}
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
                  <ItemAddButtons
                    onSave={saveItem}
                    onReset={() => {
                      resetNewItem();
                      setIsAdding(false);
                    }}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </MediaQuery>
      {!isAdding && (
        <button
          className="add-item-btn no-print"
          style={{ border: 'none', cursor: 'pointer' }}
          title="add item"
          onClick={() => setIsAdding(true)}
        >
          ✚
        </button>
      )}
    </div>
  );
}
