import React, { Component } from "react"
import Modal from "./components/Modal";
import ModalDelete from "./components/ModalDelete";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        title: "",
        content: "",
        category: "",
      },
      todoList: []
      };
      
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  toggleModalDelete = () => {
    this.setState({ modalDelete: !this.state.modalDelete });
  };

  createItem = () => {
    const item = {title: "", content: "", category: "" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  deleteItem = () => {
    this.setState({ modalDelete: !this.state.modalDelete });
  };

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/notes/${item.id}/`, item)
      return;  
    }
    axios
      .post("http://localhost:8000/api/notes/", item)
  };

  deleteSubmit = id => {
    this.toggleModalDelete();
    if (id) {
      axios
        .delete(`http://localhost:8000/api/notes/${id}`)
      return;  
    }
  };  

    async componentDidMount() {
      try {
        const res = await fetch('http://localhost:8000/api/notes?page=1&limit=10');
        const todoList = await res.json();
        this.setState({
          todoList : todoList.notes
        });
      } catch (e) {
        console.log(e);
    }
    }
    renderItems = () => {
      const { viewCompleted } = this.state;
      return this.state.todoList.map(item => (
        <li 
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span 
            className={`todo-title mr-2`}
          >
            {item.id}
          </span>
          <br />
          <span 
            className={`todo-title mr-2`}
            title={item.title}
          >
            {item.content}
          </span>
        </li>
      ));
    };

    render() {
      return (
        <main className="content">
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">              
              <div className="">
                <button onClick={this.createItem} className="btn btn-success">Add Task</button>
              </div>
              <div className="">
                <button onClick={this.deleteItem} className="btn btn-delete">Delete Task</button>
              </div>
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      {this.state.modal ? (
        <Modal
          activeItem={this.state.activeItem}
          toggle={this.toggle}
          onSave={this.handleSubmit}
        />
      ): null}
    
      {this.state.modalDelete ? (
        <ModalDelete
          toggle={this.toggleModalDelete}
          onDelete={this.deleteSubmit}
        />
      ): null}
      </main>
      )
    }
  }
  
export default App;
