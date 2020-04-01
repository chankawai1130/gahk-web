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

};

