import { useState } from 'react';
import Personal from './components/Personal';
import Education from './components/Education';
import Practical from './components/Practical';

export default function App() {
  const [isEditing, setIsEditing] = useState(true);

  return (
    <>
      <header className="no-print">
        <nav>
          <button onClick={() => setIsEditing(!isEditing)}>
            📝 {isEditing ? 'Save' : 'Edit'}
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setTimeout(() => print(), 1);
            }}
          >
            📜 Print
          </button>
        </nav>
      </header>
      <h1>CV Application</h1>
      <main>
        <Personal isEditing={isEditing} />
        <Education isEditing={isEditing} />
        <Practical isEditing={isEditing} />
      </main>
    </>
  );
}
