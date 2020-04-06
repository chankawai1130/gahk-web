/**
 * TRGPController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    //(preview)
    TRGPForm: async function (req, res) {

        if (req.method == 'GET') { return res.view('pages/competition/form/TRGPForm', { 'data': req.session.data || {} }); }

        req.session.data = req.body.TRGP;

        return res.view('pages/competition/form/TRGPFormPreview', { 'data': req.session.data || {} });
    },

    //(create)
    //action - create 
    TRGPFormPreview: async function (req, res) {

        if (req.method == 'POST') {
            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            await TRGP.create(req.session.data);
            var model = await TRGP.findOne(req.session.data);
            await TRGP.update(model.id).set({
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
            var model = await TRGP.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('admin/applyHandle/TRGPEdit', { TRGP: model });

        } else {
            if (!req.body.TRGP)
                return res.badRequest("Form-data not received.");

            var models = await TRGP.update(req.params.id).set({
                teamName: req.body.TRGP.teamName,
                Phone: req.body.TRGP.Phone,
                Email: req.body.TRGP.Email,
                CoachName: req.body.TRGP.CoachName,
                CoachPhone: req.body.TRGP.CoachPhone,
                category: req.body.TRGP.category,
                havecname1: req.body.TRGP.havecname1,
                Mate1ChiName: req.body.TRGP.Mate1ChiName,
                Mate1EngName: req.body.TRGP.Mate1EngName,
                Mate1IDNo: req.body.TRGP.Mate1IDNo,
                Mate1Date: req.body.TRGP.Mate1Date,
                havecname2: req.body.TRGP.havecname2,
                Mate2ChiName: req.body.TRGP.Mate2ChiName,
                Mate2EngName: req.body.TRGP.Mate2EngName,
                Mate2IDNo: req.body.TRGP.Mate2IDNo,
                Mate2Date: req.body.TRGP.Mate2Date,
                havecname3: req.body.TRGP.havecname3,
                Mate3ChiName: req.body.TRGP.Mate3ChiName,
                Mate3EngName: req.body.TRGP.Mate3EngName,
                Mate3IDNo: req.body.TRGP.Mate3IDNo,
                Mate3Date: req.body.TRGP.Mate3Date,
                havecname4: req.body.TRGP.havecname4,
                Mate4ChiName: req.body.TRGP.Mate4ChiName,
                Mate4EngName: req.body.TRGP.Mate4EngName,
                Mate4IDNo: req.body.TRGP.Mate4IDNo,
                Mate4Date: req.body.TRGP.Mate4Date,
                TeamNumber: req.body.TRGP.TeamNumber,
                TeamPrice: req.body.TRGP.TeamPrice,
                TeamTotalPrice: req.body.TRGP.TeamTotalPrice,
                leaderName: req.body.TRGP.leaderName,
                leaderPosition: req.body.TRGP.leaderPosition,
                Declaration: req.body.TRGP.Declaration,
                VBRC: req.body.TRGP.VBRC,
                payStatus: req.body.TRGP.payStatus,
                formStatus: req.body.TRGP.formStatus,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.redirect('/admin/applyHandle/search');
        }
    },


    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await TRGP.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被刪除 Application deleted.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }

    },

};

