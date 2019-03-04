import React, { Component } from "react";
import axios from "../axios/axios";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import "./Csat.css";

class Csat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 0,
      atlasId: 0,
      comments: "",
      rating: -1,
      show: true,
      showThankyou: false,
      placeholder: "Describe the problem..."
    };
  }

  submit(_this) {
    axios
      .post("Csat/{param}", this.state)

      .then(
        response => {
          if (false) {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
          }
        },
        error => {
          // alert("CSAT SUBMIT ERROR!: " + error);
          console.log("CSAT SUBMIT ERROR!: " + error);
        }
      )
      .finally(response => {
        _this.setState({
          showThankyou: true,
          show: false
        });
        // console.log(response); // response object undefined
      });
  }

  render() {
    const subYes = () => {
      this.setState({ rating: 10 }, () => {
        this.submit(this);
      });
    };
    const subNo = e => {
      e.preventDefault();

      this.setState({ rating: 0 }, () => {
        //creating the callback function by passing in the function
        //you want to run asynchronous programming
        this.submit(this);
      });
      console.log("rating: " + this.state.rating);
    };
    // update the comment when the field is changed
    const update = evt => this.setState({ comments: evt.target.value });
    const handleHide = () => this.setState({ show: false });

    return (
      <Container className="csatcontainer">
        <Row>
          {this.state.show && <div>Was this page helpful? </div>}
          {this.state.show && (
            <Button variant="secondary" onClick={subYes}>
              Yes
            </Button>
          )}
          {this.state.show && <Button onClick={handleHide}>No</Button>}
        </Row>
        <Row>
          <div>
            {!this.state.show && !this.state.showThankyou && (
              <Form onSubmit={subNo}>
                <Form.Control
                  onChange={update}
                  type="text"
                  placeholder={this.state.placeholder}
                />
              </Form>
            )}
          </div>
          <div>
            {!this.state.show && !this.state.showThankyou && (
              <Button onClick={subNo}>Submit</Button>
            )}
          </div>
          <div>
            {this.state.showThankyou && (
              <div> Thank you for helping improve our documentation!</div>
            )}
          </div>
        </Row>
      </Container>
    );
  }
}

export default Csat;
