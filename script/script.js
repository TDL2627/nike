// Part 5: Using Promise and Fetch to get JSON data

// CREATE, READ, UPDATE, DELETE, SEARCH, SORT
var nikeList = document.getElementById('shoes');

let shoes = new Promise(resolve => {
  fetch("shoes.json")
  .then(res => {
    if(res.status !== 200) {
      throw new Error('Cannot fetch the shoes');
    }
    return res.json()
  })
  .then(data => resolve(data))
  .catch(err => alert(err.message))
});

// Counter: Number of shoes in the array
countshoes = data => {
  var count = document.getElementById('counter');
  if (data) {
    count.innerHTML = 'There are a total of ' + data + ' shoes';
    // Show the heading text for the table
    document.getElementById('name').style.display = 'block';
  } else {
    count.innerHTML = 'No nike';
    // Hide the heading text for the table
    document.getElementById('name').style.display = 'none';
    document.getElementById('price').style.display = 'none';
  }
};
// Read: GET
getshoes = () => {
  shoes.then(allshoes => {
    var data = '';
    if (allshoes.length === 0) {
      throw new Error("There is no shoes to display")
    }
    for (i = 0; i < allshoes.length; i++) {
      data += '<tr>';
      data += '<td>' + allshoes[i].name + '</td>';
      data += '<td>' + allshoes[i].price + '</td>';
      data += '<td><button onclick="editnike(' + i + ')">Edit</button></td>';
      data += '<td><button onclick="deletenike(' + i + ')">Delete</button></td>';
      data += '</tr>';
    }
    countshoes(allshoes.length);
    return nikeList.innerHTML = data;
  })
  .catch(err => alert(err.message));
};
// Create: POST
addnike = () => {
  var nikeAdded = document.getElementById('add-nike').value.trim();
  var priceAdded = document.getElementById('add-price').value.trim();
  shoes.then(allshoes => {
    if(!nikeAdded || !priceAdded) {
      throw new Error('You have not inserted a value in one of the input fields');
    }
    let foundnike = allshoes.find(nike => nike.name.toLowerCase().includes(nikeAdded.toLowerCase()));
    if(foundnike) {
      throw new Error('You are adding a duplicate value');
    }
    // Get the value
    var nikeDetails = {
      name: nikeAdded,
      price: priceAdded
    }
    if (nikeDetails) {
      // addnike the new value
      allshoes.push(nikeDetails);
      // Reset input value
      nikeAdded.value = '';
      // Dislay the new list
      getshoes();
    }
  }).catch(err => alert(err.message));
};
// Update: PUT
editnike = item => {
  var editnike = document.getElementById('edit-nike');
  var editprice = document.getElementById('edit-price');
  shoes.then(allshoes => {
    // Display value in the field
    editnike.value = allshoes[item].name;
    editprice.value = allshoes[item].price;
    // Display fields
    document.getElementById('editForm').style.display = 'block';
    // When the form is submitted
    document.getElementById('saveEdit').onsubmit = () => {
      if(!editnike.value.trim() || !editprice.value.trim()) {
        throw new Error('You have not inserted a value in one of the input fields');
      }
      // Get value
      var nikeDetails = {
        name: editnike.value,
        price: editprice.value
      };

      if (nikeDetails) {
        // editnike value
        allshoes.splice(item, 1, nikeDetails);
        // Display the new list
        getshoes();
        // Hide fields
        closeInput();
      }
    }
  }).catch(err => alert(err.message));
};
// Delete: Delete
deletenike = item => {
  shoes.then(allshoes => {
    // deletenike the current row
    allshoes.splice(item, 1);
    // Display the new list
    getshoes();
  }).catch(err => alert(err.message));
};
// Search: nike Search
searchbar = () => {
  var searchednike = document.getElementById('search').value.trim();
  shoes.then(allshoes => {
    if (!searchednike) {
      throw new Error('Nothing was entered in the search bar');
    }
    // Filter all the shoes in the array with value typed into the input field
    let shoesFound = allshoes.filter(nike => nike.name.toLowerCase().includes(searchednike.toLowerCase()));
    if(shoesFound.length === 0) {
      throw new Error('No shoes were found');
    }
    var data = '';
    for (i = 0; i < shoesFound.length; i++) {
      data += '<tr>';
      data += '<td>' + shoesFound[i].name + '</td>';
      data += '<td>' + shoesFound[i].price + '</td>';
      data += '<td><button onclick="editnike(' + i + ')">Edit</button></td>';
      data += '<td><button onclick="deletenike(' + i + ')">Delete</button></td>';
      data += '</tr>';
    }
    countshoes(shoesFound.length);
    return nikeList.innerHTML = data;
  }).catch(err => alert(err.message));
};

// Sort: Sort shoes alphabetically
sortshoes = () => {
  shoes.then(allshoes => {
    // Sorting alphabetically in decending order
    allshoes.sort((a, b) => {
      let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();
      if (fa < fb) {
        return 1;
      }
      if (fa > fb) {
          return -1;
      }
      return 0;
    });
    getshoes();
  }).catch(err => alert(err.message));
}

// Sort: Sort prices alphabetically
sortprice = () => {
  shoes.then(allshoes => {
    // Sorting alphabetically in decending order
    allshoes.sort((a, b) => {
      let fa = a.price.toLowerCase(),
      fb = b.price.toLowerCase();
      if (fa < fb) {
        return 1;
      }
      if (fa > fb) {
          return -1;
      }
      return 0;
    });
    getshoes();
  }).catch(err => alert(err.message));
}

// Where the script starts. This executes when the file loads on the browser
getshoes();

// Close Edit form
closeInput = () => {
  document.getElementById('editForm').style.display = 'none';
}