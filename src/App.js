import React, { Component } from 'react';
import {
  Row,
  Col,
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Popover,
  PopoverHeader,
  PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

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
  })
  console.log("===>handleClickLikeOn", this.state.viewOnlyLike);

}
handleClickLikeOff() {
  console.log("click detecé de off");
  this.setState({
    viewOnlyLike : false
  })
  console.log("===>handleClickLikeOff", this.state.viewOnlyLike);

}

// ce hendelClick c'est pour envoyer une information du composant books a son parent app , afin de liké un livre et afficher son nom dans le popover
handleClick(isLike, addBookName) {
console.log("click detecté de handelCkick pour le  popover", isLike, addBookName);
var bookNameListCopy = [...this.state.bookNameList];


if (isLike) {
  bookNameListCopy.push(addBookName);

  this.setState({
    bookCount: this.state.bookCount + 1,
    bookNameList: bookNameListCopy,
})

} else {

  var index = bookNameListCopy.indexOf(addBookName)
  bookNameListCopy.splice(index, 1);

  this.setState({
    bookCount: this.state.bookCount - 1,
    bookNameList: bookNameListCopy,

})
}

// this.setState({
//     bookSelected : addBookName,
// })
}

  render() {
    
    var cardpush = [
      {name : "Le New-yorker", desc : "Le Amberger", img: "./Assets/img/bookjs.jpg"},
      {name : "Le Classic", desc : "Le Amberger", img: "./Assets/img/bookjs2.jpg"},
      {name : "so javascript", desc : "Le Amberger", img: "./Assets/img/bookjs3.jpg"},
      {name : "Le New-code js ", desc : "Le Amberger", img: "./Assets/img/bookjs.jpg"},

    ];
    var booksList = cardpush.map((book, i) => {
console.log("book===>", book );
console.log("iiiiiiiiiiiiiii===>", i );

return (<Books bookName={book.name} bookDesc={book.desc} bookImg={book.img} displayOnlyLike={this.state.viewOnlyLike} handleClickParent={this.handleClick }  />)
    });


    let booksLast = this.state.bookNameList.slice(-3)
if (this.state.bookCount === 0 ) {
  booksLast = "pas de livre";
} else if (this.state.bookCount > 3){
booksLast = booksLast.join("," ) + "...";  
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
            <NavLink  href="#" onClick={this.handleClickLikeOff} style={{color: "#FFFFFF"}}> Last releases</NavLink>
          </NavItem>
          <NavItem>
            <NavLink  href="#" onClick={this.handleClickLikeOn} style={{color: "#FFFFFF"}}> my Books</NavLink>
          </NavItem>
          <NavItem>
            <Button id="Popover1" onClick={this.togglePopOver} color="secondary" >
              {this.state.bookCount}{this.state.bookCount > 1 ? 'Books' : 'Book'}  
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






   


class Books extends Component {

 constructor(){
    super()
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      like: false
    }
  }


  handleClick(){
    console.log("click détéctééééé", !this.state.like);
    var isLike = !this.state.like;

    this.setState({
      like: isLike
    });
    this.props.handleClickParent(isLike, this.props.bookName);  

  } 
  render() {
    var styleHeart = {
      color: "black",
      position: "absolute",
      bottom: "5%",
      left: "80%",
      cursor: "pointer"
    };
    if(this.state.like){
      styleHeart.color = '#1976D2';
    }

    var display = null;
    if(this.props.displayOnlyLike && !this.state.like) {
      display = {
        display: 'none'
      }
    }

    return (
      <Col xs="12" sm="6" md="4" lg="3" style={display}>
        <div style={{ marginTop: "15px" }}>
          <Card>
            <CardImg
              top
              width="100%"
              src={this.props.bookImg}
              alt="Card image cap"
            />
            <FontAwesomeIcon onClick={this.handleClick} size="2x" icon={faThumbsUp} style={styleHeart}  />
            <CardBody>
              <CardTitle> {this.props.bookName} </CardTitle>
              <CardText>
               {this.props.bookDesc}
              </CardText>
            </CardBody>
          </Card>
        </div>
      </Col>
    );
  }
}

export default App;
