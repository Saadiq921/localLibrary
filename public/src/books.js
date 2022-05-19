function findAuthorById(authors, id) {
  //Returns first author with an id that matches the given id;
   return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  //Returns first book with an id that matches the given id;
    return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const isNotBorrowed = [];
  const bookAvailability = [];
  const isBorrowed = [];
  //For each book store its availability value in isBookReturned;
  books.forEach((book) => {
    //Returns the returned value of the specific book
    const isBookReturned = book.borrows[0].returned;
  //If isBooksReturned returns true, it means it is borrowed.
  if (isBookReturned) { 
    //If it returns true, push to the isBorrowed array
    isNotBorrowed.push(book);
  } else { 
    //Else if it isn't returned, put it in the isNotBorrowed array
    isBorrowed.push(book);
  }
  });
  bookAvailability.push(isBorrowed);
  bookAvailability.push(isNotBorrowed);
  return bookAvailability;
}

function getBorrowersForBook(book, accounts) {
  return book.borrows
  //returns an array
  .map((borrow) => {
    //for each borrow, find acounts id that match the borrow id
   let account = accounts.find((account) => account.id === borrow.id);
   return { ...borrow, ...account };
  })
  .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
