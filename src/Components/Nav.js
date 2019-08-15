import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../assets/nav.css';
import { logout } from '../Publics/redux/actions/login';

class Nav extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      user: [],
      dropdownOpen: false
    }
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  render() {
    const del = async () => {
      const userid = localStorage.userid
      await this.props.dispatch(logout(userid));
      localStorage.removeItem('userid')
      localStorage.removeItem('jwtToken')
      swal({
        title: "Logout",
        text: "Logout Success !!",
        icon: "success",
        button: "OK"
      }).then(() => {
          window.location.href = '/login/';
        })
  };
    return (
      <div className='nav'>
        <a href='/'><button className='butt'>DRUM APP</button></a>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{
          paddingLeft: '900px'
        }}>

          {// eslint-disable-next-line
            localStorage.jwtToken == undefined ?
            (<Link to='/login'><DropdownToggle style={{fontFamily:'Arial, Helvetica, sans-serif'}}>
              Login
        </DropdownToggle></Link>): 
            (<DropdownToggle style={{fontFamily:'Arial, Helvetica, sans-serif'}}>
              Hi ADMIN
            </DropdownToggle>)
            
            }

          {// eslint-disable-next-line
            localStorage.jwtToken == undefined ?
            ('') :
            (<DropdownMenu>
              <DropdownItem style={{fontFamily:'Arial, Helvetica, sans-serif'}} href='/pola/' >Pattern</DropdownItem>
               <Link style={{textDecoration:'none'}} onClick={del.bind(this)}><DropdownItem style={{fontFamily:'Arial, Helvetica, sans-serif', fontWeight:'bold'}}>Logout</DropdownItem></Link>
            </DropdownMenu>
            )
            }
        </Dropdown>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Nav);
