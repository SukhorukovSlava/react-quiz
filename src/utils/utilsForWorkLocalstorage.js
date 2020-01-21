export const setItemsToLocalStorage = dataObj => {
  Object.keys(dataObj).forEach(item => {
    localStorage.setItem(item, dataObj[item]);
  })
};

export const removeItemsToLocalStorage = listNamesRemovingItem => {
  listNamesRemovingItem.forEach(name => {
    localStorage.removeItem(name);
  })
};