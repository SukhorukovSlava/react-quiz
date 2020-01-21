export const setItemsToLS = dataObj => {
  Object.keys(dataObj).forEach(item => {
    localStorage.setItem(item, dataObj[item]);
  })
};

export const removeItemsToLS = listNamesRemovingItem => {
  listNamesRemovingItem.forEach(name => {
    localStorage.removeItem(name);
  })
};

export const getItemFromLS = name => localStorage.getItem(name);