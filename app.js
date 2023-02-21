let myLibrary = [];
const form = document.getElementById("form");
const table = document.getElementById("book-table");

class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }
}

function createTableCells(author, title, pages, read, index) {
    const newBook = new Book(author.value, title.value, pages.value, read.checked);
    myLibrary[index] = newBook;

    const newBookRow = table.insertRow();
    newBookRow.classList.add("books");

    const authorCell = newBookRow.insertCell(0);
    const titleCell = newBookRow.insertCell(1);
    const pagesCell = newBookRow.insertCell(2);
    const readCell = newBookRow.insertCell(3);
    const deleteCell = newBookRow.insertCell(4);

    authorCell.textContent = author.value;
    titleCell.textContent = title.value;
    pagesCell.textContent = pages.value;

    const readCheckbox = document.createElement("input");
    readCheckbox.type = "checkbox";
    readCheckbox.id = "read" + index; // Set id for checkbox
    readCheckbox.classList.add("checkbox", "checkbox-in-list", "form-check-input");
    readCheckbox.checked = read.checked;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button", "delete");
    deleteButton.classList.add();
    deleteButton.innerHTML = "Delete";
    deleteButton.classList = "btn btn-secondary";

    readCell.appendChild(readCheckbox);
    deleteCell.appendChild(deleteButton);

    author.value = "";
    title.value = "";
    pages.value = "";
    read.checked = false;

    readCheckbox.addEventListener("click", () => {
        const checkboxIndex = Number(readCheckbox.id.replace("read", ""));
        myLibrary[checkboxIndex].read = readCheckbox.checked; // Update correct book in myLibrary
        saveToLocalStorage();
    });

    deleteButton.addEventListener("click", () => {
        table.deleteRow(newBookRow.rowIndex);
        myLibrary.splice(index, 1);
        localStorage.removeItem(newBook.index);
        myLibrary.forEach((book, index) => (book.index = index));
        saveToLocalStorage();
    });

    newBook.index = index;
    saveToLocalStorage();
}


function saveToLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadFromLocalStorage() {
    if (localStorage.getItem("myLibrary")) {
        myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
        myLibrary.forEach((book, index) => {
            createTableCells(
                { value: book.author },
                { value: book.title },
                { value: book.pages },
                { checked: book.read },
                index
            );
            book.index = index;
        });
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const author = document.getElementById("author");
    const title = document.getElementById("title");
    const pages = document.getElementById("pages");
    const read = document.getElementById("read");
    createTableCells(
        author,
        title,
        pages,
        read,
        myLibrary.length // Index of the newly added book
    );
});

if (performance.getEntriesByType("navigation")[0].type) {
    loadFromLocalStorage();
}
