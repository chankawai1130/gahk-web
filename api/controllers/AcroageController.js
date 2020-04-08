/**
 * AcroageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    //action - create
    acroage: async function (req, res) {

        if (req.method == 'GET') { return res.view('pages/competition/form/acroage', { 'data': req.session.data || {} }); }

        req.session.data = req.body.Acroage;

        return res.view('pages/competition/form/acroage_preview', { 'data': req.session.data || {} });
    },

    //(preview)
    acroage_preview: async function (req, res) {

        if (req.method == 'POST') {

            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            req.session.data.teamStatus = "suTeam";
            await Acroage.create(req.session.data);
            var model = await Acroage.findOne(req.session.data);
            await Acroage.update(model.id).set({
                idCode: "AGO2020-" + model.id
            })
            model["idCode"] = "AGO2020-" + model.id;
            req.session.data = {};  //clear data of session

            return res.view('pages/competition/form/confirm_form', { 'form': model });
        }
    },


    //admin
    reject: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await Acroage.update(req.params.id).set({ formStatus: "rejected" }).fetch();

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

        if (req.session.searchResult.item) condition.item = req.session.searchResult.item;
        if (req.session.searchResult.category) condition.category = req.session.searchResult.category;
        if (req.session.searchResult.payStatus) condition.payStatus = req.session.searchResult.payStatus;
        if (req.session.searchResult.formStatus) condition.formStatus = req.session.searchResult.formStatus;
        if (req.session.searchResult.teamStatus) condition.teamStatus = req.session.searchResult.teamStatus;

        var models = await Acroage.find({
            where: condition
        });

        if (models.length == 0) return res.notFound();

        models.forEach(async function (model) {
            await Acroage.update(model.id).set({ formStatus: "accepted" })
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

        var models = await Acroage.update(req.params.id).set({ formStatus: "accepted" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被確認 Application has been accepted.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }
    },


};