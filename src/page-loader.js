import axios from 'axios';
import generateFileName from './generateFileName.js';

const readPage = async (page) => {
  const response = await axios.get(page);
  // console.log(response.data);
  const fileName = generateFileName(page);
  console.log(fileName);
};

const pageLoader = async (page, output) => {
  await readPage(page);
};

export default pageLoader;
