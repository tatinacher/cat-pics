import axios from 'axios';

const config = {
  headers: {'x-api-key': 'd1093fdc-3945-4ee8-a109-9d6f666011cf'}
}
const url = 'https://api.thecatapi.com/v1/breeds';

function saveDataToStore(data, type) {
  return {
    type: type,
    data: data
  };
}

function addImageToStore(id, image, type) {
  return {
    type: type,
    id: id,
    image: image
  };
}

function saveRandomPic(data,type) {
  return {
    type: type,
    data: data
  };
}

function exploreImgs(data, count, type) {
  return {
    type: type,
    data: data, 
    count: count
  };
}

const fetchData = () => {
  return dispatch => axios.get(url, config).then(response => {
    dispatch(saveDataToStore(response.data, 'SAVE_CAT_BREEDS'));
  }).catch(error => {
    // eslint-disable-next-line no-console
    console.log(error);
  });
};

const searchImages = (q) => {
  return dispatch => axios.get('https://api.thecatapi.com/v1/images/search' + q, config).then(responseImages => {
    var idBreed = q.slice(11);  
    dispatch(addImageToStore(idBreed, responseImages.data[0].url, 'ADD_CAT_IMAGE'));
  }).catch(error => {
    // eslint-disable-next-line no-console
    console.log(error);
  });
};

const getRandomPic = () => {
  return dispatch => axios.get('https://api.thecatapi.com/v1/images/search', config).then(responseImages => {
    dispatch(saveRandomPic(responseImages.data[0].url, 'SAVE_RANDOM_PIC'));
  }).catch(error => {
    // eslint-disable-next-line no-console
    console.log(error);
  });
};

const exploreImages = (order, page, type) => {
  console.log(type)
  return dispatch => axios.get('https://api.thecatapi.com/v1/images/search?limit=9&page='+page+'&order='+order+'&mime_types='+type, config).then(responseImages => {
    let images = [];
    const count = responseImages.headers["pagination-count"];
    responseImages.data.forEach(element => {
      images.push(element.url);
    });
    dispatch(exploreImgs(images, count, 'LOAD_EXPLORE_IMAGES'));
  }).catch(error => {
    // eslint-disable-next-line no-console
    console.log(error);
  });
};


export default {fetchData, searchImages, getRandomPic, exploreImages};

