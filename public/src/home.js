//Helper functions to get length of an array
const _getLength = (array) => array.length;
const _sorterSlice = (array) => array.sort((a, b) => b.count - a.count).slice(0, 5)

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
  return _getLength(isNotBorrowed);
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
  let output = books
  .map((book) => {
    //For each book, return an object with book title and length of borrows
   return { name: book.title, count: book.borrows.length };
  })
  //Helper function
  return _sorterSlice(output)
}

function sorter(objects){
  return Object.entries(objects).sort((a,b) => b[1]-a[1])
}

function getMostPopularAuthors(books, authors) {
  // we are going to use reduce to get an array of objects that have 
  const authorList = books.reduce((acc, book) => { 
    // destruct authorId and Borrows from book
    const { authorId, borrows } = book; 
    const authorObj = authors.find(author => author.id === authorId);
    //authors first/last name
    const name = `${authorObj.name.first} ${authorObj.name.last}`; 
    const count = borrows.length;  
    // see if we already have an entry for this author in the accumulator
    const authExists = acc.find(auth => auth.name === name);
    if(authExists) {
      authExists.count += count;
    } else {
      const newAuthEntry = {
        name,
        count
      };
      acc.push(newAuthEntry);
    }
    return acc;
  }, []);
  return _sorterSlice(authorList)
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
