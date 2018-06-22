/* global shoppingList, cuid, store, api*/
'use strict';

$(document).ready(function () {
    bookmarkList.bindEventListeners();
  
    API.getBookmarks((items) => {
  
      items.forEach((item) => store.addItem(item));
      bookmarkList.render();
    });
  
    
   
  });







/*
const bookmarksTest = [{
     title: 'Monte Cristo',
    rating: 4,
    description: 'Source material for the movie  Oldboy',
    //url
  }, 
      {title: 'Lord Give Me a Sign',
    rating: 4,
    description: 'Source material for the movie  Oldboy',
    //url
  }];
  const test = bookmarkList.generateItemElement(bookmarksTest);
  console.log(test);
  
  
  console.log('Hello');
  


/*
// eslint-disable-next-line no-unused-vars

//console.log(store.items);


$(document).ready(function () {
  shoppingList.bindEventListeners();

  api.getItems((items) => {

    items.forEach((item) => store.addItem(item));
    shoppingList.render();
  });

  
 
});
*/
