/**
 * GFAController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GFA_form: async function (req, res) {

        if (req.method == 'GET') { return res.view('competition/form/GFA'); }

        req.session.data = req.body.GFA;

        return res.view('pages/competition/form/GFA_Preview', { 'data': req.session.data || {} });
    },

    //action - create
    GFA_form_preview: async function (req, res) {

        if (req.method == 'POST') {

            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            await GFA.create(req.session.data);

            req.session.data = {};  //clear data of session

            return res.redirect('/competition/form/confirm_form');
        }
    },  

};

