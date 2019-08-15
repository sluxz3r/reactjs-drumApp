import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../assets/Pola.css'

import { pola } from '../Publics/redux/actions/pola';

class Pola extends Component {
    state = {
        index: '',
        pola: [],
    };
    componentDidMount = async () => {
        await this.props.dispatch(pola());
        this.setState({
            pola: this.props.pola,
        });
    };
    render() {
        const { pola } = this.state;
        const list = pola.polaList
        return (
            <div className='poladiv'>
                {localStorage.jwtToken == undefined ? <div></div> :
                    (
                        <div>
                            <div className="table-div"></div>
                            <h3 className="list-book">Pattern</h3>
                            <table className="darkTable">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }}>No</th>
                                        <th style={{ width: '20%' }}>Pattern</th>
                                        <th style={{ width: '20%' }}>Change</th>
                                    </tr>
                                </thead>
                                {list &&
                                    list.length > 0 &&
                                    list.map((item, index) => {
                                        return (
                                            <tbody>
                                                <tr key={index}>
                                                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.pola}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Link to={`/pola/${item.id}`}>
                                                            <button className='button1'>Edit</button>
                                                        </Link>
                                                    </td>
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
        pola: state.pola,
    };
};

export default connect(mapStateToProps)(Pola);