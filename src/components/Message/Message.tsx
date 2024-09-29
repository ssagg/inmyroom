import styles from "./Message.module.scss";

const Message = () => {
  return (
    <div className={styles.message}>
      <p>Ссылка скопирована в буфер обмена</p>
    </div>
  );
};

export default Message;
