import React, { useEffect } from 'react';
import styles from './MyPage.module.css';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getMyPosts, postsActions } from '../../redux/posts-slice';

const MyPage = () => {
  const user_id = useSelector((state) => state.auth.user.user_id);
  const username = useSelector((state) => state.auth.user.username);
  const myPosts = useSelector((state) => state.posts.myPosts);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPosts(user_id));
  }, [user_id, dispatch]);

  const gotoEdit = (id) => {
    navigate('/myPage/' + id);
    dispatch(postsActions.isEdit());
  };

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
            <p className={styles.userId}>{user_id}</p>
            <button
              onClick={() => {
                navigate('/myPage/' + user_id);
                dispatch(postsActions.notIsEdit());
              }}
            >
              <AddCircleIcon />
            </button>
          </div>
          <div className={styles.userDownBox}>
            <p>
              <span>이름</span> {username}
            </p>
            <p>
              <span className={styles.span}>게시물</span> {myPosts.length}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.myPosts}>
        {myPosts.map((it) => (
          <div className={styles.box} key={it.id}>
            <img src={it.image} alt="" />
            <div className={styles.buttonBox}>
              <button
                className={styles.editBtn}
                onClick={() => gotoEdit(it.id)}
              >
                수정하기
              </button>
              <button className={styles.deleteBtn}>삭제하기</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
