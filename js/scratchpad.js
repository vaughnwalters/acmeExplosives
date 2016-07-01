function loadCategoriesPage () {
  categoriesArray = explosiveData[0];
  for (var i=0; i<categoriesArray.length; i++) {
    var category = categoriesArray[i];
    console.log(category);
  }
}

    //add categories to selectDiv
    selector.innerHTML += 
    `<option id="season${i}" value="${categoriesArray[i].season_discount}">
    ${categoriesArray[i].season_discount}</option>`
  };

  winter = document.getElementById("season0");
  autumn = document.getElementById("season1");
  spring = document.getElementById("season2");







function getSongs() {
  return new Promise((resolve, reject) => {

    $.ajax({
      url: "categories.json"
    }).done(getCategories);

  });
}
// This function does one thing, and returns a promise
var getCategories = function() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "categories.json"
    }).done(function(data) {
      resolve(data.categories);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  }
};

// Now you can invoke the function, and use the then() method on the Promise
//  to specify code to be executed on success and failure. You will write a callback function for each case.

// /*
//   asyncFunction().then(resolveFunctionReference, rejectFunctionReference)
//  */


//Original call site of the promise
getSongs()
  // Then gets executed when promise is resolved or rejected
  .then(
    // The first callback function will be invoked when you resolve
    function(json_data) {
      console.log("API call successful and responded with", json_data);
    },
    // The second callback function will be invoked when you reject
    function(json_data) {
      console.log("API call not successful");
    }
  );
