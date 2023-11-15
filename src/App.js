import './App.css';
import { ThemeProvider } from './components/ThemeContext';
import ToDoList from './components/ToDoList';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <ToDoList />
      </div>
    </ThemeProvider>
  );
}

export default App;
