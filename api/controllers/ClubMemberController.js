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


};

