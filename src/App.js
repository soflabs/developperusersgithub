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
      bookNameList: [],
      cardpush: []
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



   data = async () => {
  
    var rawResponse = await fetch('https://api.github.com/users');
    var response =  await rawResponse.json();
    console.log(response);
    this.setState({cardpush: response})
    
 
  }

  async componentDidMount(){
  
  await this.data()
}


uppercaseFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}


 

  render() {


    var booksList = this.state.cardpush.map((book, i) => {
      console.log("book===>", book);
      console.log("iiiiiiiiiiiiiii===>", i);


      return (
        <Books
          key={i}
          bookName={this.uppercaseFirstLetter(book.login) }
          bookDesc={book.location}
          bookImg={book.avatar_url}
          repository={book.html_url}
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
              <img src="./Assets/img/books.svg" style={{ width: 50 }} />
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
              My Dev
            </NavLink>
          </NavItem>
          <NavItem>
            <Button
              id="Popover1"
              onClick={this.togglePopOver}
              color="secondary"
            >
              {this.state.bookCount}
              {this.state.bookCount > 1 ? "Devs" : "Dev"}
            </Button>
            <Popover
              placement="bottom"
              isOpen={this.state.isOpenPopOver}
              target="Popover1"
              toggle={this.togglePopOver}
            >
              <PopoverHeader>last Dev</PopoverHeader>
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
