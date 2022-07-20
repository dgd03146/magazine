import React from 'react';
import styles from './Posts.module.css';
import { useSelector } from 'react-redux';
import Post from './Post';

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  console.log(posts);

  return (
    <ul className={styles.posts}>
      {Object.keys(posts).map((key) => {
        const post = posts[key];
        return (
          <Post
            key={key}
            id={post.id}
            content={post.content}
            title={post.title}
            likes={post.likes}
            image={post.image}
            comment={post.comment}
          />
        );
      })}
    </ul>
  );
};

export default Posts;
