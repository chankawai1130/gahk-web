const supertest = require('supertest');
const Async = require('async');

describe('TRGPController', function () {

    let cookie;

    describe('TC1600 - Application-TRGP: #TRGPForm()', function () {
        it('Should send data to req.session.data', function (done) {
            supertest(sails.hooks.http.app)
                .post('/competition/form/TRGPForm')
                .send("req.session.data.teamName=香港中學體操會")
                .expect(200, done);

        });
    });

    // describe('TC1700 - Application-TRGP-preview: #TRGPPreviewForm()', function () {
    //     it('Should return 200 and show the success message("提交成功!! Successfully Submitted!") in body', function (done) {
    //         supertest(sails.hooks.http.app)
    //         .post('/pages/competition/form/TRGPFormPreview')
    //         .send("req.session.data.payStatus=unpaid&TRGS[teamName]=req.session.data.teamName")
    //         .expect(200,done);
    //     });
    // });

    describe('TC3000 - Admin page-accept: #confirm()', function () {
        it('Should show the success message("申請已被確認 Application has been accepted.") in body and jump to /admin/applyHandle/search', function (done) {
            TRGP.find().then(function (forms) {
                if (forms.length != 0) {
                    var id = forms[0].id;
                    supertest(sails.hooks.http.app)
                        .post('/admin/applyHandle/confirm/TRGP/' + id)
                        .expect(200, '{\n  "message": "申請已被確認 Application has been accepted.",\n  "url": "/admin/applyHandle/search"\n}', done);
                }
            });
        });
    });

    describe('TC3100 - Admin page-reject: #reject()', function () {
        it('Should show the success message("申請已被拒絕 Application has been rejected.") in body and jump to /admin/applyHandle/search', function (done) {
            TRGP.find().then(function (forms) {
                if (forms.length != 0) {
                    var id = forms[0].id;
                    supertest(sails.hooks.http.app)
                        .post('/admin/applyHandle/reject/TRGP/' + id)
                        .expect(200, '{\n  "message": "申請已被拒絕 Application has been rejected.",\n  "url": "/admin/applyHandle/search"\n}', done);
                }
            });
        });
    });

    describe('TC3200 - Admin page-data deficiency: #dataDef()', function () {
        it('Should show the success message("申請資料不全 Data Deficiency.") in body and jump to /admin/applyHandle/search', function (done) {
            TRGP.find().then(function (forms) {
                if (forms.length != 0) {
                    var id = forms[0].id;
                    supertest(sails.hooks.http.app)
                        .post('/admin/applyHandle/dataDef/TRGP/' + id)
                        .expect(200, '{\n  "message": "申請資料不全 Data Deficiency.",\n  "url": "/admin/applyHandle/search"\n}', done);
                }
            });
        });
    });

    describe('TC3300 - Admin page-waiting: #waitingList()', function () {
        it('Should show the success message("申請隊伍/團體已設為後補 Applied Team/Group has been set on waiting list.") in body and jump to /admin/applyHandle/search', function (done) {
            TRGP.find().then(function (forms) {
                if (forms.length != 0) {
                    var id = forms[0].id;
                    supertest(sails.hooks.http.app)
                        .post('/admin/applyHandle/waitingList/TRGP/' + id)
                        .expect(200, '{\n  "message": "申請隊伍/團體已設為後補 Applied Team/Group has been set on waiting list.",\n  "url": "/admin/applyHandle/search"\n}', done);
                }
            });
        });
    });

    // describe('TC3400 - Admin page-edit: #update()', function () {
    //     it('Should return 200 and update the data', function (done) {
    //         TRGP.find().then(function (forms) {
    //             if (forms.length != 0) {
    //                 var id = forms[0].id;
    //                 supertest(sails.hooks.http.app)
    //                 .post('/admin/applyHandle/TRGSEdit/' + id)
    //                 //.send("teamName=香港中學體操會")
    //                 .expect(200, done);
    //             }
    //         });
    //     });
    // });

    // describe('TC3600 - Admin page-confirm all: #confirmAll()', function () {
    //     it('Should show the success message("已確認全部申請表 Sucessfully confirm all applications.") in body and jump to /admin/applyHandle/search', function (done) {
    //         supertest(sails.hooks.http.app)
    //         .post('/admin/applyHandle/TRGP/confirmAll')
    //         .send("req.session.searchResult.category=預備A,B組&req.session.searchResult.payStatus=''&req.session.searchResult.formStatus=ToBeCon&req.session.searchResult.teamStatus=''")
    //         .expect(200, '{\n  "message": "已確認全部申請表 Sucessfully confirm all applications.",\n  "url": "/admin/applyHandle/search"\n}', done);


    //     });
    // });


});