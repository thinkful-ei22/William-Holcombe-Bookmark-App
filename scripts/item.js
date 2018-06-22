'use strict';
/*
const Item = (function (){

  function validateName(name){

    if(name === '' ){
      throw new Error('Name does not Exist');
    }

  }

  function create(name){
    return{
      id:cuid(),
      name:name,
      checked:false
   
    };

  }


  //const foo = 'bar';

  return{
    validateName, create

  };

}());