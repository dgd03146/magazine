import React, { useEffect } from 'react';
import styles from './Posts.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Post from './Post';
import { getAllPosts } from '../../redux/posts-slice';

const Posts = () => {
  let dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

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
