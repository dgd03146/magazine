import React from 'react';
import styles from './Main.module.css';
import Header from '../../layout/Header';
import Posts from '../posts/Posts';

const Main = () => {
  return (
    <div className={styles.main}>
      <Posts />
    </div>
  );
};

export default Main;
