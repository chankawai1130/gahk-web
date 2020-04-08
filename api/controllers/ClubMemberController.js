/**
 * ClubMemberController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //clubMembership Application - Apply process
  // action - create
  clubMemberForm: async function (req, res) {

    if (req.method == 'GET') { return res.view('membership/clubMemberForm'); }

    req.session.data = req.body.ClubMember;

    return res.view('membership/clubMemberFormPreview', { 'data': req.session.data || {} });
  },

  clubMemberFormPreview: async function (req, res) {
    if (req.method == 'POST') {
      req.session.data.payStatus = "unpaid";
      req.session.data.formStatus = "ToBeCon";
      req.session.data.teamStatus = "suTeam";

      await ClubMember.create(req.session.data);
      var model = await ClubMember.findOne(req.session.data);
      await ClubMember.update(model.id).set({
        idCode: "CLUBMem2020-" + model.id
      })
      model["idCode"] = "CLUBMem2020-" + model.id;
      req.session.data = {};  //clear data of session

      return res.view('membership/clubMemberFormConfirm', { 'form': model });
    }

  },

  //admin
  reject: async function (req, res) {
    if (req.method == "GET") return res.forbidden();

    var models = await ClubMember.update(req.params.id).set({ formStatus: "rejected" }).fetch();

    if (models.length == 0) return res.notFound();

    if (req.wantsJSON) {
        return res.json({ message: "申請已被拒絕 Application rejected.", url: '/admin/applyHandle/search' });    // for ajax request
    } else {
        return res.redirect('/admin/applyHandle/search');           // for normal request
    }

},

  confirmAll: async function (req, res) {

    if (req.method == "GET") return res.forbidden();

    var models = await ClubMember.find();

    if (models.length == 0) return res.notFound();

    models.forEach(async function (model) {
        await ClubMember.update(model.id).set({
            formStatus: "accepted"
        })
    });

    if (req.wantsJSON) {
        return res.json({ message: "已確認全部申請表 Sucessfully confirm all applications.", url: '/admin/applyHandle/search' });    // for ajax request
    } else {
        return res.redirect('/admin/applyHandle/search');           // for normal request
    }
},


};

