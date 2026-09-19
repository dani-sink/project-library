const showButton = document.querySelector("#showDialog");
const myDialog = document.querySelector("#my-dialog");
const cancelBtn = myDialog.querySelector('#cancel-btn');
const confirmBtn = myDialog.querySelector('#confirm-btn');
const dialogForm = document.querySelector("#my-dialog-form");
const bookCardContainer = document.querySelector('#book-card-container');



function Book(title, author, pages, read){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
    this.info = function () {
        console.log(`${this.title} by ${this.author}, ${pages} pages, ${read ? 'already red' : 'not read yet'}`)
    }

}


let myLibrary = [
    new Book("The Hobbit", "J.R.R. Tolkien", 295, true),
    new Book("1984", "George Orwell", 328, false),
    new Book("Clean Code", "Robert C. Martin", 464, true),
    new Book("Dune", "Frank Herbert", 412, false),
    new Book("The Pragmatic Programmer", "Andrew Hunt & David Thomas", 352, true)
];

Book.prototype.toggleRead = function(id) {
    myLibrary = myLibrary.map(function(item) {
        if (item.id === id) {
            item.read = !item.read;
        }
        return item;
    });
    bookCardContainer.replaceChildren(showButton);
    displayBooks(); 
}


function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
}

function deleteBookCard(id) {
    myLibrary = myLibrary.filter(item => item.id !== id);
    bookCardContainer.replaceChildren(showButton);
    displayBooks();
}

function createBookCard(book) {
    
    const bookCard = document.createElement('div');
    bookCard.classList.add("book-card");

    bookCard.dataset.id = book.id;

    const bookTitle = document.createElement('p');
    bookTitle.textContent = book.title;
    bookTitle.classList.add("book-title");
    
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = book.author;
    bookAuthor.classList.add("book-author");

    const bookPages = document.createElement('p');
    bookPages.textContent = String(book.pages) + " pages";
    bookPages.classList.add("book-pages");

    const readStatusBadge = document.createElement('div');
    readStatusBadge.classList.add('read-status-badge');
    if (book.read) {
        readStatusBadge.classList.add('green-bkg');
        readStatusBadge.innerHTML = `
        <svg class="read" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>
        <p class="green-text">Read</p>
        `;
    } else {
        readStatusBadge.innerHTML = `
        <svg class="not-read" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.5C10.65 20.65 8.2 20 6.5 20C4.85 20 3.15 20.3 1.75 21.05C1.65 21.1 1.6 21.1 1.5 21.1C1.25 21.1 1 20.85 1 20.6V6C1.6 5.55 2.25 5.25 3 5C4.11 4.65 5.33 4.5 6.5 4.5C8.45 4.5 10.55 4.9 12 6C13.45 4.9 15.55 4.5 17.5 4.5C18.67 4.5 19.89 4.65 21 5C21.75 5.25 22.4 5.55 23 6V20.6C23 20.85 22.75 21.1 22.5 21.1C22.4 21.1 22.35 21.1 22.25 21.05C20.85 20.3 19.15 20 17.5 20C15.8 20 13.35 20.65 12 21.5M11 7.5C9.64 6.9 7.84 6.5 6.5 6.5C5.3 6.5 4.1 6.65 3 7V18.5C4.1 18.15 5.3 18 6.5 18C7.84 18 9.64 18.4 11 19V7.5M13 19C14.36 18.4 16.16 18 17.5 18C18.7 18 19.9 18.15 21 18.5V7C19.9 6.65 18.7 6.5 17.5 6.5C16.16 6.5 14.36 6.9 13 7.5V19Z" /></svg>
        <p>Not Read</p>
        `;
    }

    const divider = document.createElement('hr');
    divider.classList.add('divider');

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('action-buttons-container');

    const toggleButton = document.createElement('button');
    toggleButton.classList.add('toggle-button');
    toggleButton.textContent = "Toggle Read";
    toggleButton.addEventListener("click", function(e) {
        if (e.target.tagName === "BUTTON") {
            book.toggleRead(e.target.parentElement.parentElement.dataset.id);
        }
    })

    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = `
    <svg class="delete-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
    `
    deleteButton.addEventListener("click", function(e) {
        if (e.target.tagName === "BUTTON"){
            deleteBookCard(e.target.parentElement.parentElement.dataset.id);
        }
    })

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(readStatusBadge);
    bookCard.appendChild(divider);
    buttonsContainer.appendChild(toggleButton);
    buttonsContainer.appendChild(deleteButton);
    bookCard.appendChild(buttonsContainer);

    return bookCard;
}

function displayBooks() {
    for (const book of myLibrary) {
        const bookCard = createBookCard(book);
        bookCardContainer.appendChild(bookCard);
    }

    document.body.appendChild(bookCardContainer);
}

// "New book" button opens the <dialog> modally
showButton.addEventListener("click", function(){
    myDialog.showModal();
});


// Prevent the "cancel" button from the default behavior of submitting the form, and close the dialog with `close()` method, which triggers the "close" event.
cancelBtn.addEventListener("click", function(event) {
    event.preventDefault();

    myDialog.close();
    dialogForm.reset();
})

 
// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", function(event) {
    event.preventDefault(); // We don't want to submit this fake form

    if (dialogForm.checkValidity()) {
        const bookTitle = dialogForm.querySelector('#title');
        const bookAuthor = dialogForm.querySelector('#author');
        const numPages = dialogForm.querySelector('#pages');
        const isRead = dialogForm.querySelector('#read');
    
        const newBook = addBookToLibrary(bookTitle.value, bookAuthor.value, numPages.value, isRead.checked);
         
        const newBookCard = createBookCard(newBook);
        bookCardContainer.appendChild(newBookCard);
        myDialog.close();
        dialogForm.reset();
    } else {
        dialogForm.reportValidity();
    }    
});

displayBooks();