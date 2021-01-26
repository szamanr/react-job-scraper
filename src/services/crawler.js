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

            const experienceYears = detectExperienceYears(body);
            const jobType = detectJobType(body);

            callback({
                description, jobType, experienceYears
            });
        } else {
            callback({description: 'Unable to load the job description.'});
        }
    });
}

/**
 * tries to detect how many years of experience the job requires
 *
 * @param body
 * @returns {RegExpMatchArray}
 */
function detectExperienceYears(body) {
    const $ = cheerio.load(body);
    const jobDetails = $("[class*=singlejob_rightContent]").text().toLowerCase();

    return jobDetails.match(/\b[+\w]{1,20}(?= years)/);
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
        return 'professionals';
    }

    if (jobTitle.match(/(junior|intern\b)/g)) {
        return 'graduates';
    }

    // otherwise check the description for mentions of keywords
    const seniorCount = (jobDetails.match(/(senior|lead|experienced)/g) || []).length;
    const juniorCount = (jobDetails.match(/(junior|intern\b|student|graduate)/g) || []).length;

    if(seniorCount > juniorCount) {
        return 'professionals?';
    }

    if(juniorCount > seniorCount) {
        return 'graduates?';
    }

    return 'unknown';
}
