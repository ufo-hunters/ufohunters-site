[![Build Status](https://travis-ci.org/ufo-hunters/ufohunters-site.svg?branch=master)](https://travis-ci.org/ufo-hunters/ufohunters-site)

ufo-hunters.com
===============

A site that collects a huge data set of UFO sightings all over the world. Our main purpose is to collaborate spreading objective UFO data.


Overview
------------

This site is built with an incredibly powerful web framework called Ruby on Rails, that uses the most eloquent and elegant programming language we've ever used.

UFO-hunters.com was realized from scratch with Ruby 1.9 and Rails 3.3.2 and now upgrade to Ruby 2.1.2 and Rails 4.1.2 .

All UFO data we collect is regularly imported into a NoSQL database called MongoDB, with geospatial "2dsphere" indexes that considerably ease all the stuff with coordinates and geolocation. 

The site allow access to private zone with session variables. The user can to create his own articles.

Video Gallery and image gallery are Blueimp Gallery implementations.

We also used some resources available at freeCSStemplates.org

Some of the images in this site are available at OpenClipArt.org

We've applied lots of javascript resources, such as the well known jQuery, jQuery.carouFredSel "a plugin that turns any kind of HTML element into a carousel", and D3.js for data-driven documents generation.

The funny bubble graph showing the distribution of UFO's shapes is made from the code shared at github by ricardmo.

The current responsive version of the site has been developed using Twitter BootStrap.

All maps are implemented with Google Maps API V3.

[Pledgie]: http://www.pledgie.com/campaigns/21122

[![You can support the development of SimpleCov via Pledgie - thanks for your help](https://pledgie.com/campaigns/18379.png?skin_name=chrome)][Pledgie]

Dependencies
------------

ufo-hunters.com uses MongoDB as document database and Cloudinary as cloud-based image store. To install all the dependencies run

    gem install bundler
    bundle install

Built With
------------

•	Ruby on Rails — Our site is a Rails app.
•	Ember.js — Our front end is an Ember.js app that communicates with the Rails API.
•	MongoDB — Our main data store.
•	Redis — We use Redis as a cache and for transient data.
    

How to contribute
-----------------

Want to help improve [ufo-hunters.com][ufo-hunters]?

There are many ways to contribute to ufo-hunters.com and the UFO community. You may collect UFO reports, join a UFO organization such as MUFON or NUFORC, or ellaborate an article to share your story if you witnessed a UFO or had an encounter.

If you are a UFO investigator and want to share your work, just send us a doc or link so that we can publish it.

If you saw something wrong please do report it in the [issue
tracker][issues].

Once you have [forked the project][forking], feel free to send us a [pull
request][pull-requests].

If there's some other way you'd like to contribute, feel free to contact us! Thanks for your interest!

[ufo-hunters]: http://github.com/ufo-hunters/ufohunters-site
[issues]: https://github.com/ufo-hunters/ufohunters-site/issues
[forking]: http://help.github.com/forking/
[pull-requests]: http://help.github.com/pull-requests/
