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


    // admin/HandleApply
    //update form
    TRGP_update: async function (req, res) {
        if (req.method == "GET") {
            var model = await TRGCompetition.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('admin/applyHandle/TRGPEdit', { TRGP: model });

        } else {
            if (!req.body.TRGCompetition)
                return res.badRequest("Form-data not received.");

            var models = await TRGCompetition.update(req.params.id).set({
                teamName: req.body.TRGCompetition.teamName,
                Phone: req.body.TRGCompetition.Phone,
                Email: req.body.TRGCompetition.Email,
                CoachName: req.body.TRGCompetition.CoachName,
                CoachPhone: req.body.TRGCompetition.CoachPhone,
                category: req.body.TRGCompetition.category,
                havecname1: req.body.TRGCompetition.havecname1,
                Mate1ChiName: req.body.TRGCompetition.Mate1ChiName,
                Mate1EngName: req.body.TRGCompetition.Mate1EngName,
                Mate1IDNo: req.body.TRGCompetition.Mate1IDNo,
                Mate1Date: req.body.TRGCompetition.Mate1Date,
                havecname2: req.body.TRGCompetition.havecname2,
                Mate2ChiName: req.body.TRGCompetition.Mate2ChiName,
                Mate2EngName: req.body.TRGCompetition.Mate2EngName,
                Mate2IDNo: req.body.TRGCompetition.Mate2IDNo,
                Mate2Date: req.body.TRGCompetition.Mate2Date,
                havecname3: req.body.TRGCompetition.havecname3,
                Mate3ChiName: req.body.TRGCompetition.Mate3ChiName,
                Mate3EngName: req.body.TRGCompetition.Mate3EngName,
                Mate3IDNo: req.body.TRGCompetition.Mate3IDNo,
                Mate3Date: req.body.TRGCompetition.Mate3Date,
                havecname4: req.body.TRGCompetition.havecname4,
                Mate4ChiName: req.body.TRGCompetition.Mate4ChiName,
                Mate4EngName: req.body.TRGCompetition.Mate4EngName,
                Mate4IDNo: req.body.TRGCompetition.Mate4IDNo,
                Mate4Date: req.body.TRGCompetition.Mate4Date,
                TeamNumber: req.body.TRGCompetition.TeamNumber,
                TeamPrice: req.body.TRGCompetition.TeamPrice,
                TeamTotalPrice: req.body.TRGCompetition.TeamTotalPrice,
                leaderName: req.body.TRGCompetition.leaderName,
                leaderPosition: req.body.TRGCompetition.leaderPosition,
                Declaration: req.body.TRGCompetition.Declaration,
                VBRC: req.body.TRGCompetition.VBRC,
                payStatus: req.body.TRGCompetition.payStatus,
                formStatus: req.body.TRGCompetition.formStatus,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.redirect('/admin/applyHandle/search');

            // if (req.wantsJSON) {
            //     return res.json({ message: "Successfully updated", url: '/admin/applyHandle/search' });    // for ajax request
            // } else {
            //     return res.redirect('/admin/applyHandle/search');           // for normal request
            // }
        }
    },


    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await TRGCompetition.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "Application deleted.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }

    },


};

