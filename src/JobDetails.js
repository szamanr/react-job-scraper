import React, {useEffect, useState} from "react";
import request from "request";
import * as cheerio from "cheerio";

function JobDetails(id) {
    const jobDetailsUrl = 'https://www.spotifyjobs.com/jobs/';
    let [description, setDescription] = useState(null);

    useEffect(() => {
        request(jobDetailsUrl + id, function(error, response, body) {
            if(error) {
                console.error(error);
                setDescription('Unable to load the job description.')
                return;
            }

            if(response.statusCode === 200) {
                const $ = cheerio.load(body);
                console.log($("[class*=singlejob_description]").text());
                setDescription($("[class*=singlejob_introText]").text());
            }
        });
    }, [id]);


    return (
        <div className="JobDetails">
            <h1>foo</h1>
            <p>{description}</p>
        </div>
    );
}

export default JobDetails;
