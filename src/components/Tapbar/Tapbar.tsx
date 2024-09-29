import React, { useEffect, useState } from "react";

import comments from "../../assets/icons/icon.Comments.svg";
import heart from "../../assets/icons/icon.Heart.svg";
import pageUp from "../../assets/icons/icon.PageUp.svg";
import share from "../../assets/icons/icon.Share.svg";
import Modal from "../Modal/Modal";
import Social from "../Social/Social";
import styles from "./Tapbar.module.scss";

const Tapbar = ({ scrollUp }: { scrollUp: () => void }) => {
  const [likesNum, setLikes] = useState(0);
  const [commentsNum, setComments] = useState(0);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
    setIsModalOpen(false);
    const currentScrollPos = window.scrollY;
    const timeoutId = setTimeout(() => {
      setIsHidden(false);
    }, 1000);
    const scrollDifference = Math.abs(currentScrollPos - prevScrollPos);

    if (scrollDifference >= 200) {
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
              setIsModalOpen(!isModalOpen);
              handleShare(shareUrl);
            }}
          >
            <img src={share} alt="share" />
            {isModalOpen && (
              <Modal>
                <Social />
              </Modal>
            )}
          </button>

          <button className={styles.tapbar_nav_button} onClick={scrollUp}>
            <img src={pageUp} alt="scrollUp" />
          </button>
          <button
            className={styles.tapbar_nav_button}
            onClick={() => setLikes(likesNum + 1)}
          >
            <img src={heart} alt="like" />
            <span className={styles.tapbar_nav_button_likes}>{likesNum}</span>
          </button>
          <button
            className={styles.tapbar_nav_button}
            onClick={() => setComments(commentsNum + 1)}
          >
            <img src={comments} alt="comment" />
            <span className={styles.tapbar_nav_button_likes}>
              {commentsNum}
            </span>
          </button>
        </nav>
      </div>
      {isCopied && (
        <div className={styles.copied_overlay}>
          <div className={styles.copied_message}>
            <p>Ссылка скопирована в буфер обмена</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Tapbar;
