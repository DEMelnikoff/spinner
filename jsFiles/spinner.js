

var spinnerTask = (function() {


    var p = {};


   /*
    *
    *   INSTRUCTIONS
    *
    */


    p.intro = {}

    
   /*
    *
    *   TASK
    *
    */

    p.task = {}


    const stim = [

        /*  1 1 1 1 1
            3 4 5 6 7     ev = 5; v = 2.5
            7 8 9 10 11   ev = 9; v = 2.5
            1 3 5 7 9     ev = 5; v = 10
            5 7 9 11 13   ev = 9; v = 10
        */
            {sectors: [ {color:"#fe6a00", label:"3"}, {color:"#803400", label:"4"}, {color:"#ffd800", label:"5"}, {color:"#806b00", label:"6"}, {color:"#00fe21", label:"7"} ], ev: 5, var: 2.5, arrangement: 11111},
            {sectors: [ {color:"#00fe21", label:"7"}, {color:"#007f0e", label:"8"}, {color:"#0094fe", label:"9"}, {color:"#00497e", label:"10"}, {color:"#0026ff", label:"11"} ], ev: 9, var: 2.5, arrangement: 11111},
            {sectors: [ {color:"#fe0000", label:"1"}, {color:"#fe6a00", label:"3"}, {color:"#ffd800", label:"5"}, {color:"#00fe21", label:"7"}, {color:"#0094fe", label:"9"} ], ev: 5, var: 10, arrangement: 11111},
            {sectors: [ {color:"#ffd800", label:"5"}, {color:"#00fe21", label:"7"}, {color:"#0094fe", label:"9"}, {color:"#0026ff", label:"11"}, {color:"#b100fe", label:"13"} ], ev: 9, var: 10, arrangement: 11111},

        /*  2 1 1 1
            3 3 5 6 8     ev = 5; v = 4.5
            7 7 9 10 12   ev = 9; v = 4.5
            2 2 5 7 9     ev = 5; v = 9.5
            6 6 9 11 13   ev = 9; v = 9.5
        */
            {sectors: [ {color:"#fe6a00", label:"3"}, {color:"#fe6a00", label:"3"}, {color:"#ffd800", label:"5"}, {color:"#806b00", label:"6"}, {color:"#007f0e", label:"8"} ], ev: 5, var: 4.5, arrangement: 2111},
            {sectors: [ {color:"#00fe21", label:"7"}, {color:"#00fe21", label:"7"}, {color:"#0094fe", label:"9"}, {color:"#00497e", label:"10"}, {color:"#001280", label:"12"} ], ev: 9, var: 4.5, arrangement: 2111},
            {sectors: [ {color:"#800001", label:"2"}, {color:"#800001", label:"2"}, {color:"#ffd800", label:"5"}, {color:"#00fe21", label:"7"}, {color:"#0094fe", label:"9"} ], ev: 5, var: 9.5, arrangement: 2111},
            {sectors: [ {color:"#806b00", label:"6"}, {color:"#806b00", label:"6"}, {color:"#0094fe", label:"9"}, {color:"#0026ff", label:"11"}, {color:"#b100fe", label:"13"} ], ev: 9, var: 9.5, arrangement: 2111},

        /*  2 2 1
            4 4 5 5 7    ev = 5; v = 1.5
            8 8 9 9 11   ev = 9; v = 1.5
            2 2 5 5 11   ev = 5; v = 13.5
            6 6 9 9 15   ev = 9; v = 13.5
        */
            {sectors: [ {color:"#803400", label:"4"}, {color:"#803400", label:"4"}, {color:"#ffd800", label:"5"}, {color:"#ffd800", label:"5"}, {color:"#00fe21", label:"7"} ], ev: 5, var: 1.5, arrangement: 221},
            {sectors: [ {color:"#007f0e", label:"8"}, {color:"#007f0e", label:"8"}, {color:"#0094fe", label:"9"}, {color:"#0094fe", label:"9"}, {color:"#0026ff", label:"11"} ], ev: 9, var: 1.5, arrangement: 221},
            {sectors: [ {color:"#800001", label:"2"}, {color:"#800001", label:"2"}, {color:"#ffd800", label:"5"}, {color:"#ffd800", label:"5"}, {color:"#0026ff", label:"11"} ], ev: 5, var: 13.5, arrangement: 221},
            {sectors: [ {color:"#806b00", label:"6"}, {color:"#806b00", label:"6"}, {color:"#0094fe", label:"9"}, {color:"#0094fe", label:"9"}, {color:"#590080", label:"15"} ], ev: 9, var: 13.5, arrangement: 221},

        /*  3 1 1
            2 5 6 6 6     ev = 5; v = 3
            6 9 10 10 10  ev = 9; v = 3
            3 3 3 5 11    ev = 5; v = 12
            7 7 7 9 15    ev = 9; v = 12
        */
            {sectors: [ {color:"#800001", label:"2"}, {color:"#ffd800", label:"5"}, {color:"#806b00", label:"6"}, {color:"#806b00", label:"6"}, {color:"#806b00", label:"6"} ], ev: 5, var: 3, arrangement: 311},
            {sectors: [ {color:"#806b00", label:"6"}, {color:"#0094fe", label:"9"}, {color:"#00497e", label:"10"}, {color:"#00497e", label:"10"}, {color:"#00497e", label:"10"} ], ev: 9, var: 3, arrangement: 311},
            {sectors: [ {color:"#fe6a00", label:"3"}, {color:"#fe6a00", label:"3"}, {color:"#fe6a00", label:"3"}, {color:"#ffd800", label:"5"}, {color:"#0026ff", label:"11"} ], ev: 5, var: 12, arrangement: 311},
            {sectors: [ {color:"#00fe21", label:"7"}, {color:"#00fe21", label:"7"}, {color:"#00fe21", label:"7"}, {color:"#0094fe", label:"9"}, {color:"#590080", label:"15"} ], ev: 9, var: 12, arrangement: 311},

        /*  3 2
            4 4 4 7 7      ev = 5.2; v = 2.7
            8 8 8 11 11    ev = 9.2; v = 2.7
            3 3 3 8 8      ev = 5; v = 7.5
            7 7 7 12 12    ev = 9; v = 7.5
        */
            {sectors: [ {color:"#803400", label:"4"}, {color:"#803400", label:"4"}, {color:"#803400", label:"4"}, {color:"#00fe21", label:"7"}, {color:"#00fe21", label:"7"} ], ev: 5.2, var: 2.7, arrangement: 32},
            {sectors: [ {color:"#007f0e", label:"8"}, {color:"#007f0e", label:"8"}, {color:"#007f0e", label:"8"}, {color:"#0026ff", label:"11"}, {color:"#0026ff", label:"11"} ], ev: 9.2, var: 2.7, arrangement: 32},
            {sectors: [ {color:"#fe6a00", label:"3"}, {color:"#fe6a00", label:"3"}, {color:"#fe6a00", label:"3"}, {color:"#007f0e", label:"8"}, {color:"#007f0e", label:"8"} ], ev: 5, var: 7.5, arrangement: 32},
            {sectors: [ {color:"#00fe21", label:"7"}, {color:"#00fe21", label:"7"}, {color:"#00fe21", label:"7"}, {color:"#001280", label:"12"}, {color:"#001280", label:"12"} ], ev: 9, var: 7.5, arrangement: 32},

        /*  4 1
            4 4 4 4 9   ev = 5; v = 5
            8 8 8 8 13  ev = 9; v = 5
            3 3 3 3 13  ev = 5; v = 20
            11 11 11 11 1 ev = 9; v = 20
        */
            {sectors: [ {color:"#803400", label:"4"}, {color:"#803400", label:"4"}, {color:"#803400", label:"4"}, {color:"#803400", label:"4"}, {color:"#0094fe", label:"9"} ], ev: 5, var: 5, arrangement: 41},
            {sectors: [ {color:"#007f0e", label:"8"}, {color:"#007f0e", label:"8"}, {color:"#007f0e", label:"8"}, {color:"#007f0e", label:"8"}, {color:"#b100fe", label:"13"} ], ev: 9, var: 5, arrangement: 41},
            {sectors: [ {color:"#fe6a00", label:"3"}, {color:"#fe6a00", label:"3"}, {color:"#fe6a00", label:"3"}, {color:"#fe6a00", label:"3"}, {color:"#b100fe", label:"13"} ], ev: 5, var: 20, arrangement: 41},
            {sectors: [ {color:"#0026ff", label:"11"}, {color:"#0026ff", label:"11"}, {color:"#0026ff", label:"11"}, {color:"#0026ff", label:"11"}, {color:"#fe0000", label:"1"} ], ev: 9, var: 20, arrangement: 41},

        /*  5
            5 5 5 5 5   ev = 5; v = 0
            9 9 9 9 9   ev = 9; v = 0
        */
            {sectors: [ {color:"#ffd800", label:"5"}, {color:"#ffd800", label:"5"}, {color:"#ffd800", label:"5"}, {color:"#ffd800", label:"5"}, {color:"#ffd800", label:"5"} ], ev: 5, var: 0, arrangement: 5},
            {sectors: [ {color:"#0094fe", label:"9"}, {color:"#0094fe", label:"9"}, {color:"#0094fe", label:"9"}, {color:"#0094fe", label:"9"}, {color:"#0094fe", label:"9"} ], ev: 9, var: 0, arrangement: 5},
        ];


    const spin = {
        type: jsPsychCanvasButtonResponse,
        stimulus: function(c, spinnerData) {
            createSpinner(c, spinnerData, jsPsych.timelineVariable('sectors'));
        },
        canvas_size: [500, 500],
        data: {ev: jsPsych.timelineVariable('ev'), var: jsPsych.timelineVariable('var'), arrangement: jsPsych.timelineVariable('arrangement')},
    };

    const feedback = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function() {
            var score = jsPsych.data.getLastTrialData().values()[0].outcome;
            var html = `<div style="font-size:60px">+${score}</div>`
            return html;
        },
        choices: "NO_KEYS",
        trial_duration: 2000,
    };     

    const trial = {
        timeline: [spin, feedback],
        repetitions: 5,
    };

    p.task.block = {
        timeline: [trial],
        repetitions: 5,
        timeline_variables: stim,
        randomize_order: true,
    };

   /*
    *
    *   QUESTIONS
    *
    */

    p.Qs = {};


    return p;

}());
