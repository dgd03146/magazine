import React from 'react';
import styles from './Post.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Post = ({ title, id, content, likes, image, user_id, created_time }) => {
  return (
    <li className={styles.post}>
      <div className={styles.leftContainer}>
        <div className={styles.topBox}>
          <p>{user_id}</p>
          <p>{created_time}</p>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <hr />
        <p className={styles.content}>{content}</p>
        <button className={styles.detail}>Read More</button>
        <div className={styles.downBox}>
          <div className={styles.downLeftBox}>
            <span>좋아요 {likes}개</span>
            <span>댓글 0개</span>
          </div>
          <button className={styles.likes}>
            <FavoriteBorderIcon />
          </button>
        </div>
      </div>
      <div className={styles.rightBox}>
        <img className={styles.image} src={image} alt="player" />
      </div>
    </li>
  );
};

export default Post;
