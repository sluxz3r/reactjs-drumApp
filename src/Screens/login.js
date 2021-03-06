import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import { login } from '../Publics/redux/actions/login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };

    this.toggle = this.toggle.bind(this);
  }
  componentDidMount = async () => {
    
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { user } = this.state;
    const list = user.userList;
    const name = list ? list[0].fullname : '';

    const userAdd = () => {
      this.state.user.push({
        email: this.state.email,
        password: this.state.password
      });
      add()
      this.setState((prevState) => ({
        modal: !prevState.modal
      }));
    };
    let add = async () => {
      await this.props.dispatch(login(this.state.user[0]))
        .then(() => {
          swal({
            title: "Login",
            text: `Login Success`,
            icon: "success",
            button: "OK"
          }).then(() => {
            window.location.href = '/';
          })
        })
        .catch(() => {
          swal({
            title: "Login Failed",
            text: "Email Or Password Wrong !!!",
            icon: "warning",
            buttons: "OK"
          }).then(() => {
            
          })
        })
    };
  
    return (
      <Container style={{ paddingTop: '100px' }}>
        {localStorage.jwtToken != undefined ? (<Redirect to='/' />) :
          (<div>
            <h2>Sign In</h2>
            <Form className="form">
              <Col>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                    id="exampleEmail"
                    placeholder="myemail@email.com"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                    id="examplePassword"
                    placeholder="*******"
                  />
                </FormGroup>
              </Col>
              <Button onClick={userAdd.bind(this)}>Sign In</Button>
            </Form>
          </div>)}
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(Login);