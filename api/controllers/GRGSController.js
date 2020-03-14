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

        return res.view('pages/competition/form/GRGS_Preview', { 'data': req.session.data || {} });
    },

    //action - create
    GRGS_form_preview: async function (req, res) {

        if (req.method == 'POST') {
            await GRGS.create(req.session.data);

            req.session.data = {};  //clear data of session

            return res.redirect('/competition/form/confirm_form');
        }
    },  

};

