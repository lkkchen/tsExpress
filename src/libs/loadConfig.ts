/**
 *****************************************************
 *******---*************---***----*******---***----***
 ******---*************---**---*********---**---******
 *****---*************------***********------*********
 ****---*************---**---*********---**---********
 ***----------******---****----******---****----******
 *****************************************************
 * Created By: lkkchen
 * Date Time: 2020/4/30 14:36
 */


module.exports = function () {
    global.log = function () {
        console.log(...arguments);
    };

    global.config = require(`../config.json`);

    global.log(global.config);
};
