import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/HomePage.css'

import { getUser } from '../Publics/redux/actions/user';

class HomePage extends Component {
    state = {
        index: '',
        user: [],
    };
    componentDidMount = async () => {
        await this.props.dispatch(getUser());
        this.setState({
            user: this.props.user,
        });
    };
    render() {
        const { user } = this.state;
        const list = user.userList;
        console.log(localStorage.jwtToken)
        console.log(list)
        return (
            <div>
                {localStorage.jwtToken == undefined ? <div></div> :
                    (
                        <div>
                            <div className="table-div"></div>
                            <h3 className="list-book">Leaderboards</h3>
                            <table className="darkTable">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }}>No</th>
                                        <th style={{ width: '60%' }}>Name</th>
                                        <th style={{ width: '30%' }}>Score</th>
                                    </tr>
                                </thead>
                                {list &&
                                    list.length > 0 &&
                                    list.map((item, index) => {
                                        return (
                                            <tbody>
                                                <tr key={index}>
                                                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                    <td>{item.fullname}</td>
                                                    <td>{item.scores}</td>
                                                </tr>
                                            </tbody>

                                        )
                                    })}
                            </table>
                        </div>
                    )}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(HomePage);