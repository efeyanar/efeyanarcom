import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const SectionWrapper = ({ children, id, className }: Props) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0.2, filter: "blur(8px)", y: 20 }}
      whileInView={{ 
        opacity: 1, 
        filter: "blur(0px)", 
        y: 0 
      }}
      viewport={{ once: false, amount: 0.2, margin: "-100px 0px" }}
      transition={{ 
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};