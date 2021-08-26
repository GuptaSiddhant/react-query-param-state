import React from "react";
import useState from "react-query-param-state";

function App() {
  const [counters, setCounters] = useState("counters", "0");

  return (
    <div className="App flex">
      <h1>React Query Param State</h1>
      <p>
        Observe that counter value is in sync in the URL.
        <br />
        Refreshing the page will preserve the state.
      </p>
      <Counter id={1} />
      <Counter id={2} />
      <Counter id={3} />
    </div>
  );
}

export default App;

function Counter({ id }: { id: string | number }) {
  const [count, setCount] = useState("counter-" + id, "0");

  return (
    <div className="Counter">
      <label>Counter {id}</label>
      <button
        type="button"
        onClick={() => setCount((count) => String(Number(count || "0") - 1))}
      >
        -
      </button>
      <span>{count}</span>
      <button
        type="button"
        onClick={() => setCount((count) => String(Number(count || "0") + 1))}
      >
        +
      </button>
    </div>
  );
}
