import React, { useState, useEffect, useRef } from 'react';
import TodoCreator from './FormInput';
import TodoList from './List';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#ff7e5f' },
        secondary: { main: '#feb47b' },
    },
});

const Form = () => {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([
        { text: 'Learn about React', isCompleted: false, isEditing: false },
        { text: 'Meet friend for lunch', isCompleted: false, isEditing: false },
        { text: 'Build really cool todo app', isCompleted: false, isEditing: false },
    ]);
    const inputRef = useRef();
    const noteRef = useRef({});
    const [isInputEmpty, setInputEmpty] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(newTodo);
        clearInput();
        inputRef.current.focus();
    };

    const addTodo = (text) => {
        if (text !== '') {
            const newTodos = [...todos, { text, isCompleted: false, isEditing: false }];
            setNewTodo('');
            setTodos(newTodos);
        } else {
            setInputEmpty(true);
        }
    };

    const removeTodo = (inx) => {
        const newArr = [...todos];
        newArr.splice(inx, 1);
        setTodos(newArr);
    };

    const completeTodo = (inx) => {
        const newTodos = [...todos];
        newTodos[inx].isCompleted = !newTodos[inx].isCompleted;
        setTodos(newTodos);
    };

    const editTodo = (inx) => {
        const newTodos = [...todos];
        newTodos[inx].isEditing = !newTodos[inx].isEditing;
        setTodos(newTodos);
    };

    const saveTodo = (inx) => {
        const newTodos = [...todos];
        newTodos[inx].isEditing = false;
        newTodos[inx].text = noteRef.current[inx].value;
        setTodos(newTodos);
    };

    const clearInput = () => {
        setNewTodo('');
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <TodoCreator
                theme={theme}
                todo={newTodo}
                setTodo={setNewTodo}
                clearInput={clearInput}
                inputRef={inputRef}
                isInputEmpty={isInputEmpty}
            />
            <TodoList
                theme={theme}
                todos={todos}
                completeTodo={completeTodo}
                editTodo={editTodo}
                deleteTodo={removeTodo}
                saveTodo={saveTodo}
                noteRef={noteRef}
            />
        </form>
    );
};

export default Form;
