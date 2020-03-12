/**
 * TrampolineController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    create: async function (req, res) {

        if (req.method == 'GET')
            return res.view('competition/form/trampoline');

        await Trampoline.create(req.body.Trampoline);

        return res.ok("Successfully created!");
    
    },


};

