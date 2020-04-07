/**
 * GRGPController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GRGP_form: async function (req, res) {

        if (req.method == 'GET') { return res.view('competition/form/GRGP'); }

        req.session.data = req.body.GRGP;

        return res.view('pages/competition/form/GRGP_Preview', { 'data': req.session.data || {} });
    },

    //action - create
    GRGP_form_preview: async function (req, res) {

        if (req.method == 'POST') {

            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            req.session.data.teamStatus = "suTeam";
            await GRGP.create(req.session.data);
            var model = await GRGP.findOne(req.session.data);
            await GRGP.update(model.id).set({
                idCode: "GRGP2020-" + model.id
            })
            model["idCode"] = "GRGP2020-" + model.id;
            req.session.data = {};  //clear data of session

            return res.view('pages/competition/form/confirm_form', { 'form': model });
        }
    },

    //admin
    reject: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GRGP.update(req.params.id).set({ formStatus: "rejected" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被拒絕 Application rejected.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }

    },

};

