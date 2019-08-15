import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Col,
    Input
} from 'reactstrap';
import swal from 'sweetalert';
import '../assets/BookForm.css'
import { pola, updatePola } from '../Publics/redux/actions/pola';


class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            pola: [],
            tmp: []
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount = async () => {
        await this.props.dispatch(pola());
        this.setState({
            pola: this.props.pola.polaList[0]
        });
    };

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    changeHandle = (e) => {
        const name = e.currentTarget.name
        const val = e.currentTarget.value
        this.state.pola[name] = val
        this.setState({ pola: this.state.pola })

    }
    render() {
        const editbooks = () => {
            this.state.tmp.push({
                pola: list ? list.pola : '',
            });
            edit()
            this.setState((prevState) => ({
                modal: !prevState.modal
            }));

        };

        let edit = async () => {
            await this.props.dispatch(updatePola((this.state.pola), this.props.match.params.id))
                .then(() => {
                    swal({
                        title: "Update",
                        text: `Update Success`,
                        icon: "success",
                        button: "OK"
                    }).then(() => {
                        window.location.href = '/pola';
                    })
                })
        };

        const list = this.state.pola;
        console.log(this.state.pola)


        return (
            <div>
                {// eslint-disable-next-line
                    localStorage.jwtToken == undefined ?
                    ('') :
            (
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className="{this.props.className} modal-lg">
                            <ModalHeader toggle={this.toggle}>
                                
                            </ModalHeader>
                            <ModalBody>
                                <Form >
                                    <FormGroup row >
                                        <Label sm={2} size="lg">
                                            Pattern
								</Label>
                                        <Col sm={8}>
                                            <Input
                                                type="text"
                                                name="pola"
                                                id="title"
                                                placeholder="Name..."
                                                bsSize="lg"
                                                value={list ? list.pola : ''}
                                                onChange={this.changeHandle}
                                            />
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <button class="buttonSave" onClick={editbooks.bind(this)}>
                                    SAVE
						</button>
                            </ModalFooter>
                        </Modal>
                        )
                    }
            </div>
            );
        }
    }
const mapStateToProps = (state) => {
    return {
                    pola: state.pola
            };
        };
export default connect(mapStateToProps)(Update);