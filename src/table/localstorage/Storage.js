class Storage {
  storeItem(item) {
    let movieListA;
    // let arrayNote =[];
    // Check if any items in ls

    if (localStorage.getItem("movieItems") === null) {
      movieListA = [];
      // Push new item

      if (item.length >= 1) {
        movieListA = [...item];
      }

      if (item.length === 0) {
        movieListA.push(item);
      }

      // Set ls
      localStorage.setItem("movieItems", JSON.stringify(movieListA));
    } else {
      // Get what is already in ls
      movieListA = JSON.parse(localStorage.getItem("movieItems"));

      // Push new item
      if (item.length >= 1) {
        movieListA = [...item];
      }

      if (item.length === 0) {
        movieListA.push(item);
      }
      // Reset ls
      localStorage.setItem("movieItems", JSON.stringify(movieListA));
    }
  }

  getItemsFromStorage() {
    let movieListA;
    if (localStorage.getItem("movieItems") === null) {
      movieListA = [];
      return movieListA;
    } else {
      movieListA = JSON.parse(localStorage.getItem("movieItems"));
    }
    return movieListA;
  }

  updateItemStorage(updatedItem) {
    let movieListA = JSON.parse(localStorage.getItem("movieItems"));

    movieListA.forEach(function(item, index) {
      if (updatedItem.id === item.id) {
        movieListA.splice(index, 1, updatedItem);
      }
    });
    localStorage.setItem("movieItems", JSON.stringify(movieListA));
  }

  deleteItemFromStorage(id) {
    let movieListA = JSON.parse(localStorage.getItem("movieItems"));

    movieListA.forEach(function(item, index) {
      if (id === item._id) {
        movieListA.splice(index, 1);
      }
    });
    localStorage.setItem("movieItems", JSON.stringify(movieListA));
  }
  clearItemsFromStorage() {
    localStorage.removeItem("movieItems");
  }

  nameLast() {
    return "how are you";
  }
}
// module.exports = NoteStorage;
export default Storage;
