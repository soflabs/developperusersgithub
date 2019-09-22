import React, { Component } from "react";
import {
  Row,
  Container,
  Nav,
  NavItem,
  NavLink,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Books from "./Books";

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleNavBar = this.toggleNavBar.bind(this);
    this.togglePopOver = this.togglePopOver.bind(this);
    this.handleClickLikeOn = this.handleClickLikeOn.bind(this);
    this.handleClickLikeOff = this.handleClickLikeOff.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isOpenNavBar: false,
      isOpenPopOver: false,
      viewOnlyLike: false,
      bookSelected: null,
      bookCount: 0,
      bookNameList: []
    };
  }

  toggleNavBar() {
    this.setState({
      isOpenNavBar: !this.state.isOpenNavBar
    });
  }

  togglePopOver() {
    this.setState({
      isOpenPopOver: !this.state.isOpenPopOver
    });
  }

  handleClickLikeOn() {
    console.log("click detecté on");
    this.setState({
      viewOnlyLike: true
    });
    console.log("===>handleClickLikeOn", this.state.viewOnlyLike);
  }
  handleClickLikeOff() {
    console.log("click detecé de off");
    this.setState({
      viewOnlyLike: false
    });
    console.log("===>handleClickLikeOff", this.state.viewOnlyLike);
  }

  // ce handelClick a pour but d'envoyer une information du composant books a son parent app , afin de liker un livre et afficher son nom dans le popover
  handleClick(isLike, addBookName) {
    console.log(
      "click detecté de handelCkick pour le  popover",
      isLike,
      addBookName
    );
    var bookNameListCopy = [...this.state.bookNameList];

    if (isLike) {
      bookNameListCopy.push(addBookName);

      this.setState({
        bookCount: this.state.bookCount + 1,
        bookNameList: bookNameListCopy
      });
    } else {
      var index = bookNameListCopy.indexOf(addBookName);
      bookNameListCopy.splice(index, 1);

      this.setState({
        bookCount: this.state.bookCount - 1,
        bookNameList: bookNameListCopy
      });
    }
  }

  render() {
    var cardpush = [
      {
        name: "Eloquent JavaScript",
        desc: "Marijn Haverbeke",
        img: "./Assets/img/bookjs.jpg"
      },
      {
        name: "JavaScript: The Good Parts",
        desc: "Douglas Crockford",
        img: "./Assets/img/bookjs2.jpg"
      },
      {
        name: "Up & Going",
        desc: "Kyle Simpson",
        img: "./Assets/img/bookjs3.jpg"
      },
      {
        name: "Learn JavaScript & jQuery ",
        desc: "Jon Duckett",
        img: "./Assets/img/javascript-and-jquery-book.png"
      },
      {
        name: "Learn JavaScript VISUALLY ",
        desc: " Ivelin Demirov",
        img: "./Assets/img/Learn-JavaScript-VISUALLY.jpg"
      }
    ];
    var booksList = cardpush.map((book, i) => {
      console.log("book===>", book);
      console.log("iiiiiiiiiiiiiii===>", i);

      return (
        <Books
          bookName={book.name}
          bookDesc={book.desc}
          bookImg={book.img}
          displayOnlyLike={this.state.viewOnlyLike}
          handleClickParent={this.handleClick}
        />
      );
    });

    let booksLast = this.state.bookNameList.slice(-3);
    if (this.state.bookCount === 0) {
      booksLast = "pas de livre";
    } else if (this.state.bookCount > 3) {
      booksLast = booksLast.join(",") + "...";
    } else {
      booksLast = booksLast.join(", ") + ".";
    }

    return (
      <Container>
        <Nav>
          <NavItem>
            <NavLink href="#">
              <img src="./Assets/img/books.png" style={{ width: 50 }} />
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              href="#"
              onClick={this.handleClickLikeOff}
              style={{ color: "#FFFFFF" }}
            >
              Last releases
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={this.handleClickLikeOn} style={{ color: "#FFFFFF" }} >
              My Books
            </NavLink>
          </NavItem>
          <NavItem>
            <Button
              id="Popover1"
              onClick={this.togglePopOver}
              color="secondary"
            >
              {this.state.bookCount}
              {this.state.bookCount > 1 ? "Books" : "Book"}
            </Button>
            <Popover
              placement="bottom"
              isOpen={this.state.isOpenPopOver}
              target="Popover1"
              toggle={this.togglePopOver}
            >
              <PopoverHeader>Derniers Livres</PopoverHeader>
              <PopoverBody>{booksLast}</PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
        <Row>{booksList}</Row>
      </Container>
    );
  }
}

export default App;
