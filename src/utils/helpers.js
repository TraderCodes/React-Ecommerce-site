export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (data, type) => {
  // get all item that contains the category which is the [type]
  let unique = data.map((item) => item[type]);
  // set return only single same value
  if (type === 'colors')
  {
    unique = unique.flat()
  }
  return ['all', ...new Set(unique)];
};
