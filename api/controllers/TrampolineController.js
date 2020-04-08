/**
 * TrampolineController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    //(preview)
    trampoline: async function (req, res) {

        if (req.method == 'GET') { return res.view('competition/form/trampoline'); }

        req.session.data = req.body.Trampoline;

        return res.view('pages/competition/form/TrampolinePreviewForm', { 'data': req.session.data || {} });
    },

    //(create)
    //action - create 
    trampolinePreviewForm: async function (req, res) {

        if (req.method == 'POST') {

            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            req.session.data.teamStatus = "suTeam";
            await Trampoline.create(req.session.data);
            var model = await Trampoline.findOne(req.session.data);
            await Trampoline.update(model.id).set({
                idCode: "TRA2020-" + model.id
            })
            model["idCode"] = "TRA2020-" + model.id;
            req.session.data = {};  //clear data of session

            return res.view('pages/competition/form/confirm_form', { 'form': model });
        }
    },

    view: async function (req, res) {

        var model = await Trampoline.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('admin/applyHandle/TrampolineEditForm', { trampoline: model });
    },

    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Trampoline.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        // return res.ok("Application Deleted.");

        if (req.wantsJSON) {
            return res.json({ message: "Application deleted.", url: '/' });    // for ajax request
        } else {
            return res.redirect('/');           // for normal request
        }
    },

    update: async function (req, res) {

        if (req.method == "GET") {

            var models = await Trampoline.findOne(req.params.id);

            if (!models) return res.notFound();

            return res.view('admin/applyHandle/TrampolineEditForm', { trampoline: models });

        } else {

            if (!req.body.Trampoline)
                return res.badRequest("Form-data not received.");

            var model = await Estate.update(req.params.id).set({
                gender: req.body.Trampoline.gender,
                category: req.body.Trampoline.category,
                havecname1: req.body.Trampoline.havecname1,
                chiName1: req.body.Trampoline.chiName1,
                engName1: req.body.Trampoline.engName1,
                birth1: req.body.Trampoline.birth1,
                phone1: req.body.Trampoline.phone1,
                email1: req.body.Trampoline.email1,
                address1: req.body.Trampoline.address1,
                havecname2: req.body.Trampoline.havecname2,
                chiName2: req.body.Trampoline.chiName2,
                engName2: req.body.Trampoline.engName2,
                birth2: req.body.Trampoline.birth2,
                phone2: req.body.Trampoline.phone2,
                email2: req.body.Trampoline.email2,
                address2: req.body.Trampoline.address2,
            }).fetch();

            if (model.length == 0) return res.notFound();

            return res.ok("Record updated");
        }
    },

    // action - confirm all
    confirmAll: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var condition = {};

        if (req.session.searchResult.gender) condition.gender = req.session.searchResult.gender;
        if (req.session.searchResult.category) condition.category = req.session.searchResult.category;
        if (req.session.searchResult.payStatus) condition.payStatus = req.session.searchResult.payStatus;
        if (req.session.searchResult.formStatus) condition.formStatus = req.session.searchResult.formStatus;
        if (req.session.searchResult.teamStatus) condition.teamStatus = req.session.searchResult.teamStatus;

        var models = await Trampoline.find({
            where: condition
        });

        if (models.length == 0) return res.notFound();

        models.forEach(async function (model) {
            await Trampoline.update(model.id).set({ formStatus: "accepted" })
        });

        if (req.wantsJSON) {
            return res.json({ message: "已確認全部申請表 Sucessfully confirm all applications.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }
    },

    reject: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await Trampoline.update(req.params.id).set({ formStatus: "rejected" }).fetch();

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

        var models = await Trampoline.update(req.params.id).set({ formStatus: "accepted" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被確認 Application has been accepted.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }
    },

    dataDef: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await Trampoline.update(req.params.id).set({ formStatus: "dataDef" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請資料不全 Data Deficiency.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }

    },

    waitingList: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await Trampoline.update(req.params.id).set({ teamStatus: "waitTeam" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請隊伍/團體已設為後補 Applied Team/Group has been set on waiting list.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }

    },
};

