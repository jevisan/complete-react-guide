import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../Components/Persons/Persons';
import Cockpit from '../Components/Cockpit/Cockpit';

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

        if (this.state.showPersons) {
            persons = <Persons
                        persons={this.state.persons}
                        clicked={this.deletePersonHandler}
                        changed={this.nameChangeHandler} />;
        }

        return (
            <div className={classes.App}>
                <Cockpit
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    clicked={this.tooglePersonsHandler} />
                {persons}
            </div>
        ); // end return
    } // end render
}

export default App;
