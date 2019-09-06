import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      priority: '',
      todos: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.todoAdd = this.todoAdd.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  todoAdd(event) {
    event.preventDefault();

    if (this.state.description === '') {
      alert('Write something')
      return false;
    }

    if (this.state.priority === '') {
      alert('Please select a priority');
      return false;
    }

    const todos = [...this.state.todos];
    const todosAdd = {
      description: this.state.description,
      priority: this.state.priority
    }

    todos.push(todosAdd);
    this.setState({ todos, description: '', priority: '' });
  }

  editTodo(todoIndex, todo) {
    const todos = [...this.state.todos];
    todos[todoIndex] = todo;
  }

  deleteTodo(todo, index) {
    const todos = this.state.todos.slice();
    todos.splice(index, 1);
    this.setState({ todos });
  }

  render() {
    return (
      <div className='container text-fix'>
        <h1>Very Simple To Do App</h1>
        <h3>Track All The Things</h3>
        <hr />
        <div className='row'>
          <div className='col-sm-4'>
            <form onSubmit={this.todoAdd} className='panel panel-default'>
              <div className='panel-heading'>Add new todo</div>
              <div className='panel-body'>

                <label>I want to..</label>
                <textarea className='create-todo-text' name='description' id='description' value={this.state.description} onChange={this.handleChange}></textarea>
                <p />

                <label>How much of a priority is this?</label>
                <select className='create-todo-priority' name='priority' id='priority' value={this.state.priority} onChange={this.handleChange}>
                  <option value='0'>Select a priority</option>
                  <option value='1'>Low</option>
                  <option value='2'>Mediun</option>
                  <option value='3'>High</option>
                </select>

              </div>

              <div className='panel-footer'>
                <button type='submit' className='btn btn-success btn-block create-todo' id='button'>Add</button>
              </div>
            </form>
          </div>

          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>View todos</div>
              <div className='panel-body bg-info'>
                {!this.state.todos.length && (
                  <div>
                    <strong>Welcome To a Very Simple To Do App!</strong>
                    <p>Get started now by adding a new todo on the left.</p>
                  </div>)}
                <ul className='list-unstyled'>
                  {this.state.todos.map((todo, index) => (

                    <TodoList
                      key={todo.id}
                      todo={todo}
                      index={index}
                      editTodo={this.editTodo}
                      deleteTodo={this.deleteTodo} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}


class TodoList extends Component {

  isChecked() {
    if (this.state.isChecked) {
      return 'strike-through'
    } else {
      return ''
    }
  }


  static colors(priority) {
    switch (priority) {
      case '3':
        return 'danger';
      case '2':
        return 'warning';
      case '1':
        return 'success';
      default:
        return 'default';
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      description: this.props.todo.description,
      priority: this.props.todo.priority,
      editEnable: false,
      isChecked: false
    }
    this.handleDescription = this.handleDescription.bind(this);
    this.editHandle = this.editHandle.bind(this);
    this.checkBoxHandle = this.checkBoxHandle.bind(this);
    this.saveHandle = this.saveHandle.bind(this);
  }

  handleDescription(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  editHandle() {
    this.setState({ editEnable: !this.state.editEnable })
  }

  checkBoxHandle() {
    this.setState({ isChecked: !this.state.isChecked })
  }

  saveHandle() {
    event.preventDefault();
    const { description, priority } = this.state;
    const { index, editTodo } = this.props;
    this.setState({ editEnable: false })
    editTodo(index, { description, priority })
  }

  render() {
    const todo = this.props.todo;
    const index = this.props.index;

    if (this.state.editEnable === true) {
      return (
        <div className=' panel panel-default'>
          <div className='panel-body' id='description'>

            <label>
              <strong>Description</strong>
              <textarea className='update-todo-text text-length' name='description' id='description' defaultValue={this.props.description} onChange={this.handleDescription}></textarea>
            </label>
            <p />

            <div id='priority'>
              <h5>priority</h5>
              <select name='priority' id='priority' className='update-todo-priority second-select' defaultValue={this.props.priority} onChange={this.saveHandle}>
                <option value='0'>Select a priority</option>
                <option value='1'>Low</option>
                <option value='2'>Mediun</option>
                <option value='3'>High</option>
              </select>
            </div>

            <button className='btn btn-success pull-right update-todo' onClick={this.saveHandle}>Save</button>
          </div>
        </div>
      )
    }

    return (

      <li
        key={todo.description}
        className={`alert alert-${TodoList.colors(todo.priority)}`}
        onChange={this.handleDescription}>

        <span className={this.isChecked()}>{todo.description}</span>
        <button type='button' className='btn btn-default btn-sm pull-right' onClick={() => { this.props.deleteTodo(todo, index); }} key={todo.description + index}>
          <a className='glyphicon glyphicon-trash text-danger delete-todo' aria-hidden='true' />
        </button>

        <button type='button' className='btn btn-default btn-sm pull-right' onClick={() => { this.editHandle(); }} key={todo.description + index + index}>

          <a className='glyphicon glyphicon-edit text-primary edit-todo' aria-hidden='true' />
        </button>
        <input className='checkBox pull-left' id='checkBox' type='checkBox' onClick={this.checkBoxHandle} />

      </li>
    )
  }
}
