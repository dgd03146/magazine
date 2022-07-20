import React, { useEffect, useRef, useState } from 'react';
import styles from './SignUp.module.css';
import { auth } from '../../shared/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../shared/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignUp = () => {
  let navigate = useNavigate();

  const [isEmpty, setIsEmpty] = useState(false); // input 비워있으면 회원가입 button 클릭x

  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: ''
  });

  const [errorMessage, setErrorMessage] = useState({
    emailErrorMessage: '',
    nameErrorMessage: '',
    passwordErrorMessage: '',
    passwordCheckErrorMessage: ''
  });

  const id_ref = useRef(null);
  const name_ref = useRef(null);
  const pw_ref = useRef(null);
  const pwCheck_ref = useRef(null);

  const { name, email, password, passwordCheck } = inputValue;

  // validation check
  const regexp = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]/; // email 형식 정규표현식
  const validEmail = email.match(regexp);
  const validName = name.length >= 3;
  const validPassword = password.length >= 6;
  const validPasswordCheck = password === passwordCheck;

  useEffect(() => {
    if (
      email !== '' &&
      name !== '' &&
      password !== '' &&
      passwordCheck !== ''
    ) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [email, name, password, passwordCheck]);

  const handleInput = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    });
  };

  const onSignUp = async () => {
    // validation check
    if (!validEmail) {
      setErrorMessage({
        ...errorMessage,
        emailErrorMessage: '유효하지 않은 이메일입니다.'
      });
      id_ref.current.focus(); // 자동 포커스
    } else if (!validName) {
      setErrorMessage({
        ...errorMessage,
        emailErrorMessage: '',
        nameErrorMessage: '3자 이상으로 입력해야합니다.'
      });
      name_ref.current.focus();
    } else if (!validPassword) {
      setErrorMessage({
        ...errorMessage,
        nameErrorMessage: '',
        passwordErrorMessage: '6자 이상으로 입력해야 합니다.'
      });
      pw_ref.current.focus();
    } else if (!validPasswordCheck) {
      setErrorMessage({
        ...errorMessage,
        passwordErrorMessage: '',
        passwordCheckErrorMessage: '비밀번호를 다시 확인해주세요.'
      });
      pwCheck_ref.current.focus();
    }

    // user 생성
    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    console.log(user, 'user');

    // user
    const user_doc = await addDoc(collection(db, 'users'), {
      user_id: user.user.email,
      name: name_ref.current.value,
      posts: {}
    }); // 회원가입 끝난 상태에서 firebaseStore에다가 저장

    alert('회원가입이 완료되었습니다.');
    navigate('/login');
  };

  return (
    <div className={styles.signUpPage}>
      <div className={styles.signUp}>
        <h1 className={styles.title}>
          ⚽Football<span>Magazine</span>
        </h1>
        <div className={styles.signUpWrapper}>
          <div className={styles.inputBox}>
            <input
              type="email"
              placeholder="아이디(이메일)를 입력해주세요."
              ref={id_ref}
              name="email"
              onChange={handleInput}
            />
            <p>{errorMessage.emailErrorMessage}</p>
            <input
              type="text"
              placeholder="이름을 입력해주세요."
              ref={name_ref}
              name="name"
              onChange={handleInput}
            />
            <p>{errorMessage.nameErrorMessage}</p>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              ref={pw_ref}
              name="password"
              onChange={handleInput}
            />
            <p>{errorMessage.passwordErrorMessage}</p>
            <input
              type="password"
              placeholder="비밀번호를 확인해주세요."
              ref={pwCheck_ref}
              name="passwordCheck"
              onChange={handleInput}
            />
            <p>{errorMessage.passwordCheckErrorMessage}</p>
          </div>
          <button
            className={`${styles.signUpBtn} ${!isEmpty && styles.disable}`}
            onClick={onSignUp}
            disabled={!isEmpty}
          >
            회원가입
          </button>
          <button
            className={styles.loginBtn}
            onClick={() => {
              navigate('/login');
            }}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
