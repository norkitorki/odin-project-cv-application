import TableItems from './TableItems';

export default function Education({ isEditing }) {
  const properties = [
    ['School/University'],
    ['Title of Study'],
    ['Length of Stay'],
  ];

  return (
    <section className="education">
      <h2 style={{ padding: '1rem 0' }}>Education</h2>
      <TableItems
        properties={properties}
        className={'education-items'}
        isEditing={isEditing}
      />
    </section>
  );
}
