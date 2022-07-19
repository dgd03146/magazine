import React, { useRef } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDocs, where, query, collection } from 'firebase/firestore';
import { auth, db } from '../../shared/firebase';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/auth-slice';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const id_ref = useRef(null);
  const pw_ref = useRef(null);

  const onLogin = async () => {
    let username;
    let user_id;
    let doc_id;

    const user = await signInWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );

    const user_docs = await getDocs(
      query(collection(db, 'users'), where('user_id', '==', user.user.email))
    );

    user_docs.forEach((u) => {
      console.log(u.data(), 'user data'); // user 정보 가지고 옴. state에 넣어서 이름 얻을 수 있다.
      username = u.data().name;
      user_id = u.data().user_id;
      doc_id = u.id;
    });

    dispatch(authActions.setUser({ username, user_id, doc_id })); // user 정보
    navigate('/main');
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.login}>
        <h1 className={styles.title}>
          ⚽Football<span>Magazine</span>
        </h1>
        <div className={styles.loginWrapper}>
          <div className={styles.inputBox}>
            <input
              type="email"
              placeholder="아이디(이메일)를 입력해주세요."
              ref={id_ref}
            />
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              ref={pw_ref}
            />
          </div>
          <button className={styles.loginBtn} onClick={onLogin}>
            로그인
          </button>
          <button
            className={styles.signUpBtn}
            onClick={() => {
              navigate('/signUp');
            }}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
