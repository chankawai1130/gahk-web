/**
 * TrampolineController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    //(preview)
    trampoline: async function (req, res) {

        if (req.method == 'GET') { return res.view('competition/form/trampoline'); }

        req.session.data = req.body.Trampoline;

        return res.view('pages/competition/form/TrampolinePreviewForm', { 'data': req.session.data || {} });
    },

    //(create)
    //action - create 
    trampolinePreviewForm: async function (req, res) {

        if (req.method == 'POST') {

            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            await Trampoline.create(req.session.data);
            var model = await Trampoline.findOne(req.session.data);
            await Trampoline.update(model.id).set({
                idCode: "TRA2020-" + model.id
            })
            model["idCode"] = "TRA2020-" + model.id;
            req.session.data = {};  //clear data of session

            return res.view('pages/competition/form/confirm_form', { 'form': model });
        }
    },

    view: async function (req, res) {

        var model = await Trampoline.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('admin/applyHandle/TrampolineEditForm', { trampoline: model });
    },

    json: async function (req, res) {

        var trampolines = await Trampoline.find();

        return res.json(trampolines);
    },

    admin: async function (req, res) {

        var value = await Trampoline.find();
        return res.view('admin/applyHandle/search', { trampolines: value });

    },

    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Trampoline.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        // return res.ok("Application Deleted.");

        if (req.wantsJSON) {
            return res.json({ message: "Application deleted.", url: '/' });    // for ajax request
        } else {
            return res.redirect('/');           // for normal request
        }
    },

    update: async function (req, res) {

        if (req.method == "GET") {

            var models = await Trampoline.findOne(req.params.id);

            if (!models) return res.notFound();

            return res.view('admin/applyHandle/TrampolineEditForm', { trampoline: models });

        } else {

            if (!req.body.Trampoline)
                return res.badRequest("Form-data not received.");

            var model = await Estate.update(req.params.id).set({
                gender: req.body.Trampoline.gender,
                category: req.body.Trampoline.category,
                havecname1: req.body.Trampoline.havecname1,
                chiName1: req.body.Trampoline.chiName1,
                engName1: req.body.Trampoline.engName1,
                birth1: req.body.Trampoline.birth1,
                phone1: req.body.Trampoline.phone1,
                email1: req.body.Trampoline.email1,
                address1: req.body.Trampoline.address1,
                havecname2: req.body.Trampoline.havecname2,
                chiName2: req.body.Trampoline.chiName2,
                engName2: req.body.Trampoline.engName2,
                birth2: req.body.Trampoline.birth2,
                phone2: req.body.Trampoline.phone2,
                email2: req.body.Trampoline.email2,
                address2: req.body.Trampoline.address2,
            }).fetch();

            if (model.length == 0) return res.notFound();

            return res.ok("Record updated");
        }
    },
};

