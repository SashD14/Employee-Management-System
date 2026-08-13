import "../../styles/card.css";

function Card(props) {
  return (
    <div className="card">
      <div className="card-header">
        {props.icon}
        <h3>{props.title}</h3>
      </div>

      <div className="card-body">
        <h1>{props.count}</h1>

        <p className={props.positive ? "green" : "red"}>
          {props.positive ? "+" : "-"}
          {props.change}
        </p>
      </div>
    </div>
  );
}

export default Card;