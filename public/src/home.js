//Helper function to get length of an array
const _getLength = (array) => array.length;

function getTotalBooksCount(books) {
  //Helper function to get length of an books
  return _getLength(books);
}

function getTotalAccountsCount(accounts) {
  //Helper function to get length of an accounts
  return _getLength(accounts);
}

function getBooksBorrowedCount(books) {
  //filters list of borrows from each book
  const isNotBorrowed = books.filter(book => book.borrows
      //Further filters each borrow to check if the returned value is false                                 
     .filter(eachBorrow => eachBorrow.returned === false)
      //If the arrays length is grater than 1,                               
     .length > 0);
  return isNotBorrowed.length;
}

function getMostCommonGenres(books) {
  const genres = books.map((book) => book.genre);
  const array = [];
  //map over book genres
  genres.map((genre) => {
    //for each genre, first check to see if genre already exists in array
    const genreLocation = array.findIndex((element) => element.name === genre);
    //second, if it exists, increase count by 1
    if (genreLocation >= 0) {
      array[genreLocation].count = array[genreLocation].count + 1;
      //else, if it don't exist, push a new genre object onto array with count of 1
    } else {
      array.push({ name: genre, count: 1 });
    }
  });
  //Sort the objects in array by their count values
  array.sort((a, b) => b.count - a.count);
  if (array.length > 5) {
    return array.slice(0, 5);
  }
  return array;
}

function getMostPopularBooks(books) {
  //Map function returns an array
  return books
  .map((book) => {
    //For each book, return an object with book title and length of borrows
   return { name: book.title, count: book.borrows.length };
  })
  //Sorts from largest to smallest
  .sort((bookA, bookB) => (bookA.count < bookB.count ? 1 : -1))
  //Slice returns first 5
  .slice(0, 5);
}


function getMostPopularAuthors(books, authors) {
  let output = [];
  authors.forEach((author) => {
    //For each author, create an author object
    let eachAuthor = {
      //Fill author object with authors full name
    name: `${author.name.first} ${author.name.last}`,
    count: 0
    };
    
    books.forEach((book) => {
      //For each book, check if the books author id matches the authors id
    if (book.authorId === author.id) {
      //if it does, add the the amount of borrows for that book to the count of created object
      eachAuthor.count += book.borrows.length;
    }
    });
    //Add the eachAuthor objects to the array
    output.push(eachAuthor);
  });
  //Sort the array of author objects sorted by their count
  return output.sort((a, b) => b.count - a.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
