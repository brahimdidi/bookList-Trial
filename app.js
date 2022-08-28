const authorInput = document.getElementById('book-author');
const titleInput = document.getElementById('book-title');
const submitBtn = document.getElementById('submit-btn');
const data = document.querySelector('.data');
const addBookSection = document.getElementById('section-add-book');
class Book {
  constructor(title,author,id){
    this.title = title;
    this.author = author;
    this.id = id
  }
};
let books = JSON.parse(localStorage.getItem('books')); if(!books) books  = [];
const saveBooks = (book) => {
  books = JSON.parse(localStorage.getItem('books'));
  books.push(book);
  localStorage.setItem('books',JSON.stringify(books));
};
const removeBook = (id) => {
  let target = document.getElementById(id);
  target.remove()
  let currentBooks = JSON.parse(localStorage.getItem('books'));
  currentBooks = currentBooks.filter(b => b.id != id);
  localStorage.setItem('books',JSON.stringify(currentBooks));
};
const displayBooks = () => {
  data.innerHTML = '';
  let showBooks = JSON.parse(localStorage.getItem('books'));
  if (showBooks) {
    for(let book of showBooks) {
      let li = document.createElement('li');
      li.innerHTML =  `<span>title: ${book.title} </span><span>author: ${book.author}</span>
      <button class = 'btn btn-danger'>delete</button> `;
      li.id = book.id;
      li.classList.add('list-group-item' ,'book-li');
      data.appendChild(li)
      li.addEventListener('click',(e)=> {
        let target = e.target;
        if (target.textContent == 'delete'){ removeBook(li.id)};
      })
    }
  }
};
const addBook = () => {
  let title = titleInput.value;
  let author = authorInput.value;
  if (!title.trim() || !author.trim() ) return alert('title and author can not be blank');
  let id = Math.floor(Math.random() * 2329010);
  let book =new Book(title,author,id)
  saveBooks(book);
  displayBooks();
  titleInput.value = '';authorInput.value = '';
};


window.addEventListener('load',displayBooks);
submitBtn.addEventListener('click',addBook);
addBookSection.addEventListener('keypress', (e) => { if (e.key === 'Enter') addBook() });




