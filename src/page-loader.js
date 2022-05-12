import axios from 'axios';
import fsp from 'fs/promises';
import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import { generateFileName, generateFilesDirName, generateImageFileName } from './generateFileName.js';

const getImages = async (page, outputDir, html) => {
  const imgFilesDir = path.join(outputDir, generateFilesDirName(page));
  const $ = cheerio.load(html);
  $('img').each((index, imageElement) => {
    const imgUrl = $(imageElement).attr('src');
    const imgFileName = generateImageFileName(page, imgUrl);
    const imgFilePath = path.join(imgFilesDir, imgFileName);
    const imgFullUrl = `${page}${imgUrl}`;
    const imgFullPath = path.resolve(outputDir, imgFilePath);
    $(imageElement).attr('src', imgFilePath);
    fsp.mkdir(imgFilesDir)
      .then(() => axios({ method: 'GET', url: imgFullUrl, responseType: 'stream' }))
      .catch(() => axios({ method: 'GET', url: imgFullUrl, responseType: 'stream' }))
      .then((response) => {
        response.data.pipe(fs.createWriteStream(imgFullPath));
      })
      // .catch((error) => {console.log('pipe error')});
      .catch(() => {});
  });
  return new Promise((resolve) => {
    resolve($.html());
  });
};

const pageLoader = async (page, outputDir) => {
  const filePath = path.join(outputDir, generateFileName(page));
  const result = axios({ method: 'GET', url: page })
    .then((response) => getImages(page, outputDir, response.data))
    .catch(() => {})
    .then((html) => fsp.writeFile(filePath, html));
  return result;
};

export default pageLoader;
export { getImages };
