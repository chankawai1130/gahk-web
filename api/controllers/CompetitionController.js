/**
 * CompetitionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    //action - view
    annex1: async function (req, res) {
        if (req.method == 'GET') { return res.view('pages/competition/onlineApplication/annex1'); }
    },

    //action - create
    Team_School_HKRGAgeGroupCompetitionform: async function (req, res) {
        if (req.method == 'GET') { return res.view('pages/competition/onlineApplication/Team_School_HKRGAgeGroupCompetitionform', { 'data': req.session.data || {} }); }

        // return res.view('membership/chineseMemberform', { 'data': req.session.data || {} });
        req.session.data = req.body.Competition;


        return res.view('pages/competition/onlineApplication/Team_School_HKRGAgeGroupCompetitionform', { 'data': req.session.data || {} });
    },



};

