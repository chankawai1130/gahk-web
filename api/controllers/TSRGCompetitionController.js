/**
 * TSRGCompetitionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    Team_School_HKRGAgeGroupCompetitionform: async function (req, res) {

        if (req.method == 'GET') { return res.view('competition/form/Team_School_HKRGAgeGroupCompetitionform'); }

        req.session.data = req.body.TSRGCompetition;

        return res.view('pages/competition/form/Team_School_HKRGAgeGroupCompetitionFormPreview', { 'data': req.session.data || {} });
    },

    //action - create
    Team_School_HKRGAgeGroupCompetitionFormPreview: async function (req, res) {

        if (req.method == 'POST') {
            await TSRGCompetition.create(req.session.data);

            req.session.data = {};  //clear data of session

            return res.redirect('/competition/form/confirm_form');
        }
    },

};

