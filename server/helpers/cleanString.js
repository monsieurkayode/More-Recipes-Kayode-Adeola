const cleanString = (str) => {
  const exp = /[ ]/g;
  const clean = str.replace(exp, '');
  return clean;
};

export default cleanString;
