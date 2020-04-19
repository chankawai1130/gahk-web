/**
 * GFAController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GFA_form: async function (req, res) {

        if (req.method == 'GET') { return res.view('competition/form/GFA_form'); }

        req.session.data = req.body.GFA;

        return res.view('pages/competition/form/GFA_Preview', { 'data': req.session.data || {} });
    },

    //action - create
    GFA_form_preview: async function (req, res) {

        if (req.method == 'POST') {

            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            req.session.data.teamStatus = "suTeam";
            await GFA.create(req.session.data);
            var model = await GFA.findOne(req.session.data);
            await GFA.update(model.id).set({
                idCode: "GFA2020-" + model.id
            })
            model["idCode"] = "GFA2020-" + model.id;

            //clear formdata in session and user
            req.session.data = {};
            req.session.gfaData = {};
            var user = await User.update(req.session.userId).set({
                gfaData: {}
            }).fetch();
            if (user.length == 0) return res.notFound();
            //

            return res.view('pages/competition/form/confirm_form', { 'form': model });
        }
    },

    //action - save
    save: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        req.session.gfaData = req.body;

        var user = await User.update(req.session.userId).set({
            gfaData: req.body
        }).fetch();

        if (user.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "儲存成功 Sucessfully save.", url: '/competition/form/GFA_form' });    // for ajax request
        } else {
            return res.redirect('/competition/form/GFA_form');           // for normal request
        }
    },

    //admin
    // action - update
    update: async function (req, res) {

        if (req.method == "GET") {
            var model = await GFA.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('admin/applyHandle/GFAEditForm', { gfa: model });

        }
        else {

            if (!req.body.GFA)
                return res.badRequest("Form-data not received.");

            var models = await GFA.update(req.params.id).set({
                teamName: req.body.GFA.teamName,
                receiptHeader: req.body.GFA.receiptHeader,
                address: req.body.GFA.address,
                category: req.body.GFA.category,
                havecname: req.body.GFA.havecname,
                cpChiName1: req.body.GFA.cpChiName1,
                cpEngName1: req.body.GFA.cpEngName1,
                cpDayPhone: req.body.GFA.cpDayPhone,
                cpMobilePhone: req.body.GFA.cpMobilePhone,
                email: req.body.GFA.email,
                applicantNum: req.body.GFA.applicantNum,
                crewNum: req.body.GFA.crewNum,
                checkNum: req.body.GFA.checkNum,
                bankName: req.body.GFA.bankName,
                document: req.body.GFA.document,
                payStatus: req.body.GFA.payStatus,
                formStatus: req.body.GFA.formStatus,
                teamStatus: req.body.GFA.teamStatus,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.redirect('/admin/applyHandle/search');
        }
    },

    reject: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GFA.update(req.params.id).set({ formStatus: "rejected" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被拒絕 Application has been rejected.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
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

        var models = await GFA.find({
            where: condition
        });

        if (models.length == 0) return res.notFound();

        models.forEach(async function (model) {
            if (model.formStatus == "ToBeCon" || model.formStatus == "dataDef") {
                await GFA.update(model.id).set({ formStatus: "accepted" })
            }
        });

        if (req.wantsJSON) {
            return res.json({ message: "已確認全部申請表 Sucessfully confirm all applications.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }
    },

    // action - confirm form
    confirm: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GFA.update(req.params.id).set({ formStatus: "accepted" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被確認 Application has been accepted.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }
    },

    dataDef: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GFA.update(req.params.id).set({ formStatus: "dataDef" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請資料不全 Data Deficiency.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }

    },

    waitingList: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GFA.update(req.params.id).set({ teamStatus: "waitTeam" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請隊伍/團體已設為後補 Applied Team/Group has been set on waiting list.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }

    },

};

