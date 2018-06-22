


/*global store, cuid, Item, shoppingList, api*/
'use strict';


const store = (function () {

  const items = [];
  /*const items = [{
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
*/
  const addItem = function(item) {
    this.items.push(item);
  };

  return{
    items,
    addItem
  };
})();














/*
'use strict';


const store = (function () {

  const items = [];
  const error = null;

  const hideCheckedItems = false;
  const searchTerm = '';
  
  const findById = function(id) {
    return items.find(item => item.id === id);
  };

  const addItem = function(item) {
    this.items.push(item);
  };

  const findAndUpdate = function (id, newData) {
    let foundItem = this.items.find(item => item.id === id);
     const newItem = Object.assign(foundItem,newData);
    
  
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(object => object.id !== id);
  };


  const toggleCheckedFilter= function(){

    this.hideCheckedItems = !this.hideCheckedItems;    
  };

  const setSearchTerm = function(newSearchTerm){
    this.searchTerm = newSearchTerm;
  };

  const setError = function(message='There is a problem.'){
    window.alert(message);
  };



  return{
    items,
    hideCheckedItems,
    searchTerm,
    findById,
    addItem,
    findAndDelete,
    toggleCheckedFilter,
    setSearchTerm,
    findAndUpdate,
    setError
  };

}() );
*/