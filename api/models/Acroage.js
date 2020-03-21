/**
 * Acroage.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    levelCategory: {
      type: 'string',
    },

    itemCategory: {
      type: 'string',
    },

    //Applicant 1
    cpChiName1: {
      type: "string"
    },

    cpEngName1: {
      type: "string"
    },

    gender1: {
      type: "string"
    },

    birthday1: {
      type: "ref",
      columnType: "date"
    },

    idNo1: {
      type: 'string',
    },

    contactNo1: {
      type: 'string',
    },

    email1: {
      type: 'string',
    },

    address1: {
      type: 'string',
    },


    //Applicant 2
    cpChiName2: {
      type: "string"
    },

    cpEngName2: {
      type: "string"
    },

    gender2: {
      type: "string"
    },

    birthday2: {
      type: "ref",
      columnType: "date"
    },

    idNo2: {
      type: 'string',
    },

    contactNo2: {
      type: 'string',
    },

    email2: {
      type: 'string',
    },

    address2: {
      type: 'string',
    },

    //Applicant 3
    cpChiName3: {
      type: "string"
    },

    cpEngName3: {
      type: "string"
    },

    gender3: {
      type: "string"
    },

    birthday3: {
      type: "ref",
      columnType: "date"
    },

    idNo3: {
      type: 'string',
    },

    contactNo3: {
      type: 'string',
    },

    email3: {
      type: 'string',
    },

    address3: {
      type: 'string',
    },

    //coach
    coachName: {
      type: 'string',
    },

    cContactNo: {
      type: 'string',
    },

    organName: {
      type: 'string',
    },

    receiptHeader: {
      type: 'string',
    },

    receiptName: {
      type: 'string',
    },

    //declaration
    parentName1: {
      type: 'string',
    },

    parentName2: {
      type: 'string',
    },

    parentName3: {
      type: 'string',
    },

    payStatus: {
      type: "string", //unpaid; paid (decided by admin)
    },

    formStatus: {
      type: "string", //ToBeCon; accepted(decided by admin)
    },



    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

