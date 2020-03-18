/**
 * TRGCompetitionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    //(preview)
    Team_HKRGAgeGroupCompetitionform: async function (req, res) {

        if (req.method == 'GET') { return res.view('competition/form/Team_HKRGAgeGroupCompetitionform'); }

        req.session.data = req.body.TRGCompetition;

        return res.view('pages/competition/form/Team_HKRGAgeGroupCompetitionFormPreview', { 'data': req.session.data || {} });
    },

    //(create)
    //action - create 
    Team_HKRGAgeGroupCompetitionFormPreview: async function (req, res) {

        if (req.method == 'POST') {
            await TRGCompetition.create(req.session.data);

            req.session.data = {};  //clear data of session

            return res.redirect('/competition/form/confirm_form');
        }
    },

};

