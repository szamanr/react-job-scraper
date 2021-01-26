import './App.css';
import React from "react";
import JobList from "./JobList";

function App() {
    return (
        <div className="App">
            <main className="job-list">
                <JobList/>
            </main>
        </div>
    );
}

export default App;
