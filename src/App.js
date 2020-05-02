import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
    state = {
        persons: [
            { id: 'afn32', name: 'Max', age: 28 },
            { id: 'efw58', name: 'Manu', age: 29 },
            { id: 'jgi84', name: 'Stephanie', age: 26 }
        ],
        otherState: 'some other value'
    };

    switchNameHandler = (newName) => {
        // console.log('Was clicked!');
        // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
        this.setState({
            persons: [
                { name: newName, age: 28 },
                { name: 'Manu', age: 29 },
                { name: 'Stephanie', age: 27 }
            ],
            showPersons: false,
        });
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

        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
        };

        let persons = null;

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
        }

        return (
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                <p>This is really working!</p>
                <button
                    style={style}
                    onClick={this.tooglePersonsHandler}>
                    Switch Name
                </button>
                {persons}
            </div>
        ); // end return
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
    } // end render
}

export default App;
