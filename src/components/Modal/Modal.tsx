import styles from "./Modal.module.scss";

type TModal = {
  children: React.ReactNode;
};

const Modal = ({ children }: TModal) => {
  return <div className={styles.modal}>{children}</div>;
};

export default Modal;
