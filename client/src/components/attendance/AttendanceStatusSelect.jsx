import "../../styles/attendanceStatusSelect.css";


function AttendanceStatusSelect({
  value,
  onChange,
}) {

  /*
   * "Not Marked" means that no attendance
   * record exists yet for this employee
   * and selected date.
   *
   * It is displayed in the dropdown only
   * as the current value.
   *
   * HR can then choose an actual status.
   */


  return (

    <select
      className="attendance-status-select"
      value={
        value === "Not Marked"
          ? ""
          : value
      }
      onChange={(e) =>
        onChange(e.target.value)
      }
    >

      {value === "Not Marked" && (
        <option
          value=""
          disabled
        >
          Not Marked
        </option>
      )}


      <option value="Present">
        Present
      </option>

      <option value="Absent">
        Absent
      </option>

      <option value="Leave">
        Leave
      </option>

      <option value="Half Day">
        Half Day
      </option>

    </select>

  );
}


export default AttendanceStatusSelect;