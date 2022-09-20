import React from 'react';
import TodoContext from '@/contexts/TodoContext';

const useTodo = () => React.useContext(TodoContext);

export default useTodo;
