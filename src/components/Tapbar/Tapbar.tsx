import { useEffect, useState } from "react";

import comments from "../../assets/icons/icon.Comments.svg";
import heart from "../../assets/icons/icon.Heart.svg";
import pageUp from "../../assets/icons/icon.PageUp.svg";
import share from "../../assets/icons/icon.Share.svg";
import { SCROLL_DELTA } from "../../constants/constants";
import Message from "../Message/Message";
import Modal from "../Modal/Modal";
import styles from "./Tapbar.module.scss";

const Tapbar = ({ scrollUp }: { scrollUp: () => void }) => {
  const [likesCount, setLikesCount] = useState(0);
  const [commentCount, setCommentsCount] = useState(0);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(window.scrollY);
  const [scrollTimeout, setScrollTimeout] = useState<number>(0);
  const [isCopied, setIsCopied] = useState(false);
  const shareUrl = window.location.href;

  const handleShare = async (url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Поделиться страницей",
          url: url,
        });
      } catch (error) {
        console.log("Unable to share");
      }
    } else {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    }
  };
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const timeoutId = setTimeout(() => {
      setIsHidden(false);
    }, 1000);
    const scrollDifference = Math.abs(currentScrollPos - prevScrollPos);

    if (scrollDifference >= SCROLL_DELTA) {
      setIsHidden(true);
    } else {
      setScrollTimeout(timeoutId);
    }

    if (currentScrollPos - prevScrollPos < 0) {
      setIsHidden(false);
    }

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    setTimeout(() => {
      setPrevScrollPos(currentScrollPos);
    }, 300);
  };

  useEffect(() => {
    window.onscroll = handleScroll;

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [prevScrollPos]);

  return (
    <>
      <div className={`${styles.tapbar} ${isHidden ? styles.hidden : ""}`}>
        <nav className={styles.tapbar_nav}>
          <button
            className={styles.tapbar_nav_button}
            onClick={() => {
              handleShare(shareUrl);
            }}
          >
            <img src={share} alt="share" />
          </button>

          <button className={styles.tapbar_nav_button} onClick={scrollUp}>
            <img src={pageUp} alt="scrollUp" />
          </button>
          <button
            className={styles.tapbar_nav_button}
            onClick={() => setLikesCount((prev) => prev + 1)}
          >
            <img src={heart} alt="like" />
            <span className={styles.tapbar_nav_button_likes}>{likesCount}</span>
          </button>
          <button
            className={styles.tapbar_nav_button}
            onClick={() => setCommentsCount((prev) => prev + 1)}
          >
            <img src={comments} alt="comment" />
            <span className={styles.tapbar_nav_button_likes}>
              {commentCount}
            </span>
          </button>
        </nav>
      </div>
      {isCopied && (
        <Modal>
          <Message />
        </Modal>
      )}
    </>
  );
};

export default Tapbar;
