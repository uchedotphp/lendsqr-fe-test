import styles from "./card.module.scss";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}
const Card = ({ children, className }: CardProps) => {
  return (
    <section className={`${styles.card} ${className}`}>{children}</section>
  );
};

export default Card;
