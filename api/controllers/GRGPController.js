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
            await GRGP.create(req.session.data);

            req.session.data = {};  //clear data of session

            return res.redirect('/competition/form/confirm_form');
        }
    },  

};

