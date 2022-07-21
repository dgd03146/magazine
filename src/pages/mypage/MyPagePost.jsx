import { upload } from '@testing-library/user-event/dist/upload';
import React, { useEffect, useRef, useState } from 'react';
import styles from './MyPagePost.module.css';
import { storage, db } from '../../shared/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postsActions } from '../../redux/posts-slice';
import { useParams } from 'react-router-dom';

const MyPagePost = () => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || '';

  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [isEmpty, setIsEmpty] = useState(false); // input 비워있으면 회원가입 button 클릭x

  const myPosts = useSelector((state) => state.posts.myPosts);

  const [isInputValue, setIsInputValue] = useState({
    title: '',
    content: '',
    url: ''
  });

  const [layoutChecked, setLayOutChecked] = useState('leftText');

  const { title, content, url } = isInputValue;

  const file_link_ref = useRef('');
  const contentRef = useRef('');
  const titleRef = useRef('');

  const userId = useSelector((state) => state.auth.user.user_id);
  const username = useSelector((state) => state.auth.user.username);

  const isEdit = useSelector((state) => state.posts.isEdit);

  let doc_id = useSelector((state) => state.posts.doc_id);
  console.log(doc_id);

  let params = useParams();
  let id = params['*'];

  // const [imageSrc, setImageSrc] = useState(''); // 이미지 미리보기

  useEffect(() => {
    if (id && myPosts.length >= 1 && isEdit) {
      const targetPost = myPosts.find((it) => it.id == id);

      setIsInputValue(targetPost);
    }
  }, [id, myPosts]);

  useEffect(() => {
    // 게시물 유효성 체크
    if (title !== '' && content !== '' && url !== '') {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [title, content, url]);

  const radioCheckHandler = (e) => {
    setLayOutChecked(e.target.value);
  };

  const handleInputValue = (e) => {
    setIsInputValue({
      ...isInputValue,
      [e.target.name]: e.target.value
    });
  };

  const uploadFile = async (e) => {
    const uploadedFile = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    const file_url = await getDownloadURL(uploadedFile.ref);

    setIsInputValue({
      ...isInputValue,
      image: file_url
    });
    file_link_ref.current = { image: file_url }; // ref는 값을 보관하는 용도로 사용
  };

  const postFB = async () => {
    let today = new Date();

    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let dateString = year + '-' + month + '-' + day;
    let hours = ('0' + today.getHours()).slice(-2);
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2);
    let timeString = hours + ':' + minutes + ':' + seconds;
    const createdTime = dateString + ' ' + timeString;

    // edit 하는경우
    if (isEdit && isInputValue) {
      const editPosts = myPosts.map((it) =>
        parseInt(it.id) === parseInt(isInputValue.id)
          ? (it = { ...isInputValue })
          : it
      );
      // await updateDoc(doc(db, 'posts',), {
      //   posts: editPosts
      // });
      // dispatch(postsActions.edit(isInputValue));

      // navigate(-1);
      // return;
    }

    // db에 데이터 업뎃
    const posts_doc = await addDoc(collection(db, 'posts'), {
      user_id: userId,
      name: username,
      image: file_link_ref.current?.image,
      created_time: createdTime,
      title: titleRef.current?.value,
      content: contentRef.current?.value,
      layout: layoutChecked,
      id: Date.now(),
      likes: 0
    });

    // redux에 데이터 추가
    dispatch(
      postsActions.add({
        user_id: userId,
        name: username,
        image: file_link_ref.current?.image,
        created_time: createdTime,
        title: titleRef.current?.value,
        content: contentRef.current?.value,
        layout: layoutChecked,
        id: Date.now(),
        likes: 0
      })
    );

    navigate('/main');
  };

  return (
    <div className={styles.myPagePost}>
      <div>
        <h1>게시글 {isEdit ? '수정' : '작성'}</h1>
      </div>
      <div className={styles.textLeftBox}>
        <h2>레이아웃 고르기</h2>
        <div className={styles.layout1}>
          <label>
            <input
              type="radio"
              name="layout"
              value="leftText"
              onChange={radioCheckHandler}
            />
            오른쪽에 이미지, 왼쪽에 텍스트
          </label>
          <div className={styles.layout1Box}>
            <div className={styles.textBox}>
              <h1 className={styles.text}>{isInputValue.content}</h1>
            </div>
            <div className={styles.imageBox}>
              <img
                src={
                  isInputValue.image
                    ? isInputValue.image
                    : process.env.PUBLIC_URL + `/assets/default.jpg`
                }
                alt="default"
              />
            </div>
          </div>
        </div>
        <div className={styles.layout2}>
          <label>
            <input
              type="radio"
              name="layout"
              value="rightText"
              onChange={radioCheckHandler}
            />
            왼쪽에 이미지, 오른쪽에 텍스트
          </label>
          <div className={styles.layout1Box}>
            <div className={styles.imageBox}>
              <img
                src={
                  isInputValue.image
                    ? isInputValue.image
                    : process.env.PUBLIC_URL + `/assets/default.jpg`
                }
                alt="default"
              />
            </div>
            <div className={styles.textBox}>
              <h1 className={styles.text}>{isInputValue.content}</h1>
            </div>
          </div>
        </div>
        <div className={styles.layout3}>
          <label>
            <input
              type="radio"
              name="layout"
              value="topText"
              onChange={radioCheckHandler}
            />
            하단에 이미지, 상단에 텍스트
          </label>
          <div className={styles.layout3Box}>
            <div className={styles.textBox}>
              <h1 className={styles.text}>{isInputValue.content}</h1>
            </div>
            <div className={styles.imageBox}>
              <img
                src={
                  isInputValue.image
                    ? isInputValue.image
                    : process.env.PUBLIC_URL + `/assets/default.jpg`
                }
                alt="default"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contentBox}>
        <div className={styles.contentUpBox}>
          <p>게시물 내용</p>
          <div className={styles.contentUpBoxRight}>
            <input
              type="text"
              placeholder="title"
              name="title"
              ref={titleRef}
              className={styles.titleInput}
              onChange={handleInputValue}
              value={(isInputValue && isInputValue.title) || ''}
            />
            <div className={styles.filebox}>
              <label htmlFor="ex_file">업로드</label>
              <input
                name="url"
                type="file"
                id="ex_file"
                onChange={uploadFile}
              />
            </div>
            <button
              onClick={postFB}
              disabled={!isEmpty}
              className={`${!isEmpty && styles.disable}`}
            >
              작성하기
            </button>
          </div>
        </div>
        <textarea
          className={styles.textarea}
          name="content"
          id=""
          cols="30"
          rows="10"
          placeholder="게시글 작성"
          ref={contentRef}
          onChange={handleInputValue}
          value={(isInputValue && isInputValue.content) || ''}
        ></textarea>
      </div>
    </div>
  );
};

export default MyPagePost;
