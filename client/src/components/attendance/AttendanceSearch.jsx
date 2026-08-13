import "../../styles/attendanceSearch.css";

function AttendanceSearch({ searchTerm, setSearchTerm }) {
  return (
    <div className="attendance-search">

      <input
        type="text"
        placeholder="Search employee..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />

    </div>
  );
}

export default AttendanceSearch;