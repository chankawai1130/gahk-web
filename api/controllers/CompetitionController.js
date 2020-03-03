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
        if (req.method == 'GET')
            return res.view('pages/competition/onlineApplication/Team_School_HKRGAgeGroupCompetitionform');

        if (!req.body.Competition)
            return res.badRequest("Form-data not received.");

        await Competition.create(req.body.Competition);

        return res.redirect('/'); //Change location to preview page
    },



};

