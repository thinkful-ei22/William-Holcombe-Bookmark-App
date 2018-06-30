


/*global store, cuid, Item, shoppingList, api*/
'use strict';


const store = (function () {

  const items = [];

  /*const items = [{
  title: 'Monte Cristo',
  rating: 4,
  desc: 'Source material for the movie  Oldboy',
  //url
}, 
{title: 'Lord Give Me a Sign',
  rating: 4,
  desc: 'Source material for the movie  Oldboy',
  //url
}];

*/
  const ratingFilter = '';

  const addItem = function(item) {
    setExpand(item);
    this.items.push(item);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(object => object.id !== id);
  };
  const setError = function(message='There is a problem.'){
    window.alert(message);
  };

  const findById = function(id) {
    return items.find(item => item.id === id);
  };
  //study what's below here
  const setExpand = function(bookmark){
    const initExpand = {expand:false};
    Object.assign(bookmark, initExpand);
  };
  const switchExpand = function(bookmark1){
    bookmark1.expand = !bookmark1.expand;
  };

  return{
    items,
    addItem,
    findAndDelete,
    setError,
    findById,
    setExpand,
    switchExpand,
    ratingFilter
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