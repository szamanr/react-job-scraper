import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function JobList() {
    const jobsListUrl = 'https://api-dot-new-spotifyjobs-com.nw.r.appspot.com/wp-json/animal/v1/job/search?l=stockholm';
    let [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(jobsListUrl).then(response => {
            response.json().then(jobs => {
                setJobs(jobs.result);
            });
        });
    }, []);

    const jobList = jobs.map(job => {
        const jobUrl = '/job/' + job.id;
        return (
            <li key={job.id}>
                <Link to={jobUrl}>{job.text}</Link>
            </li>
        );
    });

    return (
        <div className="JobList">
            <p>jobs:</p>
            <ul id="job-list">
                {jobList}
            </ul>
        </div>
    );
}

export default JobList;
