const generateFileName = (page) => {
  const myUrl = new URL(page);
  const fullPath = `${myUrl.hostname}${myUrl.pathname}`;
  const matchGroup = fullPath.match(/([a-zA-Z0-9]+)/gm);
  const fileName = matchGroup.reduce((acc, item) => (acc ? `${acc}_${item}` : item), '');
  return `${fileName}.html`;
};

const generateFilesDirName = (page) => {
  const myUrl = new URL(page);
  const fullPath = `${myUrl.hostname}${myUrl.pathname}`;
  const matchGroup = fullPath.match(/([a-zA-Z0-9]+)/gm);
  const dirName = matchGroup.reduce((acc, item) => (acc ? `${acc}-${item}` : item), '');
  return `${dirName}_files`;
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
    const fullPath = `${myUrl.hostname}${myUrl.pathname}`;
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
};
