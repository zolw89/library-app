// modal

const openModalBtn = document.querySelector('.add-book');
const modalBox = document.querySelector('.modal-box')
const overlay = document.querySelector('.overlay')

openModalBtn.addEventListener('click', () => {
    overlay.classList.add('active')
    modalBox.classList.add('active')

})

overlay.addEventListener('click', () => {
    modalClose()
})

const modalClose = () => {
    modalBox.classList.remove('active')
    overlay.classList.remove('active')
}

// book add app

const bookTitle = document.querySelector('#title')
const bookAuthor = document.querySelector('#author')
const bookPages = document.querySelector('#pages')
const check = document.querySelector('#isRead')

let myLibrary = [];


const submitBtn = document.querySelector("#submit").addEventListener("click", (e) => {
    if(bookTitle.value === "" || bookAuthor.value === '' || bookPages.value === '') return console.log("please fill inputs");
    e.preventDefault();
    addBookToLibrary();
    modalClose();
    clearInputs(); 
    removeFromLibrary();  
    isReadChange()
});


class Book {
    constructor(
      title = 'Unknown',
      author = 'Unknown',
      pages = '0',
      isRead = false
    ) {
      this.title = title
      this.author = author
      this.pages = pages
      this.isRead = isRead
    }
  }

//add ew book to Library

const addBookToLibrary = () => {
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, check.checked);
    myLibrary.push(newBook);
    render()
  }

//clear inputs after submit button

const clearInputs = () => {
    document.querySelector('form').reset()
};

//render html box with book

const render = () => {
    const booksDiv = document.querySelector('.books');
    const boxDiv = document.createElement('div');
    boxDiv.classList.add('box');
    boxDiv.setAttribute('id', `${bookTitle.value}`);
    booksDiv.appendChild(boxDiv);
    const pTitle = document.createElement('p');
    pTitle.classList.add('title')
    boxDiv.appendChild(pTitle);
    pTitle.textContent = bookTitle.value;

    const pAuthor = document.createElement('p');
    boxDiv.appendChild(pAuthor);
    pAuthor.classList.add('author')
    pAuthor.textContent = bookAuthor.value;
    const pPages = document.createElement('p');
    boxDiv.appendChild(pPages);
    pPages.classList.add('pages')
    pPages.textContent = bookPages.value;

    const isReadBtn = document.createElement('button');
    boxDiv.appendChild(isReadBtn);
    isReadBtn.setAttribute('id', `${bookTitle.value}`)
    console.log(check.checked)
    if(check.checked === true) {
        isReadBtn.classList.add('read', 'removeBtn')
        isReadBtn.textContent = 'Read';
    } else {
        isReadBtn.classList.add('removeBtn')
        isReadBtn.textContent = 'Not read';
    }

    const removeBtn = document.createElement('button');
    boxDiv.appendChild(removeBtn);
    removeBtn.classList.add('remove')
    removeBtn.setAttribute('id', `${bookTitle.value}`)
    removeBtn.textContent = 'Remove';
}

//remove button

const removeFromLibrary = () => {
    let removeBtns = document.querySelectorAll('.remove');
    removeBtns.forEach(btn => btn.addEventListener('click', () => {
        for(let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].title == btn.id) {
                myLibrary.splice(i, 1)
                const boxDiv = document.getElementById(`${btn.id}`);
                boxDiv.remove()
            }
        }
    }))
}

// isRead button

const isReadChange = () => {
    let isReadBtn = document.querySelectorAll('.removeBtn')  
    isReadBtn.forEach(btn => btn.addEventListener('click', (e) => {       
        e.stopImmediatePropagation();
        console.log(btn.id)
        for(let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].title == btn.id) {
                if(myLibrary[i].isRead === true) {
                    btn.classList.toggle('read');
                    myLibrary[i].isRead = false;
                    btn.textContent = 'Not Read'
                } else if(myLibrary[i].isRead === false)  {
                    btn.classList.toggle('read');
                    myLibrary[i].isRead = true;
                    btn.textContent = 'Read'
            } 
            }
        } 
    })
)}




