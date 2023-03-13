
function MakeTimeline(game) {
    this.timeline = [
        game.task.block,
    ]
};

var exp = new MakeTimeline(spinnerTask);


// initiate timeline
jsPsych.run(exp.timeline);
