export const searchFilter = (searchValue, list, searchBy = 'Title') => {
    let lowerCaseQuery = searchValue.toLowerCase();
    let filteredList = searchValue
      ? list.filter(x => x[searchBy].toString().toLowerCase().includes(lowerCaseQuery))
      : list;
    return filteredList;
  };
  