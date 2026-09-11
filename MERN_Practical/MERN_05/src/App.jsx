import Users from "./component/User";
import Posts from "./component/Post";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header>
        <h1>React REST API Application</h1>
      
      </header>

      <main>
        <section>
          <Users />
        </section>

        <section>
          <Posts />
        </section>
      </main>

  
    </div>
  );
}

export default App;