import "../../styles/leaveSearch.css";

function LeaveSearch({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="leave-search">
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

export default LeaveSearch;