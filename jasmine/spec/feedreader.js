/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a URL defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('toggles visibility when menu icon clicked', function() {
            // After one click, expect menu to be unhidden
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // After another click, the menu should be hidden again
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completdonees its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeAll(function(done) {
            // Ensure allFeeds is defined with at least one feed
            if (allFeeds && allFeeds.length > 0) {
                loadFeed(0, done);
            } else {
                done();
            }
        });

        it('has at least one feedURL', function(done) {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
            done();
        });

        it('contains at least one entry', function(done) {
            expect($('.feed').find('.entry-link').length).not.toBe(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var beforeURL;
        beforeAll(function(done) {
            // Ensure allFeeds is defined with at least one feed
            if (allFeeds && allFeeds.length > 1) {
                // Call loadFeed once to setup the entries
                loadFeed(0, function() {
                    // Store the entry URL for later comparison
                    beforeURL = $('.feed').find('.entry-link').attr('href');
                    // Call loadFeed with different feed to compare changes
                    // against
                    loadFeed(1, done);
                });
            } else {
                done();
            }

        });

        // Reset feed back to the first feed
        afterAll(function() {
            if (allFeeds && allFeeds.length > 0) {
                loadFeed(0);
            }
        });

        it('has at least two feed URLs to select from', function(done) {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length > 1).toBe(true);
            done();
        });

        it('changes the content', function(done) {
            // Grab the first URL again and check if its different from before
            var afterURL = $('.feed').find('.entry-link').attr('href');
            expect(afterURL).not.toEqual(beforeURL);
            done();
        });

    });
}());
