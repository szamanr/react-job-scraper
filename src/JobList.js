import React, {useEffect, useState} from "react";

function JobList() {
    const jobsListUrl = 'https://api-dot-new-spotifyjobs-com.nw.r.appspot.com/wp-json/animal/v1/job/search?l=stockholm';
    const jobDetailsUrl = 'https://www.spotifyjobs.com/jobs/';
    let [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(jobsListUrl).then(response => {
            response.json().then(jobs => {
                setJobs(jobs.result);
            });
        });
    }, []);

    const jobList = jobs.map(job => {

        const jobUrl = jobDetailsUrl + job.id;
        return (
            <li key={job.id}>
                <a href={jobUrl}>{job.text}</a>
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
