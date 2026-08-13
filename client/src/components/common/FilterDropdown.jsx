import "../../styles/filterDropdown.css";

function FilterDropdown({
  value,
  setValue,
  options,
}) {
  return (
    <select
      value={value}
      onChange={(e) =>
        setValue(e.target.value)
      }
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  );
}

export default FilterDropdown;