import axios from 'axios';
import fsp from 'fs/promises';
import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import { generateFileName, generateFilesDirName, generateImageFileName, generateLinkFileName } from './generateFileName.js';

const getImages = async (page, outputDir, html, tag='img', attr='src') => {
  const filesDir = generateFilesDirName(page);
  const fullDirPath = path.join(outputDir, filesDir);
  const $ = cheerio.load(html);
  $(tag).each((index, element) => {
    const imgUrl = $(element).attr(attr);
    const fileName = generateImageFileName(page, imgUrl);
    const filePath = path.join(filesDir, fileName);
    const fullUrl = `${page}${imgUrl}`;
    const fullPath = path.resolve(outputDir, filePath);
    $(element).attr(attr, filePath);
    fsp.mkdir(fullDirPath)
      .then(() => axios({ method: 'GET', url: fullUrl, responseType: 'stream' }))
      .catch(() => axios({ method: 'GET', url: fullUrl, responseType: 'stream' }))
      .then((response) => {
        response.data.pipe(fs.createWriteStream(fullPath));
      })
      // .catch((error) => {console.log('pipe error')});
      .catch(() => {});
  });
  return new Promise((resolve) => {
    resolve($.html());
  });
};
const getLinks = async (page, outputDir, html, tag='link', attr='href') => {
  const filesDir = generateFilesDirName(page);
  const fullDirPath = path.join(outputDir, filesDir);
  const $ = cheerio.load(html);
  $(tag).each((index, element) => {
    const imgUrl = $(element).attr(attr);
    const fileName = generateLinkFileName(page, imgUrl);
    if (fileName) {
      const filePath = path.join(filesDir, fileName);
      const fullUrl = `${page}${imgUrl}`;
      const fullPath = path.resolve(outputDir, filePath);
      $(element).attr(attr, filePath);
      fsp.mkdir(fullDirPath)
        .then(() => axios({ method: 'GET', url: fullUrl, responseType: 'stream' }))
        .catch(() => axios({ method: 'GET', url: fullUrl, responseType: 'stream' }))
        .then((response) => {
          response.data.pipe(fs.createWriteStream(fullPath));
        })
        // .catch((error) => {console.log('pipe error')});
        .catch(() => {});
    }
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
    .then((html) => getLinks(page, outputDir, html, 'link', 'href'))
    .catch(() => {})
    .then((html) => getLinks(page, outputDir, html, 'script', 'src'))
    .catch(() => {})
    .then((html) => fsp.writeFile(filePath, html));
  return result;
};

export default pageLoader;
export { getImages, getLinks };
