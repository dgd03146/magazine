import React from 'react';
import styles from './Posts.module.css';
import { useSelector } from 'react-redux';
import Post from './Post';

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);

  return (
    <ul className={styles.posts}>
      {posts.map((it) => {
        return (
          <Post
            key={it.id}
            id={it.id}
            content={it.content}
            title={it.title}
            likes={it.likes}
            image={it.image}
            comment={it.comment}
            user_id={it.user_id}
            created_time={it.created_time}
          />
        );
      })}
    </ul>
  );
};

export default Posts;
