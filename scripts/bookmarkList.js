/*global store, cuid, Item, api*/
'use strict';

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function(){

  const generateItemElement = function(bookmark) {
    //console.log('generate ran');
    return `
   <li class="js-bookmark-item expandable" data-bookmark-id="${bookmark.id}">
                <h3 class="bookmark-name">${bookmark.title}</h3>
              <span class="stars">
                  <span class="bookmark-rating rating-4">${bookmark.rating}</span>
              </span>
              <div class="desc-box ${bookmark.expand ? '' : 'hidden'}">
              <h4>${bookmark.desc}</h4>   
      
                  <button class="view-bookmark-button js-bookmark-view">
                    <span class="button-label">View</span>
                  </button>
                  <button class="bookmark-delete js-bookmark-delete">
                    <span class="button-label">Remove</span>
                  </button>
                </div>
                         
      </li>`;
     
  };
  const generateItemsString = function(bookMarkList1) {
    const items = bookMarkList1.map((item) => generateItemElement(item));
    return items.join('');
  };

  function render() {
    let bookmarks2 = store.items;
    //console.log(parseInt(store.ratingFilter));
    if (store.ratingFilter >= 2){
      bookmarks2 = store.items.filter(item => item.rating >= store.ratingFilter);
    }
    
    console.log(bookmarks2);
    const bookmarkListItemsString = generateItemsString(bookmarks2);
  
    // insert that HTML into the DOM
    $('.js-bookmark-list').html(bookmarkListItemsString);
  
  }

  /*function addItemToShoppingList(itemName) {
    //store.items.push({ id: cuid(), name: itemName, checked: false });
    try {
      Item.validateName(itemName);
      Item.create(itemName);
      store.items.push({ id: cuid(), name: itemName, checked: false });
      render();
    }
    catch (error) {
      console.log(`Cannot add item: ${error.message}`);
    }
  
  }*/

/*
  function validateTitle(title, url){
    //const newBookmarkValidation = function(bookmark){
      $('.error').remove();
      if (title === '') {
        $('.js-new-title').after('<span class="error">This field is required</span>');
        throw new TypeError('Title is required');
      }
      if (url === '') {
        $('.js-new-url').after('<span class="error">This field is required</span>');
        throw new TypeError('URL starting with \'https://\' is required');
      } 
      return title, url;
    };

  */
    
  function handleNewItemSubmit() {
    $('#js-bookmark-form').submit(function (event) {
      event.preventDefault();
  
      const newRating = $('#js-bookmark-rating').val();
      
      const newTitle = $('#js-new-title').val();
      const newUrl = $('#js-new-url').val();
    //validateTitle(newTitle, newUrl);
      
      const descriptionInput= $('#js-new-desc').val();
      let newDescription = '';
      if(descriptionInput.length > 0){
        newDescription = descriptionInput;
      }
      else{
        newDescription = 'A site like no other';
      }
      $('#js-new-title').val('');
      
      $('#js-new-url').val('');
      $('#js-new-desc').val('');
      //reset rating?
      API.createItem(newTitle, newUrl, newDescription, newRating, (newItem) => {
        //addItem will attach extra info beyond what's relevant to the api
        store.addItem(newItem);
        render();
      },() =>store.setError('Submission Error : Empty Field'));
    });
  }

  function getItemIdFromElement(item1) {
    return $(item1)
      .closest('.js-bookmark-item')
      .data('bookmark-id');
  }

  //<li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">

  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-bookmark-list').on('click', '.js-bookmark-delete', event => {
      // get the index of the item in store.items
      
      const id = getItemIdFromElement(event.currentTarget);
      // delete the item
      console.log(id);
      API.deleteItem(id, () => {
        store.findAndDelete(id); 
        render();
      },
      () => store.setError('Delete Item Problem'));

    });
  }

  function handleBookmarkExpand() {
    $('.js-bookmark-list').on('click', '.expandable', function () {
      const id = getItemIdFromElement(this);
      const showBookmark = store.findById(id);
      showBookmark.expand = !showBookmark.expand;
      render();
    });
  }

  function handleViewClicked(){
    $('.js-bookmark-list').on('click', '.js-bookmark-view', function(){
      //don't use e.currentTarget
      let id = getItemIdFromElement(this);
      let destination = store.findById(id);
      console.log(destination);
      const window1 = window.open(`${destination.url}`, '_blank');
      window1.focus();

function handleBookmarkValidation(){

}


    });
  }
  function handleRatingFilter(){
    $('#rating-form').on('click', '#rating-filter-button', function(){
    
      event.preventDefault();
    
      const filter1 = $('#js-bookmark-filter-select').val();
      
      store.ratingFilter = parseInt(filter1);
      console.log(store.ratingFilter);
     
      render();
    });

  }

  function bindEventListeners() {
    handleNewItemSubmit();
    handleDeleteItemClicked();
    handleBookmarkExpand();
    handleViewClicked();
    handleRatingFilter();
    handleBookmarkValidation();
   
  }

  return{
    //generateItemElement,
    //generateItemsString,
    bindEventListeners,
    render
    
  };

})();

//bookmarkList.render();
  

  

  
/*
  


  
  function render() {
    // Filter item list if store prop is true by item.checked === false
    let items = store.items;
    if (store.hideCheckedItems) {
      items = store.items.filter(item => !item.checked);
    }
  
    // Filter item list if store prop `searchTerm` is not empty
    if (store.searchTerm) {
      items = store.items.filter(item => item.name.includes(store.searchTerm));
    }


    if(store.error){
      console.log('error');

    }
  
    // render the shopping list in the DOM
    console.log('`render` ran');
    const shoppingListItemsString = generateShoppingItemsString(items);
  
    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);
  }
  
  */

  
/*
  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }
  
  function handleItemCheckClicked() {
    $('.js-shopping-list').on('click', '.js-item-toggle', event => {
      const id = getItemIdFromElement(event.currentTarget);
      const foundItem = store.findById(id);
      foundItem.checked = !foundItem.checked; 
      const newObject = { checked : foundItem.checked};
    
      api.updateItem(id,newObject, () => {store.findAndUpdate(id,newObject);render();},() =>store.setError('Error with Checking Item'));
      //console.log(id);
      //store.findAndToggleChecked(id);
      //render();
    });
  }
  
  
  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-shopping-list').on('click', '.js-item-delete', event => {
      // get the index of the item in store.items
      const id = getItemIdFromElement(event.currentTarget);
      // delete the item
      api.deleteItem(id, () => {
        store.findAndDelete(id); 
        render();
      },
      () => store.setError('Delete Item Problem'));

    });
  }


  
  function handleEditShoppingItemSubmit() {
    $('.js-shopping-list').on('submit', '.js-edit-item', event => {
      event.preventDefault();
      //get id from DOM
      const id = getItemIdFromElement(event.currentTarget);
      //get name from DOM
      const newName = $(event.currentTarget).find('.shopping-item').val();
      const newObject = { name: newName };
      // console.log(newObject);
      api.updateItem(id,newObject, () =>  
      {
        store.findAndUpdate(id,newObject);
        render();
      },() =>store.setError('Problem Editing Item'));
      //store.findAndUpdate(id, newName);
     
    });
  }
  
  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      store.toggleCheckedFilter();
      render();
    });
  }
  
  function handleShoppingListSearch() {
    $('.js-shopping-list-search-entry').on('keyup', event => {
      const val = $(event.currentTarget).val();
      store.setSearchTerm(val);
      render();
    });
  }
  
  function bindEventListeners() {
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
    handleEditShoppingItemSubmit();
    handleToggleFilterClick();
    handleShoppingListSearch();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());
*/