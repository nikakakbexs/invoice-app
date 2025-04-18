import './App.css'

function App() {


  const handleTheme = () =>{
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div>
      <h1>hello world</h1>
      <button onClick={handleTheme}>Clikc me</button>
    </div>
  );
}

export default App
