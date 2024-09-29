import telegram from "../../assets/icons/icon.Fb.svg";
import facebook from "../../assets/icons/icon.Tg.svg";
import whatsapp from "../../assets/icons/icon.Wh.svg";
import styles from "./Social.module.scss";

const Social = () => {
  return (
    <ul className={styles.social_list}>
      <li>
        <img
          src={facebook}
          className={styles.social_list_icon}
          alt="facebook"
        />
      </li>
      <li>
        <img
          src={whatsapp}
          className={styles.social_list_icon}
          alt="whatsapp"
        />
      </li>
      <li>
        <img
          src={telegram}
          className={styles.social_list_icon}
          alt="telegram"
        />
      </li>
    </ul>
  );
};

export default Social;
