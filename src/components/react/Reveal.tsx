import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  class?: string;
}

export const Reveal = ({ children, width = "fit-content", className, class: astroClass }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className || astroClass}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};