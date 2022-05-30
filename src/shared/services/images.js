import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '27157538-112feafcfc70e7bc29b814ecd',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const getImages = async (q, page) => {
  const { data } = await instance.get(`/`, {
    params: {
      q,
      page,
    },
  });
  return data.hits;
};
