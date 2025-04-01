import TableItems from './TableItems';

export default function Practical({ isEditing }) {
  const properties = [
    ['Company Name'],
    ['Position'],
    ['Responsibilities', 'textarea'],
    ['Date From', 'date'],
    ['Date To', 'date'],
  ];

  return (
    <section className="practical">
      <h2>Practical</h2>
      <TableItems
        properties={properties}
        className={'practical-items'}
        isEditing={isEditing}
      />
    </section>
  );
}
