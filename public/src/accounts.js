function findAccountById(accounts, id) {
  //Finds an acount id that matches the users id argument
  return accounts.find(account => account.id === id)
}

function sortAccountsByLastName(accounts) {
  const lastNames = accounts.sort((accountLeft, accountRight) => 
    accountLeft.name.last.toLowerCase() > accountRight.name.last.toLowerCase() ? 1 : -1)
  return lastNames;
}


function getTotalNumberOfBorrows(account, books) {
  let totalBorrows = 0;
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++) {
      //if account id matches each books borrows id
    if (account.id === books[i].borrows[j].id) {
      //Increase total borrows by 1
      totalBorrows += 1;
    }
    }
  }
  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  //filters each book borrow by id that matches account id AND borrow by unavailable books
  return books.filter(book => book.borrows[0].id === account.id && book.borrows[0].returned === false)
  //for each book find author id that matches books authorID
    .map(book => {
      book.author = authors.find(author => author.id === book.authorId)
      return book
    })
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
