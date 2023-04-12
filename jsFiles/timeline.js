const subject_id = jsPsych.randomization.randomID(10);
const filename = `${subject_id}.csv`;

jsPsych.data.addProperties({
    subject: subject_id
})

const save_data = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: "WL2m4UnXKCIJ",
    filename: filename,
    data_string: ()=>jsPsych.data.get().csv()
};

const exp = [
        spinnerTask.task.block,
        save_data,
    ];

// initiate timeline
jsPsych.run(exp);
