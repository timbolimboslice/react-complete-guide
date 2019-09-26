import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'a', name: 'Tim', age: 32 },
      { id: 'b', name: 'Matt', age: 28 },
      { id: 'c', name: 'Craig', age: 44 }
    ],
    showPersons: true
  }

  deletePersonHandler = (personIndex) => {
    //--copies arry
    //const persons = this.state.persons.slice();
    //--also copies, spread operator, more modern and comon
    //--make a copy first, dont mess with original state
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons:persons});
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    //spread, more modern, copies all propties and assigns to new object
    const person = {
      ...this.state.persons[personIndex]
    };
    //older way
    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age} 
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div> 
      );

      style.backgroundColor = 'red';
    }

    let classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red');
    }
    if(this.state.persons.length <=1) {
      classes.push('bold');
    }

    return (
        <div className="App">
          <h1>Hi, I'm a react app</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button 
            style={style}
            onClick={this.togglePersonHandler}>Toggle Persons</button>
            {persons}
        </div>
    );
  }
}

export default App;