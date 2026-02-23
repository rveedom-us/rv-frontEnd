export default function Input({
  label,
  placeholder,
  name,
  type,
  data,
  state,
  disabled = false,
  required = false,
}) {
  const error = state?.errors?.[name] || state?.errors;
  const value = state?.value?.[name] || state?.value || data;

  return (
    <div>
      <label className="block font-medium text-lg " htmlFor={name}>
        {label}
      </label>
      <input
        className={`w-full border bg-[#0a1626] ${
          error ? "border-red-500" : "border-gray-800"
        } rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-500`}
        placeholder={placeholder}
        name={name}
        id={name}
        type={type}
        defaultValue={value}
        disabled={disabled}
        required={required}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
