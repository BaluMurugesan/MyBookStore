import axios from 'axios';

const getBookDataByList = value => {
  return axios
    .get(`https://openlibrary.org/search.json?q=${value}&limit=20`)
    .then(res => {
      const {data} = res;
      return {data};
    })
    .catch(err => ({err}));
};

const getDescription = value => {
  return axios
    .get(`https://openlibrary.org/works/${value}.json`)
    .then(res => {
      const {data} = res;
      return {data};
    })
    .catch(err => ({err}));
};

export {getBookDataByList, getDescription};
