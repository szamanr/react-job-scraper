import React, {useEffect, useState} from "react";
import './JobList.css';

function JobList() {
    const jobsListUrl = 'https://api-dot-new-spotifyjobs-com.nw.r.appspot.com/wp-json/animal/v1/job/search?l=stockholm';
    const jobDetailsUrl = 'https://www.spotifyjobs.com/jobs/';
    let [jobs, setJobs] = useState([]);
    let [selectedJob, expandJob] = useState(null);

    // fetch job list
    useEffect(() => {
        fetch(jobsListUrl).then(response => {
            response.json().then(jobs => {
                setJobs(jobs.result);
            });
        });
    }, []);

    // build a job dom element
    const jobList = jobs.map(job => {
        const jobUrl = jobDetailsUrl + job.id;

        // when job is expanded, display details like job url and description
        const jobDetails = job.id === selectedJob ? (
            <div className="job-details">
                <p className="job-link">
                    <a href={jobUrl} target="_blank" rel="noreferrer">See job ad🔗</a>
                </p>
                <p className="job-description">Job description here...</p>
            </div>
        ) : null;

        return (
            <li key={job.id} className="job" onClick={() => {
                expandJob(job.id)
            }}>
                <p className="job-title">{job.text}</p>
                {jobDetails}
            </li>
        );
    });

    return (
        <div className="JobList">
            <p>jobs:</p>
            <ul className="job-list">
                {jobList}
            </ul>
        </div>
    );
}

export default JobList;
