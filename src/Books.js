import React, { Component } from 'react';
import { Col, Card, CardImg, CardText, CardBody, CardTitle, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";




class Books extends Component {

    constructor(){
       super()
       this.handleClick = this.handleClick.bind(this);
       this.state = {
         like: false
       }
     }
   
   
     handleClick(){
       console.log("click détécté", !this.state.like);
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
                 <Button src={this.props.repositorie}> Reposeterie </Button>
               </CardBody>
             </Card>
           </div>
         </Col>
       );
     }
   }

   export default Books;