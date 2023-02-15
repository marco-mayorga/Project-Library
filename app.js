// Constants
const addBookButton = document.getElementById("add-book-button");


// Prevents default action and doesn't submit form on click.
const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
});

let myLibrary = [];
class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }
}


// Adds books to myLibrary list
function addBookToLibrary() {
    // Grabbing the input values
    const author = document.getElementById("author").value;
    const title = document.getElementById("title").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    const newBook = new Book(author, title, pages, read);
    // Making sure that the values aren't empty
    if (author.length != 0 || title.length != 0 || pages.length != 0) {
        myLibrary.push(newBook);
        console.log(myLibrary);
        displayBook();
    }

}

function deleteBookFromList(index) {
    myLibrary.splice(index, 1);
}

// Loops through books in list and displays them
let lastIndex = 0
function displayBook() {
    // Loops through all items in list
    for (let i = lastIndex; i < myLibrary.length; i++) {

        let table = document.getElementById("book-table");
        // inserting first row with book data and inserting the cells into the row
        let newBookRow = table.insertRow(i + 1);
        let authorCell = newBookRow.insertCell(0);
        let titleCell = newBookRow.insertCell(1);
        let pagesCell = newBookRow.insertCell(2);
        let readCell = newBookRow.insertCell(3);
        let deleteCell = newBookRow.insertCell(4);
        // Making the inner html of each cell what it needs to be
        authorCell.innerHTML = myLibrary[i].author;
        titleCell.innerHTML = myLibrary[i].title;
        pagesCell.innerHTML = myLibrary[i].pages;
        // Checks if read is true or not and creates the checkbox element
        let readCheckbox = document.createElement("input");
        readCheckbox.setAttribute("type", "checkbox");
        readCell.appendChild(readCheckbox);
        if (myLibrary[i].read === true) {
            readCheckbox.checked = true;
        } else {
            readCheckbox.checked = false;
        }

        // Delete button
        let deleteButton = document.createElement("button");
        let buttonText = document.createTextNode("Delete");
        deleteButton.classList = "delete-button"
        deleteButton.appendChild(buttonText);
        deleteCell.appendChild(deleteButton);
        // Updates the last object (book) index
        deleteButton.addEventListener("click", deleteBookFromList(i));

        lastIndex = i + 1;
        console.log(lastIndex)
    }


}


// Calls the addBooksToLibrary Function when addbookbutton is pressed.
addBookButton.addEventListener("click", addBookToLibrary);

// TO_DO
// Make A button to remove one book