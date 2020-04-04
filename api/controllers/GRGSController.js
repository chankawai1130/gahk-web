/**
 * GRGSController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GRGS_form: async function (req, res) {

        if (req.method == 'GET') { return res.view('competition/form/GRGS'); }

        req.session.data = req.body.GRGS;

        return res.view('pages/competition/form/GRGS_Preview', { 'data': req.session.data || {} });
    },

    //action - create
    GRGS_form_preview: async function (req, res) {

        if (req.method == 'POST') {

            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            await GRGS.create(req.session.data);
            var model = await GRGS.findOne(req.session.data);
            await GRGS.update(model.id).set({
                idCode: "GRGS2020-" + model.id
            })
            model["idCode"] = "GRGS2020-" + model.id;
            req.session.data = {};  //clear data of session

            return res.view('pages/competition/form/confirm_form', { 'form': model });
        }
    },

    // action - update
    update: async function (req, res) {

        if (req.method == "GET") {
            var model = await GRGS.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('admin/applyHandle/GRGSEditForm', { grgs: model });

        } else {

            if (!req.body.GRGS)
                return res.badRequest("Form-data not received.");

            var models = await GRGS.update(req.params.id).set({
                teamName: req.body.GRGS.teamName,
                phone: req.body.GRGS.phone,
                email: req.body.GRGS.email,
                havecname1: req.body.GRGS.havecname1,
                chiName1: req.body.GRGS.chiName1,
                engName1: req.body.GRGS.engName1,
                ID1: req.body.GRGS.ID1,
                birth1: req.body.GRGS.birth1,
                havecname2: req.body.GRGS.havecname2,
                chiName2: req.body.GRGS.chiName2,
                engName2: req.body.GRGS.engName2,
                ID2: req.body.GRGS.ID2,
                birth2: req.body.GRGS.birth2,
                havecname3: req.body.GRGS.havecname3,
                chiName3: req.body.GRGS.chiName3,
                engName3: req.body.GRGS.engName3,
                ID3: req.body.GRGS.ID3,
                birth3: req.body.GRGS.birth3,
                havecname4: req.body.GRGS.havecname4,
                chiName4: req.body.GRGS.chiName4,
                engName4: req.body.GRGS.engName4,
                ID4: req.body.GRGS.ID4,
                birth4: req.body.GRGS.birth4,
                havecname5: req.body.GRGS.havecname5,
                chiName5: req.body.GRGS.chiName5,
                engName5: req.body.GRGS.engName5,
                ID5: req.body.GRGS.ID5,
                birth5: req.body.GRGS.birth5,
                havecname6: req.body.GRGS.havecname6,
                chiName6: req.body.GRGS.chiName6,
                engName6: req.body.GRGS.engName6,
                ID6: req.body.GRGS.ID6,
                birth6: req.body.GRGS.birth6,
                coachName: req.body.GRGS.coachName,
                coachPhone: req.body.GRGS.coachPhone,
                leaderName: req.body.GRGS.leaderName,
                leaderPosition: req.body.GRGS.leaderPosition,
                NoOfTeam: req.body.GRGS.NoOfTeam,
                teamFee: req.body.GRGS.teamFee,
                NoOfPeople: req.body.GRGS.NoOfPeople,
                insurance: req.body.GRGS.insurance,
                total: req.body.GRGS.total,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.ok("Record updated");
        }
    },

};

