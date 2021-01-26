import './App.css';
import React from "react";
import JobList from "./JobList";
import {BrowserRouter, Route} from "react-router-dom";
import JobDetails from "./JobDetails";

function App() {
    return (
        <BrowserRouter>
            <main className="App">
                <Route exact path="/">
                    <JobList/>
                </Route>

                <Route path="/job/:id">
                    <JobDetails/>
                </Route>
            </main>
        </BrowserRouter>
    );
}

export default App;
