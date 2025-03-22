function ClearInput({ onClick }) {
  return (
    <button
      className="clear-input no-print"
      style={{
        position: 'absolute',
        color: 'red',
        margin: '0',
        padding: '0',
        border: 'none',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: '8px',
      }}
      title="clear input"
      onClick={onClick}
    >
      ✖
    </button>
  );
}

export default function Input({
  type,
  value,
  required,
  disabled,
  onChange,
  onClear,
}) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <input
        type={type}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange}
      />
      {value && !disabled && <ClearInput onClick={onClear} />}
    </div>
  );
}
