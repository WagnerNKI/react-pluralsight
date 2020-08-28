import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';


const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adverntures of Huckleberry Finn',
      'Life on the Mississippi',
      'Roughing It']
  },
  {
    name: 'JK Rowlin',
    imageUrl: 'images/authors/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Harry Potter and the Sorcerers Stone',
      'Harry Potter and the Chamber of Secrets',
      'Harry Potter and the Prisioner of Azkaban']
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['It',
      'The Shinning',
      'Pet Cemetery']
  }
];


function getTurnData(authors) {

  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books);
  }, []);

  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) => author.books.some((title) => title === answer))
  }
}


const state = {
  turnData: getTurnData(authors),
  highlight: ''
}

function onAnswerSelected(answer) {

  const isCorrect = state.turnData.author.books.some((book) => book === answer)

  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function render() {

  ReactDOM.render(
    <React.StrictMode>
      <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
