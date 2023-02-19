// List of Books
let myLibrary = [];

// Book class
class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }
};

const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    // This stops form from submitting
    event.preventDefault();

    // Grabs the input values
    const author = document.getElementById("author");
    const title = document.getElementById("title");
    const pages = document.getElementById("pages");
    const read = document.getElementById("read");

    // Gets the table element
    const table = document.getElementById("book-table");

    // Creates A new class instance
    const newBook = new Book(author.value, title.value, pages.value, read.checked);
    // Making sure that the values aren't empty and then creates the table row and eachc cell
    if (author.value.length !== 0 || title.value.length !== 0 || pages.value.length !== 0) {
        // Moves the data to the list
        myLibrary.push(newBook);
        console.log(myLibrary)

        // Inserts new row into table and adds a class of row
        const newBookRow = table.insertRow();
        newBookRow.classList.add("books");

        // Puts cells into rows
        const authorCell = newBookRow.insertCell(0);
        const titleCell = newBookRow.insertCell(1);
        const pagesCell = newBookRow.insertCell(2);
        const readCell = newBookRow.insertCell(3);
        const deleteCell = newBookRow.insertCell(4);


        // Making the inner html of each cell the value of each input box
        authorCell.innerHTML = author.value;
        titleCell.innerHTML = title.value;
        pagesCell.innerHTML = pages.value;

        // Creates the checkbox element for each item
        const readCheckbox = document.createElement("input");
        readCheckbox.setAttribute("type", "checkbox");
        readCheckbox.classList.add("checkbox");
        readCheckbox.classList.add("checkbox-in-list");
        readCheckbox.classList.add("form-check-input");

        // Checks if read is true or not so it adds it correctly to the new book node
        if (read.checked === true) {
            readCheckbox.checked = true;
        } else {
            readCheckbox.checked = false;
        }

        // Makes delete button for each item
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("button");
        deleteButton.classList.add("delete");
        deleteButton.innerHTML = "Delete";
        deleteButton.classList = "btn btn-secondary"

        // Appends child to the cell it belongs in
        readCell.appendChild(readCheckbox);
        deleteCell.appendChild(deleteButton);

        // Clears the input for the next book
        author.value = "";
        title.value = "";
        pages.value = "";
        read.checked = false;

        // Checks the read checkbox and updates the list
        // I subtract one from index because it starts at 1 because of the title row
        readCheckbox.addEventListener("click", () => {
            if (readCheckbox.checked === true) {
                myLibrary[newBookRow.rowIndex - 1]["read"] = true;
            } else if (readCheckbox.checked === false) {
                myLibrary[newBookRow.rowIndex - 1]["read"] = false;
            }
        });

        // Deletes row noded from document and updates the list
        deleteButton.addEventListener("click", () => {
            const tableHeader = document.getElementById("tbody-of-books")
            tableHeader.removeChild(newBookRow);
            myLibrary.splice(newBook.index, 1);
            // Reindexes each row after each delete
            for (let item in myLibrary) {
                myLibrary[item]["index"] = item;
            }
            console.log(newBook.index);
            console.log(myLibrary);
        });

        // Adds an index to each row after each submit
        for (let item in myLibrary) {
            myLibrary[item]["index"] = item;
        }
    };
});