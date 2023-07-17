export const GetItemType = (itemType: 'product' | 'products_kit') => {
  if (itemType === 'products_kit') {
    return 'k';
  } else {
    return 'p';
  }
};
