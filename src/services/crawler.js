import request from "request";
import * as cheerio from "cheerio";

/**
 * fetches job details from the given url and returns it using the provided callback
 *
 * @param url
 * @param callback
 */
export const fetchJobDetails = function(url, callback) {
    request('https://cors-anywhere.herokuapp.com/' + url, function(error, response, body) {
        if(error) {
            console.error(error);
            callback({description: 'Unable to load the job description.'});
            return;
        }

        if(response.statusCode === 200) {
            const $ = cheerio.load(body);
            let description = $("[class*=singlejob_introText]").html();
            description += $("[class*=singlejob_description]").html();

            const jobType = detectJobType(body);

            callback({
                description, jobType
            });
        } else {
            callback({description: 'Unable to load the job description.'});
        }
    });
}

/**
 * tries to detect whether the job is intended for experienced professionals or recent graduates.
 *
 * @param body
 */
function detectJobType(body) {
    const $ = cheerio.load(body);
    const jobTitle = $("[class*=singlejob_leftTitle]").text().toLowerCase();
    const jobDetails = $("[class*=singlejob_rightContent]").text().toLowerCase();

    // try to check the job title first
    if (jobTitle.match(/(senior|lead)/g)) {
        return 'senior';
    }

    if (jobTitle.match(/(junior|intern)/g)) {
        return 'junior';
    }
}
