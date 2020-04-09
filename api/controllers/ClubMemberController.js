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
      return res.json({ message: "申請已被拒絕 Application has been rejected.", url: '/admin/applyHandle/search' });    // for ajax request
    } else {
      return res.redirect('/admin/applyHandle/search');           // for normal request
    }

  },

  confirmAll: async function (req, res) {

    if (req.method == "GET") return res.forbidden();

    var condition = {};

    if (req.session.searchResult.payStatus) condition.payStatus = req.session.searchResult.payStatus;
    if (req.session.searchResult.formStatus) condition.formStatus = req.session.searchResult.formStatus;

    var models = await ClubMember.find({
      where: condition
    });

    if (models.length == 0) return res.notFound();

    models.forEach(async function (model) {
      if (model.formStatus == "ToBeCon" || model.formStatus == "dataDef") {
        await ClubMember.update(model.id).set({ formStatus: "accepted" })
      }
    });

    if (req.wantsJSON) {
      return res.json({ message: "已確認全部申請表 Sucessfully confirm all applications.", url: '/admin/applyHandle/search' });    // for ajax request
    } else {
      return res.redirect('/admin/applyHandle/search');           // for normal request
    }
  },

  // action - confirm form
  confirm: async function (req, res) {
    if (req.method == "GET") return res.forbidden();

    var models = await ClubMember.update(req.params.id).set({ formStatus: "accepted" }).fetch();

    if (models.length == 0) return res.notFound();

    if (req.wantsJSON) {
      return res.json({ message: "申請已被確認 Application has been accepted.", url: '/admin/applyHandle/search' });    // for ajax request
    } else {
      return res.redirect('/admin/applyHandle/search');           // for normal request
    }
  },

  dataDef: async function (req, res) {
    if (req.method == "GET") return res.forbidden();

    var models = await ClubMember.update(req.params.id).set({ formStatus: "dataDef" }).fetch();

    if (models.length == 0) return res.notFound();

    if (req.wantsJSON) {
      return res.json({ message: "申請資料不全 Data Deficiency.", url: '/admin/applyHandle/search' });    // for ajax request
    } else {
      return res.redirect('/admin/applyHandle/search');           // for normal request
    }

  },

  export_xlsx: async function (req, res) {
    var condition = {};

    if (req.session.searchResult.payStatus) condition.payStatus = req.session.searchResult.payStatus;
    if (req.session.searchResult.formStatus) condition.formStatus = req.session.searchResult.formStatus;

    var models = await ClubMember.find({
      where: condition
    });

    var XLSX = require('xlsx');
    var wb = XLSX.utils.book_new();
    var payStatus, formStatus;
    var ws = XLSX.utils.json_to_sheet(models.map(model => {

      var n = new Date(model.createdAt);
      var cmonth = n.getMonth() + 1;
      var applyDate = n.getDate() + "/" + cmonth + "/" + n.getFullYear();

      var m = new Date(model.updatedAt);
      var umonth = m.getMonth() + 1;
      var updateDate = m.getDate() + "/" + umonth + "/" + m.getFullYear() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();

      if (model.payStatus == "paid") {
        payStatus = "已付款 Paid";
      } else {
        payStatus = "未付款 Unpaid";
      }

      if (model.formStatus == "ToBeCon") {
        formStatus = "待處理 To be handled";
      } else if (model.formStatus == "accepted") {
        formStatus = "已確認 Accepted";
      } else if (model.formStatus == "rejected") {
        formStatus = "已拒絕 Rejected";
      } else if (model.formStatus == "dataDef") {
        formStatus = "資料不全 Data Deficiency";
      }

      return {
        "申請表編號 Application Number": model.idCode,
        "機構(英文) Organization(English)": model.OrgEngName,
        "機構(中文) Organization(Chinese)": model.OrgChiName,
        "申請者姓名(英文) Name of Applicant(English)": model.AppEngName,
        "申請者姓名(中文) Name of Applicant(Chinese)": model.AppChiName,
        "申請者地址 Address": model.clubAddr,
        "申請者電話 Tel": model.clubTel,
        "申請者傳真 Fax": model.clubFax,
        "申請者電郵 E-mail": model.clubEmail,
        "申請者網址 Web-site": model.clubWeb,
        "機構成員人數 No. of Members in the Organization": model.MemberNo,
        "請簡單描述貴機構/團體/學校曾舉辦或參與的體操活動 Brief description of gymnastic activities which the Organization/Club/School has organized/taken part": model.brefDes,
        "機構代表/負責人姓名(英文) Organization Representative / Person in charge Name(English)": model.resEngName,
        "機構代表/負責人姓名(中文) Organization Representative / Person in charge Name(Chinese)": model.resChiName,
        "職位 Position held": model.position,
        "機構代表/負責人申請者地址 Organization Representative / Person in charge Address": model.resAddr,
        "機構代表/負責人申請者電話 Organization Representative / Person in charge Tel": model.resTel,
        "機構代表/負責人申請者傳真 Organization Representative / Person in charge Fax": model.resFax,
        "機構代表/負責人申請者電郵 Organization Representative / Person in charge E-mail": model.resEmail,
        "Membership Year 會員年長": model.year,
        "Membership Fee 會員費": model.clubFee,
        "付款狀況 Payment Status": payStatus,
        "申請狀況 Apply Status": formStatus,
        "提交日期 Apply Date (dd/mm/yyyy)": applyDate,
        "上次更新 Last upadated": updateDate,
      }
    }));
    XLSX.utils.book_append_sheet(wb, ws, "ClubMember");
    res.set("Content-disposition", "attachment; filename=ClubMember.xlsx");
    return res.end(XLSX.write(wb, { type: "buffer", bookType: "xlsx" }));
  },



};

