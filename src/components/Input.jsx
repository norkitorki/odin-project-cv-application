function ClearInput({ onClick }) {
  const show = (event) => (event.target.style.opacity = 1);
  const hide = (event) => (event.target.style.opacity = 0.33);

  return (
    <button
      className="clear-input no-print"
      style={{
        position: 'absolute',
        opacity: '0.33',
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
      onFocus={show}
      onBlur={hide}
      onPointerEnter={show}
      onPointerLeave={hide}
    >
      ✖
    </button>
  );
}

export default function Input({
  className,
  type,
  value,
  required,
  autoFocus,
  disabled,
  onChange,
  onClear,
}) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {type === 'textarea' ? (
        <textarea
          className={className}
          value={value}
          required={required}
          placeholder={required ? 'Please fill out this field' : ''}
          autoFocus={autoFocus}
          onChange={onChange}
        />
      ) : (
        <input
          className={className}
          type={type}
          value={value}
          required={required}
          placeholder={required ? 'Please fill out this field' : ''}
          autoFocus={autoFocus}
          disabled={disabled}
          onChange={onChange}
        />
      )}
      {value && !disabled && <ClearInput onClick={onClear} />}
    </div>
  );
}
