class BookCase extends React.Component {
  // props available here is id and shelfCount see line 108 where we assign the props

  // populate data depends on the this.props.shelfCount value
  populateBookShelf = () => {
    let count = 0;
    let bookShelvesArray = [];
    while (count < this.props.shelfCount) {
      count++;
      bookShelvesArray.push(<BookShelf id={count} key={count} />);
    }

    return bookShelvesArray;
  };

  render() {
    return (
      <div className="book-case">
        <span>Bookcase #: {this.props.id}</span>
        {this.populateBookShelf()}
      </div>
    );
  }
}

class BookShelf extends React.Component {
  render() {
    return <div className="book-shelf">Shelf {this.props.id}</div>;
  }
}

// Main Parent Component is Shop
// Two important things to know/learn in react is props and state.

// state = can hold information in type of values or objects. you can update this values using this.setState("your new values")
// Every time you call the setState method will make the app rerender itself to update the UI. nothing will update on your UI if you don't use the setState method.

// props = can be use to pass data from parent to child. eg. you can pass shelfCount data from Shop component into BookCase like this <BookCase shelfCount={this.state.shelfCount}/>
// then you can get the data from BookCase component like this => this.props.shelfCount

// component by levels: Shop -> BookShelf -> BookCase (where the shop is the parent component and BookCase is the most child component)
class Shop extends React.Component {
  constructor(props) {
    super(props);

    // Here is the data of the shop component we can update this values using this.setState("your new values")
    this.state = {
      shelfCount: 5,
      // Add profit value
      profit: 0,
      // better to pass the object data array rather than the function component array
      bookCases: [{id: 0, shelves: 5}],
    };
  }

  sellBookCase(id) {
    // selling logic base on the questions
    let bookCaseCopy = [...this.state.bookCases];
    const price = 5;
    let selectedBookCase = bookCaseCopy.find((item) => item.id === id);
    let n = selectedBookCase.shelves;
    let soldProfit = price + 2 * n;

    // remove the selected bookcase
    let newBookCaseCopy = bookCaseCopy.filter((item) => item.id !== id);
    // update the state profit
    this.setState({
      ...this.setState,
      profit: soldProfit + this.state.profit,
      bookCases: newBookCaseCopy,
    });
  }

  addBookCase() {
    // How would you handle a situation where this.state.shelfCount is undefined or 0? Can't make a bookcase without shelves, can you?
    // don't create book case if the shelf count is =< 0
    if (this.state.shelfCount <= 0) {
      alert('Cannot add an empty book case');
      return;
    }

    // TODO: add condition if the user inputs a non numeric character or add limitation to the input

    // since state is immutable object whenever you update the data on state, you need to copy the old values using (...) spread operator that is the shorthand in js to copy the existing values
    const bookCasesCopy = [...this.state.bookCases];
    // we use the length of the bookcase to get the next id of the newly created bookcase
    const length = bookCasesCopy.length;
    bookCasesCopy.push({
      id: length,
      shelves: this.state.shelfCount,
    });

    // spread/copy again the old state before updating the new state
    const newState = {
      ...this.state,
      bookCases: bookCasesCopy,
    };

    // this method will update the state data and rerender the UI base on the new values.
    this.setState(newState);
  }

  // Use to update the input field where the user interacts
  updateShelfCount(count) {
    const newState = {
      ...this.state,
      shelfCount: count,
    };
    this.setState(newState);
  }

  //  Main Render
  render() {
    return (
      <div className="shop">
        <div className="book-cases">
          {/* Iterate the number of bookcases */}
          {this.state.bookCases.map((value, idx) => {
            {
              /* Always add keys on component iteration to remove warnings and slow ui performance*/
            }
            return (
              <div className="bookcase-controls" key={value.id}>
                <BookCase shelfCount={value.shelves} id={value.id} key={idx} />
                <div className="sell-bookcase">
                  <button onClick={() => this.sellBookCase(value.id)}>
                    Sell
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="shop-info">
          <div>Number of bookcases: {this.state.bookCases.length}</div>
          <div>Total shop profits: {this.state.profit}</div>
          <div className="add-bookcase">
            <h3>Make a new bookcase:</h3>
            <label>
              Number of shelves:{' '}
              <input
                value={this.state.shelfCount}
                onChange={(e) => this.updateShelfCount(e.target.value)}
              />
            </label>
            <button onClick={() => this.addBookCase()}>Add</button>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Shop />, document.getElementById('root'));
