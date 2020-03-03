/**
 * TRGCompetitionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // json function
    json: async function (req, res) {

        var applications = await TRGCompetition.find();

        return res.json(applications);
    },

    //action - create
    Team_HKRGAgeGroupCompetitionform: async function (req, res) {
        if (req.method == 'GET')
            return res.view('pages/competition/onlineApplication/Team_HKRGAgeGroupCompetitionform');

        if (!req.body.TRGCompetition)
            return res.badRequest("Form-data not received.");

        await TRGCompetition.create(req.body.TRGCompetition);

        //return res.redirect('/'); //Change location to preview page
        return res.ok("ok");
    },
  
};

