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
    cpChiName: {
      type: "string"
    },

    cpEngName: {
      type: "string"
    },

    gender: {
      type: "string"
    },

    birthday: {
      type: "ref",
      columnType: "date"
    },

    idNo: {
      type: 'string',
    },

    contactNo: {
      type: 'string',
    },

    email: {
      type: 'string',
    },

    address: {
      type: 'string',
    },

    levelCategory: { 
      type:'string', 
    },

    itemCategory: { 
      type:'string', 
    },

    coachName: { 
      type:'string', 
    },
    
    cContactNo: { 
      type:'string', 
    },

    organName: { 
      type:'string', 
    },

    receiptHeader: { 
      type:'string', 
    },

    receiptName: { 
      type:'string', 
    },

    parentName: { 
      type:'string', 
    },

    date: {
      type: 'ref',
      columnType: 'date'
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

