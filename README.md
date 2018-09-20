# OSRS News Scraper

## Overview

[OSRS News Scraper](https://osrs-news-scraper.herokuapp.com/) is a Full Stack Web application that uses cheerio to scrape current news articles from [Olschool Runescape](https://oldschool.runescape.com/). Users can save their favorite articles and comment on them.

![OSRS News Scraper](public/img/osrs-news-scraper.jpg)

## How It Works

- Scrape new articles by clicking the 'Scrape Articles' button in the navbar.
- View any article by clicking its 'View' button.
- Save articles by clicking 'Save', these can then be viewed by clicking 'Saved Articles' in the navbar.
- Comments can be added to each article by first viewing the article and then by using the form provided.
- Both saved articles and comments can be deleted.

## Technologies used

- Node.js
- Express.js
- Handlebars.js
- MongoDB
- Mongoose
- npm packages
  - body-parser
  - express
  - express-handlebars
  - mongoose
  - cheerio
  - request