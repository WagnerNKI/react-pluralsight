import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';
import AddAuthorForm from './AddAuthorForm';


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


function reducer(state = { authors, turnData: getTurnData(authors), highlight: '' }, action) {

  switch (action.type) {

    case 'ANSWER_SELECTED':
      const isCorrect = state.turnData.author.books.some((book) => book === action.answer)
      return Object.assign(
        {},
        state,
        { highlight: isCorrect ? 'correct' : 'wrong' })

    case 'CONTINUE':
      return Object.assign({}, state, {
        highlight: '',
        turnData: getTurnData(state.authors)
      });

      case 'ADD_AUTHOR':
        return Object.assign({},state,{
          authors: state.authors.concat([action.author])
        })

    default: return state;
  }
}

let store = Redux.createStore(reducer);

ReactDOM.render(
  <BrowserRouter>
  <ReactRedux.Provider store={store}>
    <React.Fragment>
      <Route exact path="/" component={AuthorQuiz} />
      <Route path="/add" component={AddAuthorForm} />
    </React.Fragment>

  </ReactRedux.Provider>

  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
