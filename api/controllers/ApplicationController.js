/**
 * ApplicationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    Team_HKRGAgeGroupCompetition_form: async function (req, res) {
        if (req.method == 'GET') { return res.view('pages/competition/onlineApplication/Team_HKRGAgeGroupCompetition_form', { 'data': req.session.data || {} }); }

        // return res.view('membership/chineseMemberform', { 'data': req.session.data || {} });
        req.session.data = req.body.Application;


        return res.view('pages/competition/onlineApplication/Team_HKRGAgeGroupCompetition_form', { 'data': req.session.data || {} });
    }

};

