import TableItems from './TableItems';

export default function Practical({ isEditing }) {
  const properties = [
    ['Company Name'],
    ['Position'],
    ['Responsibilities'],
    ['Date From', 'date'],
    ['Date To', 'date'],
  ];

  return (
    <section className="practical">
      <h2>Practical</h2>
      <TableItems properties={properties} isEditing={isEditing} />
    </section>
  );
}
