import axios from 'axios';
import fsp from 'fs/promises';
import path from 'path';
import generateFileName from './generateFileName.js';

const pageLoader = async (page, output) => {
  const filePath = path.join(output, generateFileName(page));
  return axios.get(page)
    .then((response) => fsp.writeFile(filePath, response.data));
};

export default pageLoader;
