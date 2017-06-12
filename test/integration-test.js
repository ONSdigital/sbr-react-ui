var selenium = require('selenium-webdriver');
var request = require("request");

describe('Selenium testing of routes and login page', function() {
    var baseUrl = 'http://localhost:3000/';

    // Open localhost before each test is run
    beforeEach(function(done) {
        this.driver = new selenium.Builder().
            withCapabilities(selenium.Capabilities.chrome()).
            build();
        this.driver.get(baseUrl).then(done);
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        this.driver.quit().then(done);
    });

    // Firstly, check the base url returns an OK 200 status code
    it("base url returns status code 200", function(done) {
      request.get(baseUrl, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    // Not logged in yet so if we go to /Match, we should be taken back to
    // the login page. Can check this by looking at the banner text, is "Demo UI"
    // for logged in page and 'Business Index' for the login page.
    it("match url will return user to login page if not logged in", function(done) {
      this.driver.get(baseUrl + '/Match');
      // If there is no cookie then the user will be redirected back to the login page
      var element = this.driver.findElement(selenium.By.className('banner-text'));
      element.getText().then(function(text) {
        expect(text).toBe('Business Index');
        done();
      });
    });

    // Test that the banner text in the header shows "Business Index" and not
    // "Example UI".
    it('Should be on the home page', function(done) {
        var element = this.driver.findElement(selenium.By.className('banner-text'));
        element.getText().then(function(text) {
          expect(text).toBe('Business Index');
          done();
        });
    });
});
