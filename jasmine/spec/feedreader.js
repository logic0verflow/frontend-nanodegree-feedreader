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
            expect(allFeeds).toBeTruthy();
        });


        /* This test loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL is
         * not empty.
         */
        it('have a URL defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeTruthy();
            });
        });

        /* This test loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is
         * not empty.
         */
        it('have a name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeTruthy();
            });
        });

    });


    /* This is our test suite for the menu and to test its ability
     * to be hidden or displayed via the menu button link.
     */
    describe('The menu', function() {

        /* A test that ensures the menu element is hidden by default
         * by ensuring the menu-hidden class is applied.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         /* A test that ensures the menu changes visibility when the
          * menu icon is clicked.
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


    /* Test suite for the feed entries and ensuring they are
     * loaded and displayed.
     */
    describe('Initial Entries', function() {

        beforeAll(function(done) {
            // Ensure the first feed is at least loaded before testing
            loadFeed(0, done);
        });

        /* A test that ensures when the loadFeed function is called and
         * completes its work, there is at least a single .entry element
         * within the .feed container.
         */
        it('contains at least one entry', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });


    /* News Feed Selection test suite to ensure content changes when
     * a new feed selection is made.
     */
    describe('New Feed Selection', function() {
        // Stores the html before a new feed selecton has been made
        var beforeHTML;
        beforeAll(function(done) {
            // Call loadFeed once to setup the entries
            loadFeed(0, function() {
                // Store the feed html for later comparison
                beforeHTML = $('.feed').html();
                // Call loadFeed with different feed to compare changes
                // against
                loadFeed(1, done);
            });
        });

        // Reset feed back to the first feed
        afterAll(function() {
            loadFeed(0);
        });

        it('has at least two feed URLs to select from', function(done) {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(1);
            done();
        });

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('changes the content', function(done) {
            // Grab the first URL again and check if its different from before
            var afterHTML = $('.feed').html();
            expect(afterHTML).not.toEqual(beforeHTML);
            done();
        });

    });
}());
