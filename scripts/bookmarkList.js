/*global store, cuid, Item, api*/
'use strict';

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function(){

  const generateItemElement = function(bookmark) {
    //console.log('generate ran');
    return `
   <li class="bookmark js-bookmark-item" data-bookmark-id="${bookmark.id}">
                <h3 class="bookmark-name">${bookmark.title}</h3>
              <span class="stars">
                  <span class="bookmark-rating rating-4">${bookmark.rating}</span>
              </span>
              <div class="expanded">
              <h4>${bookmark.desc}</h4>   
              <div class="bookmark-controls">
                  <button class="view-bookmark-button js-bookmark-view" action="wsj.com">
                    <span class="button-label">View</span>
                  </button>
                  <button class="bookmark-delete js-bookmark-delete">
                    <span class="button-label">Remove</span>
                  </button>
                </div>
                </div>            
      </li>`;
     
  };
  const generateItemsString = function(bookMarkList1) {
    const items = bookMarkList1.map((item) => generateItemElement(item));
    return items.join('');
  };

  function render() {
    const bookmarkListItemsString = generateItemsString(store.items);
  
    // insert that HTML into the DOM
    $('.js-bookmark-list').html(bookmarkListItemsString);
  
  }

  function addItemToShoppingList(itemName) {
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
  
  }
    
  function handleNewItemSubmit() {
    $('#js-bookmark-form').submit(function (event) {
      event.preventDefault();
  
      const newRating = $('#js-bookmark-rating').val();
      
      const newTitle = $('#js-new-title').val();
      const newUrl = $('#js-new-url').val();
      //console.log(newRating);
      //console.log(newUrl);
      //console.log(newTitle);
      //is this let a good idea?
    
      
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
         
        store.addItem(newItem);
          render();
      },() =>store.setError('Submission Error : Empty Field'));
    });
  }

  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-bookmark-list').on('click', '.js-bookmark-delete', event => {
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

  function bindEventListeners() {
    handleNewItemSubmit();
    console.log('bind worked');
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