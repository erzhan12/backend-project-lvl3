import axios from 'axios';
import fsp from 'fs/promises';
import path from 'path'
import generateFileName from './generateFileName.js';

const readPage = (page) => {
  return axios.get(page);
};

const pageLoader = (page, output) => {
  const filePath = path.join(output, generateFileName(page));
  readPage(page)
    .then((response) => fsp.writeFile(filePath, response.data));
};

export default pageLoader;
