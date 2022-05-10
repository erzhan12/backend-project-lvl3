import axios from 'axios';
import fsp from 'fs/promises';
import path from 'path';
import { generateFileName, generateFilesDirName, generateImageFileName } from './generateFileName.js';
import cheerio from 'cheerio';

const pageLoader = async (page, output) => {
  const filePath = path.join(output, generateFileName(page));
  const result = axios.get(page)
    .then((response) => getImages(page, response.data))
    .then((html) => fsp.writeFile(filePath, html));
  return result;
};

const getImages = (page, html) => {
  const $ = cheerio.load(html);
  $('img').each((index, imageElement) => {
        const imgUrl = $(imageElement).attr('src');
        const imgFilesDir = generateFilesDirName(page);
        const imgFileName = generateImageFileName(page, imgUrl);
  });
  return new Promise((resolve, reject) => {
    resolve(html);
  });
}


export default pageLoader;
