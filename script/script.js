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
countShoes = data => {
  var count = document.getElementById('counter');
  if (data) {
    count.innerHTML = 'There are a total of ' + data + ' shoes';
    // Show the heading text for the table
    document.getElementById('name').style.display = 'block';
  } else {
    count.innerHTML = 'No nike';
    // Hide the heading text for the table
    document.getElementById('name').style.display = 'none';
    document.getElementById('type').style.display = 'none';
  }
};
// Read: GET
getShoes = () => {
  shoes.then(allshoes => {
    var data = '';
    if (allshoes.length === 0) {
      throw new Error("There is no shoes to display")
    }
    for (i = 0; i < allshoes.length; i++) {
      data += '<tr>';
      data += '<td>' + [i+1] + '</td>';
      data += '<td>' + allshoes[i].name + '</td>';
      data += '<td>' + allshoes[i].type + '</td>';
      data += '<td>' + 'R'+ allshoes[i].price + '</td>';
      data +='<td> <img class="piks" src="'  + allshoes[i].image +'" alt="shoe pic" > </td>' ;
      data += '<td><button onclick="editNike(' + i + ')">Edit</button></td>';
      data += '<td><button onclick="deleteNike(' + i + ')">Delete</button></td>';
      data += '</tr>';
    }
    countShoes(allshoes.length);
    return nikeList.innerHTML = data;
  })
  .catch(err => alert(err.message));
};
// Create: POST
addNike = () => {
  var nikeAdded = document.getElementById('add-nike').value.trim();
  var typeAdded = document.getElementById('add-type').value.trim();
  var priceAdded = document.getElementById('add-price').value.trim();
  shoes.then(allshoes => {
    if(!nikeAdded || !typeAdded) {
      throw new Error('You have not inserted a value in one of the input fields');
    }
    let foundnike = allshoes.find(nike => nike.name.toLowerCase().includes(nikeAdded.toLowerCase()));
    if(foundnike) {
      throw new Error('You are adding a duplicate value');
    }
    // Get the value
    var nikeDetails = {
      name: nikeAdded,
      type: typeAdded,
      price:priceAdded
    }
    if (nikeDetails) {
      // addnike the new value
      allshoes.push(nikeDetails);
      // Reset input value
      nikeAdded.value = '';
      // Dislay the new list
      getShoes();
    }
  }).catch(err => alert(err.message));
};
// Update: PUT
editNike = item => {
  var editnike = document.getElementById('edit-nike');
  var edittype = document.getElementById('edit-type');
  shoes.then(allshoes => {
    // Display value in the field
    editnike.value = allshoes[item].name;
    edittype.value = allshoes[item].type;
    // Display fields
    document.getElementById('editForm').style.display = 'block';
    // When the form is submitted
    document.getElementById('saveEdit').onsubmit = () => {
      if(!editnike.value.trim() || !edittype.value.trim()) {
        throw new Error('You have not inserted a value in one of the input fields');
      }
      // Get value
      var nikeDetails = {
        name: editnike.value,
        type: edittype.value
      };

      if (nikeDetails) {
        // editnike value
        allshoes.splice(item, 1, nikeDetails);
        // Display the new list
        getShoes();
        // Hide fields
        closeInput();
      }
    }
  }).catch(err => alert(err.message));
};
// Delete: Delete
deleteNike = item => {
  shoes.then(allshoes => {
    // deletenike the current row
    allshoes.splice(item, 1);
    // Display the new list
    getShoes();
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
      data += '<td>' + shoesFound[i].type + '</td>';
      data += '<td><button onclick="editnike(' + i + ')">Edit</button></td>';
      data += '<td><button onclick="deletenike(' + i + ')">Delete</button></td>';
      data += '</tr>';
    }
    countShoes(shoesFound.length);
    return nikeList.innerHTML = data;
  }).catch(err => alert(err.message));
};

// Sort: Sort shoes alphabetically
sortShoes = () => {
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
    getShoes();
  }).catch(err => alert(err.message));
}

// Sort: Sort types alphabetically
sortType = () => {
  shoes.then(allshoes => {
    // Sorting alphabetically in decending order
    allshoes.sort((a, b) => {
      let fa = a.type.toLowerCase(),
      fb = b.type.toLowerCase();
      if (fa < fb) {
        return 1;
      }
      if (fa > fb) {
          return -1;
      }
      return 0;
    });
    getShoes();
  }).catch(err => alert(err.message));
}

// Where the script starts. This executes when the file loads on the browser
getShoes();

// Close Edit form
closeInput = () => {
  document.getElementById('editForm').style.display = 'none';
}
// modal
var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})