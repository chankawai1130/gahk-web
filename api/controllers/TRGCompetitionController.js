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
            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            await TRGCompetition.create(req.session.data);
            var model = await TRGCompetition.findOne(req.session.data);
            await TRGCompetition.update(model.id).set({
                idCode: "TRGP2020-" + model.id
            })
            model["idCode"] = "TRGP2020-" + model.id;
            req.session.data = {};  //clear data of session

            return res.view('pages/competition/form/confirm_form', { 'form': model });
        }
    },

};

