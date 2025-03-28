import { useState } from 'react';
import Input from './Input';

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

  const clear = (property) => {
    setPerson({ ...person, [property]: '' });
  };

  return (
    <>
      {(isEditing || !personIsEmpty) && (
        <section className="personal">
          <h2>Personal</h2>
          {[
            ['Name', 'text'],
            ['Email', 'email'],
            ['Phone', 'tel'],
          ].map((value, index) => {
            const lowerVal = value[0].toLowerCase();
            return isEditing || (!isEditing && person[lowerVal]) ? (
              <label key={lowerVal}>
                {value[0]}
                <Input
                  type={value[1]}
                  value={person[lowerVal]}
                  required={false}
                  focus={index === 0 && true}
                  disabled={!isEditing}
                  onChange={(e) => update(e, lowerVal)}
                  onClear={() => clear(lowerVal)}
                />
              </label>
            ) : null;
          })}
        </section>
      )}
    </>
  );
}
