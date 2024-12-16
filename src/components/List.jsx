import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        padding: 0,
    },
    li: {
        borderBottom: '1px dashed black',
    },
}));

const TodoList = ({
    theme,
    todos,
    completeTodo,
    editTodo,
    deleteTodo,
    saveTodo,
    noteRef,
}) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);

    const handleToggle = (value, inx) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        completeTodo(inx);
    };

    return (
        <ThemeProvider theme={theme}>
            <List className={classes.root}>
                {todos.map((todo, inx) => (
                    <ListItem
                        key={`todo-${inx}`}
                        dense
                        button
                        className={classes.li}
                    >
                        <ListItemIcon>
                            <Checkbox
                                color="primary"
                                edge="start"
                                checked={todo.isCompleted}
                                onClick={handleToggle(todo, inx)}
                            />
                        </ListItemIcon>

                        {!todo.isEditing ? (
                            <>
                                <ListItemText
                                    primary={todo.text}
                                    style={{
                                        textDecoration: todo.isCompleted
                                            ? 'line-through'
                                            : '',
                                    }}
                                />
                                <ListItemIcon>
                                    <IconButton onClick={() => editTodo(inx)}>
                                        <EditIcon />
                                    </IconButton>
                                </ListItemIcon>
                            </>
                        ) : (
                            <>
                                <input
                                    ref={(el) => (noteRef.current[inx] = el)}
                                    defaultValue={todo.text}
                                />
                                <ListItemIcon>
                                    <IconButton onClick={() => saveTodo(inx)}>
                                        <BookmarkIcon />
                                    </IconButton>
                                </ListItemIcon>
                            </>
                        )}

                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={() => deleteTodo(inx)}
                                edge="end"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </ThemeProvider>
    );
};

export default TodoList;
