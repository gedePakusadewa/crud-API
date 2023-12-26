import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label

} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeId: ""
        };
    }
    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ activeId : value })
    };
    render() {
        const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="id">Id</Label>
                            <Input 
                              type="text"
                              name="id"
                              value={this.state.activeId}
                              onChange={this.handleChange}
                              placeholder="Enter Todo ID"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => this.props.onDelete(this.state.activeId)}>
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}