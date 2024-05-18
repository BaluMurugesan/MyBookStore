import axios from 'axios';

const getBookDataByList = value => {
  return axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${value}`)
    .then(res => {
      const {data} = res;
      return {data};
    })
    .catch(err => ({err}));
};

export {getBookDataByList};
