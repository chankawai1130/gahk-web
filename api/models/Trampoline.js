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

    gender: { 
      type:'string', 
    },

    category: { 
      type:'string', 
    },

    chiName1: {
      type: "string"
    },

    engName1: {
      type: "string"
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

    teamName: {
      type: "string"
    },

    coachAddress:{
      type: "string"
    },

    coachNum:{
      type: "string"
    },

    coachName: {
      type: "string"
    },

    coachPhone: {
      type: "number"
    },

    parentName1: {
      type: 'string',
    },

    parentName2: {
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

