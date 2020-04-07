/**
 * TRGSController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    TRGSForm: async function (req, res) {

        if (req.method == 'GET') { return res.view('pages/competition/form/TRGSForm', { 'data': req.session.data || {} }); }

        req.session.data = req.body.TRGS;

        return res.view('pages/competition/form/TRGSFormPreview', { 'data': req.session.data || {} });
    },

    //action - create
    TRGSFormPreview: async function (req, res) {

        if (req.method == 'POST') {
            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            await TRGS.create(req.session.data);
            var model = await TRGS.findOne(req.session.data);
            await TRGS.update(model.id).set({
                idCode: "TRGS2020-" + model.id
            })
            model["idCode"] = "TRGS2020-" + model.id;
            req.session.data = {};  //clear data of session

            return res.view('pages/competition/form/confirm_form', { 'form': model });
        }
    },

    confirmAll: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await TRGS.find();

        if (models.length == 0) return res.notFound();

        models.forEach(async function (model) {
            await TRGS.update(model.id).set({
                formStatus: "accepted"
            })
        });

        if (req.wantsJSON) {
            return res.json({ message: "已確認全部申請表 Sucessfully confirm all applications.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }
    },
  

};

