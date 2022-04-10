const generateFileName = (page) => {
  const myUrl = new URL(page);
  const fullPath = `${myUrl.hostname}${myUrl.pathname}`;
  const matchGroup = fullPath.match(/([a-zA-Z0-9]+)/gm);
  // const fileName = matchGroup.reduce((acc, item) => {
  //   return acc ? `${acc}_${item}` : item;
  // }, '');
  const fileName = matchGroup.reduce((acc, item) => (acc ? `${acc}_${item}` : item), '');
  return `${fileName}.html`;
};

export default generateFileName;
