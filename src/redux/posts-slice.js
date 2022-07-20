import { createSlice } from '@reduxjs/toolkit';
const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || '';

const initialState = {
  posts: {
    1: {
      id: 1,
      title: 'Son Heung Min',
      content:
        '인생에서 공짜로 얻은건 하나도 없었다. 드리블, 슈팅, 컨디션 유지, 부상 방지 등은 전부 죽어라 노력해 얻은 결과물이라 믿는다.',
      likes: 0,
      comment: [],
      image: process.env.PUBLIC_URL + `/assets/son.jpg`
    },
    2: {
      id: 2,
      title: 'Messi',
      content: '반드시 타야할 기차는 인생에 단 한번 밖에 오지 않는다.',
      likes: 0,
      comment: [],
      image: process.env.PUBLIC_URL + `/assets/messi.jpg`
    },
    3: {
      id: 3,
      title: 'Park Ji Sung',
      content: '쓰러질 지언정 무릎은 꿇지 않는다.',
      likes: 0,
      comment: [],
      image: process.env.PUBLIC_URL + `/assets/park.jpg`
    },
    4: {
      id: 4,
      title: 'Ronaldo',
      content: '나는 여전히 배우길 원하고 있으며 내 인생 내내 배울것이다.',
      likes: 0,
      comment: [],
      image: process.env.PUBLIC_URL + `/assets/ronaldo.jpg`
    },
    5: {
      id: 5,
      title: 'Ibrahimobic',
      content:
        '내가 세계 최고의 선수다. 자기 자신에 대한 믿음이 없으면, 그 사람은 끝난 것이다.',
      likes: 0,
      comment: [],
      image: process.env.PUBLIC_URL + `/assets/ibra.jpg`
    }
  },
  like: 0
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {}
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
