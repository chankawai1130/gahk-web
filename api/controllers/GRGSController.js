/**
 * GRGSController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GRGS_form: async function (req, res) {

        if (req.method == 'GET') { return res.view('competition/form/GRGS'); }
        
        req.session.data = req.body.GRGS;

        return res.view('pages/competition/form/GRGS_Preview', { 'data': req.session.GRGSdata || {} });
    },


    //action - create
    GRGS_form_preview: async function (req, res) {

        if (req.method == 'POST') {

            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            req.session.data.teamStatus = "suTeam";
            await GRGS.create(req.session.data);

            //update form idCode
            var model = await GRGS.findOne(req.session.data);
            await GRGS.update(model.id).set({
                idCode: "GRGS2020-" + model.id
            })
            model["idCode"] = "GRGS2020-" + model.id;
            //

            //clear formdata in session and user
            req.session.data = {};  
            req.session.GRGSdata = {};  
            var user = await User.update(req.session.userId).set({
                GRGSdata: {}
            }).fetch();
            if (user.length == 0) return res.notFound();
            //

            return res.view('pages/competition/form/confirm_form', { 'form': model });
        }
    },

    //action - save
    save: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        req.session.GRGSdata = req.body;
        
        var user = await User.update(req.session.userId).set({
            GRGSdata: req.body
        }).fetch();

        if (user.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "儲存成功 Sucessfully save.", url: '/competition/form/GRGS' });    // for ajax request
        } else {
            return res.redirect('/competition/form/GRGS');           // for normal request
        }
    },

    //-------------------------------------Admin----------------------------------------//
    // action - update
    update: async function (req, res) {

        if (req.method == "GET") {
            var model = await GRGS.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('admin/applyHandle/GRGSEditForm', { grgs: model });

        }
        else {

            if (!req.body.GRGS)
                return res.badRequest("Form-data not received.");

            var models = await GRGS.update(req.params.id).set({
                teamName: req.body.GRGS.teamName,
                phone: req.body.GRGS.phone,
                email: req.body.GRGS.email,
                category: req.body.GRGS.category,
                havecname1: req.body.GRGS.havecname1,
                chiName1: req.body.GRGS.chiName1,
                engName1: req.body.GRGS.engName1,
                ID1: req.body.GRGS.ID1,
                birth1: req.body.GRGS.birth1,
                imgIDCard0: req.body.GRGS.imgIDCard0,
                havecname2: req.body.GRGS.havecname2,
                chiName2: req.body.GRGS.chiName2,
                engName2: req.body.GRGS.engName2,
                ID2: req.body.GRGS.ID2,
                birth2: req.body.GRGS.birth2,
                imgIDCard1: req.body.GRGS.imgIDCard1,
                havecname3: req.body.GRGS.havecname3,
                chiName3: req.body.GRGS.chiName3,
                engName3: req.body.GRGS.engName3,
                ID3: req.body.GRGS.ID3,
                birth3: req.body.GRGS.birth3,
                imgIDCard2: req.body.GRGS.imgIDCard2,
                havecname4: req.body.GRGS.havecname4,
                chiName4: req.body.GRGS.chiName4,
                engName4: req.body.GRGS.engName4,
                ID4: req.body.GRGS.ID4,
                birth4: req.body.GRGS.birth4,
                imgIDCard3: req.body.GRGS.imgIDCard3,
                havecname5: req.body.GRGS.havecname5,
                chiName5: req.body.GRGS.chiName5,
                engName5: req.body.GRGS.engName5,
                ID5: req.body.GRGS.ID5,
                birth5: req.body.GRGS.birth5,
                imgIDCard4: req.body.GRGS.imgIDCard4,
                havecname6: req.body.GRGS.havecname6,
                chiName6: req.body.GRGS.chiName6,
                engName6: req.body.GRGS.engName6,
                ID6: req.body.GRGS.ID6,
                birth6: req.body.GRGS.birth6,
                imgIDCard5: req.body.GRGS.imgIDCard5,
                coachName: req.body.GRGS.coachName,
                coachPhone: req.body.GRGS.coachPhone,
                leaderName: req.body.GRGS.leaderName,
                leaderPosition: req.body.GRGS.leaderPosition,
                NoOfTeam: req.body.GRGS.NoOfTeam,
                teamFee: req.body.GRGS.teamFee,
                NoOfPeople: req.body.GRGS.NoOfPeople,
                insurance: req.body.GRGS.insurance,
                total: req.body.GRGS.total,
                declaration: req.body.GRGS.declaration,
                payStatus: req.body.GRGS.payStatus,
                formStatus: req.body.GRGS.formStatus,
                teamStatus: req.body.GRGS.teamStatus,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.redirect('/admin/applyHandle/search');
        }
    },

    // action - confirm all
    confirmAll: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var condition = {};

        if (req.session.searchResult.category) condition.category = req.session.searchResult.category;
        if (req.session.searchResult.payStatus) condition.payStatus = req.session.searchResult.payStatus;
        if (req.session.searchResult.formStatus) condition.formStatus = req.session.searchResult.formStatus;
        if (req.session.searchResult.teamStatus) condition.teamStatus = req.session.searchResult.teamStatus;

        var models = await GRGS.find({
            where: condition
        });

        if (models.length == 0) return res.notFound();

        models.forEach(async function (model) {
            if (model.formStatus == "ToBeCon" || model.formStatus == "dataDef") {
                await GRGS.update(model.id).set({ formStatus: "accepted" })
            }
        });

        if (req.wantsJSON) {
            return res.json({ message: "已確認全部申請表 Sucessfully confirm all applications.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }
    },

    // action - reject form
    reject: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GRGS.update(req.params.id).set({ formStatus: "rejected" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被拒絕 Application has been rejected.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }

    },

    // action - confirm form
    confirm: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GRGS.update(req.params.id).set({ formStatus: "accepted" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被確認 Application has been accepted.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }
    },

    // action - data deficiency
    dataDef: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GRGS.update(req.params.id).set({ formStatus: "dataDef" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請資料不全 Data Deficiency.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }

    },

    //action - waitingTeam
    waitingList: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GRGS.update(req.params.id).set({ teamStatus: "waitTeam" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請隊伍/團體已設為後補 Applied Team/Group has been set on waiting list.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }

    },

    // action - export excel
    export_xlsx: async function (req, res) {

        var condition = {};

        if (req.session.searchResult.category) condition.category = req.session.searchResult.category;
        if (req.session.searchResult.payStatus) condition.payStatus = req.session.searchResult.payStatus;
        if (req.session.searchResult.formStatus) condition.formStatus = req.session.searchResult.formStatus;
        if (req.session.searchResult.teamStatus) condition.teamStatus = req.session.searchResult.teamStatus;

        var models = await GRGS.find({
            where: condition
        });

        var XLSX = require('xlsx');
        var wb = XLSX.utils.book_new();

        var ws = XLSX.utils.json_to_sheet(models.map(model => {
            var createTime = new Date(model.createdAt);
            var month = createTime.getMonth() + 1;
            var applyDate = createTime.getDate() + "/" + month + "/" + createTime.getFullYear();

            var updateTime = new Date(model.updatedAt);
            var month = updateTime.getMonth() + 1;
            var updateDate = updateTime.getDate() + "/" + month + "/" + updateTime.getFullYear() + " " + updateTime.getHours() + ":" + updateTime.getMinutes() + ":" + updateTime.getSeconds();

            var day1 = model.birth1.split('-');
            var date1 = day1[2] + "/" + day1[1] + "/" + day1[0];
            var day2 = model.birth2.split('-');
            var date2 = day2[2] + "/" + day2[1] + "/" + day2[0];
            var day3 = model.birth3.split('-');
            var date3 = day3[2] + "/" + day3[1] + "/" + day3[0];
            var day4 = model.birth4.split('-');
            var date4 = day4[2] + "/" + day4[1] + "/" + day4[0];
            var day5 = model.birth5.split('-');
            var date5 = day5[2] + "/" + day5[1] + "/" + day5[0];
            var day6 = model.birth6.split('-');
            var date6 = day6[2] + "/" + day6[1] + "/" + day6[0];

            if (model.formStatus == "accepted") {
                var formS = "已確認 Accepted";
            } else if (model.formStatus == "rejected") {
                var formS = "已拒絕 Rejected";
            } else if (model.formStatus == "dataDef") {
                var formS = "資料不全 Data Deficiency";
            } else if (model.formStatus == "ToBeCon") {
                var formS = "待處理 To be handled";
            }

            if (model.teamStatus == "suTeam") {
                var teamS = "正選 Successful Team";
            } else if (model.teamName == "waitTeam") {
                var teamS = "後備 Team on Waitiing List";
            }

            if (model.payStatus == "unpaid") {
                var payS = "未付款 Unpaid";
            } else if (model.payStatus == "paid") {
                var payS = "已付款 Paid";
            }

            return {
                "申請表編號 Application Number": model.idCode,
                "隊伍名稱(中文) Team Name(Chinese)": model.teamName,
                "聯絡電話 Contact Number": model.phone,
                "聯絡電郵 Email Address": model.email,
                "教練姓名 Coach Name": model.coachName,
                "教練聯絡電話 Coach Contact Number": model.coachPhone,
                "組別及比賽項目 Category and Competition Item": model.category,
                "參加者(1)是否有中文姓名 Applicant(1) Any Chinese name": model.havecname1,
                "參加者(1)中文姓名 Applicant(1) Name in Chinese": model.chiName1,
                "參加者(1)英文姓名 Applicant(1) Name in English": model.engName1,
                "參加者(1)身份證號碼 Applicant(1) ID Card Number": model.ID1,
                "參加者(1)出生日期 Applicant(1) Date of Birth": date1,
                "參加者(2)中文姓名 Applicant(2) Chinese Name": model.chiName2,
                "參加者(2)英文姓名 Applicant(2) English Name": model.engName2,
                "參加者(2)身份證號碼 Applicant(2) ID Card Number": model.ID2,
                "參加者(2)出生日期 Applicant(2) Date of Birth": date2,
                "參加者(3)中文姓名 Applicant(3) Chinese Name": model.chiName3,
                "參加者(3)英文姓名 Applicant(3) English Name": model.engName3,
                "參加者(3)身份證號碼 Applicant(3) ID Card Number": model.ID3,
                "參加者(3)出生日期 Applicant(3) Date of Birth": date3,
                "參加者(4)中文姓名 Applicant(4) Chinese Name": model.chiName4,
                "參加者(4)英文姓名 Applicant(4) English Name": model.engName4,
                "參加者(4)身份證號碼 Applicant(4) ID Card Number": model.ID4,
                "參加者(4)出生日期 Applicant(4) Date of Birth": date4,
                "參加者(5)中文姓名 Applicant(5) Chinese Name": model.chiName5,
                "參加者(5)英文姓名 Applicant(5) English Name": model.engName5,
                "參加者(5)身份證號碼 Applicant(5) ID Card Number": model.ID5,
                "參加者(5)出生日期 Applicant(5) Date of Birth": date5,
                "參加者(6)中文姓名 Applicant(6) Chinese Name": model.chiName6,
                "參加者(6)英文姓名 Applicant(6) English Name": model.engName6,
                "參加者(6)身份證號碼 Applicant(6) ID Card Number": model.ID6,
                "參加者(6)出生日期 Applicant(6) Date of Birth": date6,
                "隊伍負責人姓名 Leader's Name": model.leaderName,
                "隊伍負責人職位 Leader's Position": model.leaderPosition,
                "隊伍數目 Number of Team(s)": model.NoOfTeam,
                "人數 people": model.NoOfPeople,
                "集體項目價錢 Cost of Collective Subject ($)": model.teamFee,
                "保險 Insurance ($)": model.insurance,
                "總額 Total Price ($)": model.total,
                "付款狀況 Payment Status": payS,
                "申請狀況 Apply Status": formS,
                "隊伍/團體狀況 Team Status": teamS,
                "提交日期 Apply Date": applyDate,
                "上次更新 Last upadated": updateDate
            }
        }));
        XLSX.utils.book_append_sheet(wb, ws, "GRGS");

        res.set("Content-disposition", "attachment; filename=GRGS.xlsx");
        return res.end(XLSX.write(wb, { type: "buffer", bookType: "xlsx" }));
    },
};

