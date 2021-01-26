import request from "request";
import * as cheerio from "cheerio";

/**
 * fetches job details from the given url and returns it using the provided callback
 *
 * @param url
 * @param callback
 */
export const fetchJobDetails = function(url, callback) {
    request(url, function(error, response, body) {
        if(error) {
            console.error(error);
            callback('Unable to load the job description.');
            return;
        }

        if(response.statusCode === 200) {
            const $ = cheerio.load(body);
            console.log($("[class*=singlejob_description]").text());
            callback($("[class*=singlejob_introText]").text());
        }

        callback('Unable to load the job description.');
    });
}
