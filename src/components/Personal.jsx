import { useState } from 'react';

function Input({ type, value, isEditing, onChange }) {
  return (
    <input
      type={type}
      value={value}
      disabled={!isEditing}
      onChange={onChange}
      style={
        !isEditing
          ? {
              color: 'inherit',
              border: 'none',
            }
          : {}
      }
    />
  );
}

export default function Personal({ isEditing }) {
  const [person, setPerson] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const personIsEmpty = Object.values(person).join('') === '';

  const update = (event, property) => {
    setPerson({ ...person, [property]: event.target.value });
  };

  return (
    <>
      {(isEditing || !personIsEmpty) && (
        <section className="personal">
          <h2>Personal</h2>
          {(isEditing || (!isEditing && person.name)) && (
            <label>
              Name
              <Input
                type="text"
                value={person.name}
                isEditing={isEditing}
                onChange={(e) => update(e, 'name')}
              />
            </label>
          )}
          {(isEditing || (!isEditing && person.email)) && (
            <label>
              Email
              <Input
                type="email"
                value={person.email}
                isEditing={isEditing}
                onChange={(e) => update(e, 'email')}
              />
            </label>
          )}
          {(isEditing || (!isEditing && person.phone)) && (
            <label>
              Phone
              <Input
                type="tel"
                value={person.phone}
                isEditing={isEditing}
                onChange={(e) => update(e, 'phone')}
              />
            </label>
          )}
        </section>
      )}
    </>
  );
}
