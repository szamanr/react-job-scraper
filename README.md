# react job scraper

this is a sample project to showcase my javascript / react abilities. it's a web scraper which looks up the [spotify jobs site](https://spotifyjobs.com/) and displays a list of all the listings for Stockholm.

## setup

to run, run `yarn start` or `npm start` in the project directory. the app should open in the development mode on [http://localhost:3000](http://localhost:3000).

## usage

upon loading the app, all the job titles are displayed. clicking on a title will expand the job details, including: 

* a link to the original listing,
* job description (fetched asynchronously upon clicking)
* job type (see below)
* required years of experience

the app tries to classify jobs into job types by checking the title and description for certain keywords, and displays one of the following values:

* professionals — for lead / senior positions intended for experienced developers
* graduates — for junior positions intended for recent graduates
* unknown — the app was unable to identify the job type

a question mark next to the job type indicates uncertainty in the prediction.

## improvements

this project could be extended with the following improvements:

* paginate results and allow filtering, e.g. on job type
* research the wording and elements used in job ads to better classify job types
