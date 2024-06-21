class Book {
    constructor(title, author, ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.borrowed = false;
    }

    isBorrowed() {
        return this.borrowed;
    }

    borrow() {
        if (!this.borrowed) {
            this.borrowed = true;
            return true;
        }
        return false;
    }

    return() {
        this.borrowed = false;
    }
}

class User {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.borrowedBooks = [];
    }

    borrowBook(book) {
        if (this.borrowedBooks.length >= 3) {
            console.log('You have already borrowed 3 books.');
            return false;
        }
        if (book.borrow()) {
            this.borrowedBooks.push(book);
            return true;
        }
        console.log('Book is already borrowed.');
        return false;
    }

    returnBook(ISBN) {
        const index = this.borrowedBooks.findIndex(book => book.ISBN === ISBN);
        if (index !== -1) {
            this.borrowedBooks[index].return();
            this.borrowedBooks.splice(index, 1);
            return true;
        }
        console.log('Book not found in your borrowed list.');
        return false;
    }

    peekBook(ISBN) {
        const book = this.borrowedBooks.find(book => book.ISBN === ISBN);
        return book ? book : null;
    }
}

class Library {
    constructor() {
        this.books = [];
        this.members = [];
    }

    addNewBook(book) {
        this.books.push(book);
    }

    registerMember(user) {
        this.members.push(user);
    }

    borrowBook(user, ISBN) {
        const book = this.books.find(book => book.ISBN === ISBN);
        if (book) {
            return user.borrowBook(book);
        }
        console.log('Book not found in the library.');
        return false;
    }
}

// Example Usage

const library = new Library();

const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', '1234567890');
const book2 = new Book('1984', 'George Orwell', '0987654321');
const book3 = new Book('To Kill a Mockingbird', 'Harper Lee', '1029384756');

library.addNewBook(book1);
library.addNewBook(book2);
library.addNewBook(book3);

const user = new User('John Doe', 'user1');

library.registerMember(user);

library.borrowBook(user, '1234567890'); 
library.borrowBook(user, '0987654321'); 
library.borrowBook(user, '1029384756'); 
library.borrowBook(user, '1111111111'); 


library.borrowBook(user, '1234567890'); 

user.returnBook('1234567890'); 

library.borrowBook(user, '1029384756'); 

console.log(user.borrowedBooks);


console.log(user.peekBook('0987654321'));


user.returnBook('0987654321');
user.returnBook('1029384756');

console.log(user.borrowedBooks); 
