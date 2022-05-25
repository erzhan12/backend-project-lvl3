import path from 'path';


const generateFileName = (page) => {
  const myUrl = new URL(page);
  const fullPath = `${myUrl.hostname}${myUrl.pathname}`;
  const matchGroup = fullPath.match(/([a-zA-Z0-9]+)/gm);
  const fileName = matchGroup.reduce((acc, item) => (acc ? `${acc}_${item}` : item), '');
  return `${fileName}.html`;
};

const isSourceLocal = (src, base) => {
  const myUrl = new URL(src, base);
  const baseUrl = new URL(base);
  return myUrl.hostname === baseUrl.hostname;
}

const generateFilesDirName = (page) => {
  const myUrl = new URL(page);
  const fullPath = `${myUrl.hostname}${myUrl.pathname}`;
  const matchGroup = fullPath.match(/([a-zA-Z0-9]+)/gm);
  const dirName = matchGroup.reduce((acc, item) => (acc ? `${acc}-${item}` : item), '');
  return `${dirName}_files`;
};

const generateLinkFileName = (page, src) => {
  if (!isSourceLocal(src, page)) return; 
  try {
    const myUrl = new URL(page);
    // const fullPath = `${myUrl.hostname}${myUrl.pathname}`;
    const fullPath = myUrl.hostname;
    const matchGroup = fullPath.match(/([a-zA-Z0-9]+)/gm);
    const hostPath = matchGroup.reduce((acc, item) => (acc ? `${acc}-${item}` : item), '');

    console.log(path.parse(page));
    console.log(path.parse(src));

    const parsedSrc = path.parse(src);

    const matchGroupFile = src.match((/([a-zA-Z0-9.]+)/gm));
    const filePath = matchGroupFile.reduce((acc, item) => (acc ? `${acc}-${item}` : item), '');
    if (!parsedSrc.ext) {
      filePath = `${filePath}.html`;
    }
    return `${hostPath}-${filePath}`;
   
  } catch (error) {
  }
};

const generateImageFileName = (page, src) => {
  try {
    const myUrl = new URL(src);
    const fullPath = `${myUrl.hostname}${myUrl.pathname}`;
    const matchGroup = fullPath.match(/([a-zA-Z0-9]+)/gm);
    const hostPath = matchGroup.reduce((acc, item) => (acc ? `${acc}-${item}` : item), '');
    return hostPath;
  } catch (e) {
    const myUrl = new URL(page);
    // const fullPath = `${myUrl.hostname}${myUrl.pathname}`;
    const fullPath = myUrl.hostname;
    const matchGroup = fullPath.match(/([a-zA-Z0-9]+)/gm);
    const hostPath = matchGroup.reduce((acc, item) => (acc ? `${acc}-${item}` : item), '');

    const matchGroupFile = src.match((/([a-zA-Z0-9.]+)/gm));
    const filePath = matchGroupFile.reduce((acc, item) => (acc ? `${acc}-${item}` : item), '');
    return `${hostPath}-${filePath}`;
  }
};

export {
  generateFileName,
  generateFilesDirName,
  generateImageFileName,
  generateLinkFileName,
};
