import React, { Component } from 'react';
import classes from './App.module.css';
import Person from './Person/Person';

class App extends Component {
    state = {
        persons: [
            { id: 'afn32', name: 'Max', age: 28 },
            { id: 'efw58', name: 'Manu', age: 29 },
            { id: 'jgi84', name: 'Stephanie', age: 26 }
        ],
        otherState: 'some other value',
        showPersons: false,
    };

    deletePersonHandler = (personIndex) => {
        // const persons = this.state.persons.slice(); // creates a copy of the original state
        const persons = [...this.state.persons]; // elements in array into a list of elements added to this array
        // both methods are equivalent
        persons.splice(personIndex, 1); // removes 1 element from array
        this.setState({persons:persons});
    }

    nameChangeHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({ persons: persons });
    }

    tooglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow}); // toogles doesShow var
    }

    render() {
        let persons = null;
        let btnClass = [classes.Button];

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person
                                click={() => this.deletePersonHandler(index)}
                                name={person.name}
                                age={person.age}
                                key={person.id}
                                changed={(event) => this.nameChangeHandler(event, person.id)}/>
                    })}
                </div>
            );

            btnClass.push(classes.Red)
        }

        const assignedClasses = [];

        if (this.state.persons.length <= 2) {
            assignedClasses.push(classes.red);
        }

        if (this.state.persons.length <= 1) {
            assignedClasses.push(classes.bold);
        }

        return (
            <div className={classes.App}>
                <h1>Hi, I'm a React App</h1>
                <p className={assignedClasses.join(' ')}>This is really working!</p>
                <button className={btnClass.join(' ')} onClick={this.tooglePersonsHandler}>
                    Toggle Persons
                </button>
                {persons}
            </div>
        ); // end return
    } // end render
}

export default App;
