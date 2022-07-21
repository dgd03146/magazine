import React from 'react';
import styles from './MyPage.module.css';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyPage = () => {
  const userId = useSelector((state) => state.auth.user.user_id);
  const username = useSelector((state) => state.auth.user.username);

  let navigate = useNavigate();
  return (
    <div className={styles.myPage}>
      <div className={styles.profileBox}>
        <img
          className={styles.profileImage}
          src="https://blog.kakaocdn.net/dn/cPgamW/btq0Y4obDli/2Bg0K5Zdky3Fkrdb0sKT7K/img.jpg"
          alt="userIcon"
        />
        <div className={styles.userInfo}>
          <div className={styles.userUpBox}>
            <p className={styles.userId}>{userId}</p>
            <button
              onClick={() => {
                navigate('/myPage/' + userId);
              }}
            >
              <EditIcon />
            </button>
          </div>
          <div className={styles.userDownBox}>
            <p>{username}</p>
            <p>posts 10</p>
          </div>
        </div>
      </div>
      <div className={styles.myPosts}>
        <div className={styles.box}>
          <img
            src="https://blog.kakaocdn.net/dn/cthsxd/btroICP7mb7/bxdDLEIUkyIMWojXKc8B9K/img.jpg"
            alt=""
          />
        </div>
        <div className={styles.box}>
          <img
            src="https://img.sbs.co.kr/newimg/news/20210511/201549804_1280.jpg"
            alt=""
          />
        </div>
        <div className={styles.box}>
          <img
            src="http://www.interfootball.co.kr/news/photo/202201/555679_475963_2041.jpg"
            alt=""
          />
        </div>
        <div className={styles.box}>
          <img
            src="http://monthly.chosun.com/upload/1510/1510_392.jpg"
            alt=""
          />
        </div>
        <div className={styles.box}>
          <img
            src="https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2022%2F06%2FSon-heung-min-soccer-boots-sold-for-16-million-won-ft.jpg?fit=max&cbr=1&q=90&w=750&h=500"
            alt=""
          />
        </div>
        <div className={styles.box}>
          <img
            src="https://file.mk.co.kr/meet/neds/2019/12/image_readtop_2019_1046979_15762861074013635.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
