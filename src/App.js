import './App.css';
import React from "react";
import JobList from "./JobList";
import {BrowserRouter, Route} from "react-router-dom";
import JobDetails from "./JobDetails";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <main className="job-list">
                    <Route exact path="/">
                        <JobList/>
                    </Route>

                    <Route path="/job/:id">
                        <JobDetails/>
                    </Route>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
