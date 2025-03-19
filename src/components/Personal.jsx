import { useState } from 'react';

function Input({ type, value, isEditing, onChange }) {
  return (
    <input
      required
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
    name: 'John Doe',
    email: 'johndoe@mail.com',
    phone: '353254643',
  });

  const update = (event, property) => {
    setPerson({ ...person, [property]: event.target.value });
  };

  return (
    <section className="personal">
      <h2>Personal</h2>
      <label>
        Name
        <Input
          type="text"
          value={person.name}
          isEditing={isEditing}
          onChange={(e) => update(e, 'name')}
        />
      </label>
      <label>
        Email
        <Input
          type="email"
          value={person.email}
          isEditing={isEditing}
          onChange={(e) => update(e, 'email')}
        />
      </label>
      <label>
        Phone
        <Input
          type="tel"
          value={person.phone}
          isEditing={isEditing}
          onChange={(e) => update(e, 'phone')}
        />
      </label>
    </section>
  );
}
