'use strict';



//add error handling later


const API = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/WillH';
  const getBookmarks = function(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createItem = function(title, url, desc, rating, callback){
    const newItem = JSON.stringify({
      title,
      url,
      desc,
      rating
      //this is the name passed in name: '<name>'
    });
    
    $.ajax({
      'url': `${BASE_URL}/bookmarks`,
      //changed '/items' to'/bookmarks'
      'method': 'POST',
      'contentType': 'application/json',
      'data': newItem,
      'success': callback,
    })

  };


  return {
     
    getBookmarks,
    createItem
  };
}());



















/*


const api = (function(){

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/donny';

  const getItems = function (callback){

    $.getJSON(`${BASE_URL}/items`,callback);


  };

  const updateItem = function (id,updateData,callback,error) {
    $.ajax({
      url: `${BASE_URL}/items/${id}`,
      method: 'PATCH',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback,
      error:error
    });

  };

  const createItem = function (name,callback,error){

    let newItem= {
      name: name
    };

    newItem = JSON.stringify(newItem);


    $.ajax({
      url: `${BASE_URL}/items`,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: newItem,
      success: callback,
      error:error
    });

  };


  const deleteItem = function (id,callback,error){

    $.ajax({
      url: `${BASE_URL}/items/${id}`,
      method: 'DELETE',
      dataType: 'json',
      contentType: 'application/json',
      success: callback,
      error:error
    });

  };




  return{

    getItems,
    createItem,
    updateItem,
    deleteItem
  };



}());
*/