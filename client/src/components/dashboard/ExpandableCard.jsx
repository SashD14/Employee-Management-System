import "../../styles/expandableCard.css";
import { motion } from "motion/react";
function ExpandableCard({
  children,
  onClose,
  layoutId,
}) {
  return (
    <div className="overlay" onClick={onClose}>
     <motion.div
        layout
        layoutId={layoutId}
        className="expanded-card"
        onClick={(e) => e.stopPropagation()}
        initial={{
            opacity: 0,
            scale: 0.9,
        }}
        animate={{
            opacity: 1,
            scale: 1,
        }}
        exit={{
        opacity: 0,
        scale: 0.9,
        }}
        transition={{
        type: "spring",
        stiffness: 180,
        damping: 20,
        }}
                    >
        {children}
      </motion.div>
    </div>
  );
}

export default ExpandableCard;