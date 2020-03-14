/**
 * Trampoline.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    chiName1: {
      type: "string"
    },

    engName1: {
      type: "string"
    },

    ID1: {
      type: "string",
      required: true,
      unique: true
    },

    birth1: {
      type: "string"
    },

    email1: {
      type: "string"
    }, 

    phone1: {
      type: "number"
    },

    address1: {
      type: "string"
    },

    chiName2: {
      type: "string"
    },

    engName2: {
      type: "string"
    },

    ID2: {
      type: "string",
      required: true,
      unique: true
    },

    birth2: {
      type: "string"
    },

    email2: {
      type: "string"
    }, 

    phone2: {
      type: "number"
    },

    address2: {
      type: "string"
    },

    orgName: {
      type: "string"
    },

    coachAddress:{
      type: "string"
    },

    coachNum:{
      type: "number"
    },

    coachName: {
      type: "string"
    },

    coachPhone: {
      type: "number"
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

