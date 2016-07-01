"use strict";

var explosiveData = [];
// var $fireworks = null;
// var $demolition = null


// WRAP ALL JQUERY IN THIS
$(document).ready(function() {

  // get output div and create a dropdown selector for categories;
  // attach event listener to see which cat is picked
  // depending on which cat is picked, output products
  function loadCategoriesPage() {
    console.log("explosiveData", explosiveData[0]);
    var catArr = explosiveData[0];
    for (var i = 0; i < catArr.length; i++) {
      var category = catArr[i];
      $("#selectDiv").append(`
      <option id="${category.id}" "value=${category.name}>
      ${category.name}</option>
    `);
    };
  };

  $("select").change(function() {
    // ****select the category****
    $("select option:selected").each(function() {
      var catId = Number(`${this.id}`);
      $("#oDiv").html("");
      // loop through types and if category id = types.categegory, output to DOM
      for (let i = 0; i < explosiveData[1].length; i++) {
        var types = explosiveData[1][i];
        if (catId === types.category) {
          $("#oDiv").append(`
          <div class="names">${types.name}</div>
          <div class="description">${types.description}</div>
        `);
          for (let i = 0; i < explosiveData[2].length; i++) {
            var prods = explosiveData[2][i];
            for (let obj in prods) {
              // console.log("obj", obj);
              // this gets the number type in the prods obj to compare to types id and then output to DOM
              // can't use dot notation on variables, have to use square bracket notation
              if (types.id === prods[obj].type) {
                $("#oDiv").append(`
              <div class = "prodNames">${prods[obj].name}</div>
              <div class = "prodDesc">${prods[obj].description}</div>            
              `)
              };
            };
          };
        };
      };
    });
  })



  // ******************************
  // AJAX CALLS AND PROMISE RETURNS
  // ******************************


  // Resolve is used to broadcast that the action succeeded.
  // Reject is used to broadcast that the action failed.
  var getCategories = function() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "json/categories.json"
      }).done(function(data) {
        resolve(data);
      }).fail(function(xhr, status, error) {
        reject(error);
      });
    })
  };

  var getTypes = function(resultOfFirstXHR) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "json/types.json"
      }).done(function(data) {
        resolve(data);
      }).fail(function(xhr, status, error) {
        reject(error);
      });
    })
  };

  var getProducts = function(resultOfSecondXHR) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "json/products.json"
      }).done(function(data) {
        resolve(data);
      }).fail(function(xhr, status, error) {
        reject(error);
      });
    })
  };

  // need to get each object assigned to a variable 
  // so i can compare values on each object (like seasonal sales)?
  // reutnrs a promise because it returns getTypes which returns a promise
  // returns getTypes as a promise so method of .then can be run on it


  getCategories()
    .then(function(catData) {
      // then is a method on 
      explosiveData.push(catData.categories);
      // array and function return second funciton
      // console.log("categoriesPromise", catData);
      return getTypes();
    }).then(function(typeData) {
      explosiveData.push(typeData.types);
      // console.log("getTypes", typeData)
      return getProducts();
    }).then(function(prodData) {
      explosiveData.push(prodData.products);
      // console.log("getProducts", prodData)
      // console.log(explosiveData[0]);
      loadCategoriesPage();
    });


});
