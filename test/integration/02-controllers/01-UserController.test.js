const supertest = require('supertest');

describe('UserController', function () {

    describe('#login() with admin account', function () {
        it('should return status 200 with "Login successfully" in body', function (done) {
            supertest(sails.hooks.http.app)
                .post('/user/login')
                // The following two lines making the request as normal form submission instead of AJAX request
                .set('Accept', 'text/html,application/xhtml+xml,application/xml')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send("email=kenny@admin.com&password=hkbu123456")
                .expect(302, done);
        });
    });

    describe('#login() with non-exists user account', function () {
        it('should return status 401 with "User not found" in body', function (done) {
            supertest(sails.hooks.http.app)
                .post('/user/login')
                .send("email=testing&password=123456")
                .expect(401, '找不到用戶', done);
        });
    });

    //   describe('#logout()', function() {
    //     it('should return status 200 with "Log out successfully" in body', function (done) {
    //       supertest(sails.hooks.http.app)
    //       .get('/user/logout')
    //       .expect(200, '"Log out successfully"', done);
    //     });
    //   });

});