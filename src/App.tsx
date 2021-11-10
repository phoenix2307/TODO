import React from 'react';
import './App.css';
import TodoList from "./TodoList";

function App() {
    return (
        <div className="App">
            <TodoList title={'What to learn'} />
            <TodoList title={'What to buy'} />
            <TodoList title={'What to raed'}/>

        </div>
    );
}

export default App;
