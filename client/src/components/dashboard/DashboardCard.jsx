import "../../styles/dashboardCard.css";
import { motion } from "motion/react";

function DashboardCard(props) {
  return (
       <motion.div
          layout
          layoutId={props.layoutId}
          className="card"
          onClick={props.onClick}
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.98,
          }}
          transition={{
            duration: 0.2,
          }}
        >
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
    </motion.div>
  );
}

export default DashboardCard;