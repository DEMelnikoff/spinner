

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

    const wedges = {
        one: {color:"#fe0000", label:"1"},
        two: {color:"#800001", label:"2"},
        three: {color:"#fe6a00", label:"3"},
        four: {color:"#803400", label:"4"},
        five: {color:"#ffd800", label:"5"},
        six: {color:"#806b00", label:"6"},
        seven: {color:"#00fe21", label:"7"},
        eight: {color:"#007f0e", label:"8"},
        nine: {color:"#0094fe", label:"9"},
        ten: {color:"#00497e", label:"10"},
        eleven: {color:"#0026ff", label:"11"},
        twelve: {color:"#001280", label:"12"},
        thirteen: {color:"#b100fe", label:"13"},
    };

    const stim = [

        /*  1 1 1 1
            3 4 5 6    ev = 4.5; v = 1.67
            7 8 9 10   ev = 8.5; v = 1.67
            1 3 6 8    ev = 4.5; v = 9.67
            5 7 10 12  ev = 8.5; v = 9.67
        */
            {sectors: [ wedges.three, wedges.four, wedges.five, wedges.six ], ev: 4.5, var: 1.67, arrangement: 1111},
            {sectors: [ wedges.seven, wedges.eight, wedges.nine, wedges.ten ], ev: 8.5, var: 1.67, arrangement: 1111},
            {sectors: [ wedges.one, wedges.three, wedges.six, wedges.eight ], ev: 4.5, var: 9.67, arrangement: 1111},
            {sectors: [ wedges.five, wedges.seven, wedges.ten, wedges.twelve ], ev: 8.5, var: 9.67, arrangement: 1111},

        /*  2 1 1 
            3 3 5 7     ev = 4.5; v = 2.25
            7 7 9 11    ev = 8.5; v = 2.25
            2 2 6 8     ev = 4.5; v = 9
            6 6 10 12    ev = 8.5; v = 9
        */
            {sectors: [ wedges.three, wedges.three, wedges.five, wedges.seven ], ev: 4.5, var: 3.67, arrangement: 211},
            {sectors: [ wedges.seven, wedges.seven, wedges.nine, wedges.eleven ], ev: 8.5, var: 3.67, arrangement: 211},
            {sectors: [ wedges.two, wedges.two, wedges.six, wedges.eight ], ev: 4.5, var: 9, arrangement: 211},
            {sectors: [ wedges.six, wedges.six, wedges.ten, wedges.twelve ], ev: 8.5, var: 9, arrangement: 211},

        /*  2 2
            3 3 6 6    ev = 4.5; v = 3
            7 7 10 10  ev = 8.5; v = 3
            2 2 7 7    ev = 4.5; v = 8.33
            6 6 11 11  ev = 4.5; v = 8.33
        */
            {sectors: [ wedges.three, wedges.three, wedges.six, wedges.six ], ev: 4.5, var: 3, arrangement: 22},
            {sectors: [ wedges.seven, wedges.seven, wedges.ten, wedges.ten ], ev: 8.5, var: 3, arrangement: 22},
            {sectors: [ wedges.two, wedges.two, wedges.seven, wedges.seven ], ev: 4.5, var: 8.33, arrangement: 22},
            {sectors: [ wedges.six, wedges.six, wedges.eleven, wedges.eleven ], ev: 8.5, var: 8.33, arrangement: 22},

        /*  3 1
            4 4 4 6    ev = 4.5; v = 1
            8 8 8 10   ev = 8.5; v = 1
            3 3 3 9    ev = 4.5; v = 9
            7 7 7 13   ev = 8.5; v = 9
        */
            {sectors: [ wedges.four, wedges.four, wedges.four, wedges.six ], ev: 4.5, var: 1, arrangement: 31},
            {sectors: [ wedges.eight, wedges.eight, wedges.eight, wedges.ten ], ev: 8.5, var: 1, arrangement: 31},
            {sectors: [ wedges.three, wedges.three, wedges.three, wedges.nine ], ev: 4.5, var: 9, arrangement: 31},
            {sectors: [ wedges.seven, wedges.seven, wedges.seven, wedges.thirteen ], ev: 8.5, var: 9, arrangement: 31},

        /*  4
            5 5 5 5 5   ev = 5; v = 0
            9 9 9 9 9   ev = 9; v = 0
        */
            {sectors: [ wedges.four, wedges.four, wedges.four, wedges.four ], ev: 4, var: 0, arrangement: 4},
            {sectors: [ wedges.nine, wedges.nine, wedges.nine, wedges.nine ], ev: 9, var: 0, arrangement: 4},
        ];

    console.log(stim[0])

    let scoreTracker = 0;


    const spin = {
        type: jsPsychCanvasButtonResponse,
        stimulus: function(c, spinnerData) {
            createSpinner(c, spinnerData, scoreTracker, jsPsych.timelineVariable('sectors'));
        },
        canvas_size: [500, 500],
        score: function() {
            return scoreTracker
        },
        data: {ev: jsPsych.timelineVariable('ev'), var: jsPsych.timelineVariable('var'), arrangement: jsPsych.timelineVariable('arrangement')},
        on_finish: function(data) {
            scoreTracker = data.score
        }
    };

    const flowMeasure = {
        type: jsPsychSurveyLikert,
        questions: [
            {prompt: `During the last round of Spin the Wheel,<br>to what extent did you feel immersed and engaged in what you were doing?`,
            name: `flow`,
            labels: ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8<br>Extremely']},
        ],
        randomize_question_order: false,
        scale_width: 500,
        data: {ev: jsPsych.timelineVariable('ev'), var: jsPsych.timelineVariable('var'), arrangement: jsPsych.timelineVariable('arrangement')},
        on_finish: function(data) {
            let scoreArray = jsPsych.data.get().select('score').values;
            let outcomesArray = jsPsych.data.get().select('outcomes').values;
            data.score = scoreArray[scoreArray.length - 1];
            data.outcomes = outcomesArray[outcomesArray.length - 1];
            data.question_type = Object.keys(data.response)[0];
            data.response = Object.values(data.response)[0];
        }
    };

    const happinessMeasure = {
        type: jsPsychSurveyLikert,
        questions: [
            {prompt: `How happy are you right now?`,
            name: `happiness`,
            labels: ['0<br>Very unhappy', '1', '2', '3', '4', '5', '6', '7', '8<br>Very happy']},
        ],
        randomize_question_order: false,
        scale_width: 500,
        data: {ev: jsPsych.timelineVariable('ev'), var: jsPsych.timelineVariable('var'), arrangement: jsPsych.timelineVariable('arrangement')},
        on_finish: function(data) {
            let scoreArray = jsPsych.data.get().select('score');
            let outcomesArray = jsPsych.data.get().select('outcomes');
            data.score = scoreArray[scoreArray.length - 2];
            data.outcomes = outcomesArray[outcomesArray.length - 2];
            data.question_type = Object.keys(data.response)[0];
            data.response = Object.values(data.response)[0];
        }
    };

    p.task.block = {
        timeline: [spin, flowMeasure, happinessMeasure],
        repetitions: 1,
        timeline_variables: [0,1].map(x => stim[x]),
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
