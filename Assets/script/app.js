
// Work Day Scheduler by Tanvir Hossain

//Variables for each hour and storing notes

var workDay = [
 
    { 
        slot: '0',
        hour: '09',
        time: '09',
        am_pm:'am',
        notes: ''
    },{ 
        slot: '1',
        hour: '10',
        time: '10',
        am_pm:'am',
        notes: ''
    },{ 
        slot: '2',
        hour: '11',
        time: '11',
        am_pm:'am',
        notes: ''
    },{ 
        slot: '3',
        hour: '12',
        time: '12',
        am_pm:'pm',
        notes: ''
    },{ 
        slot: '4',
        hour: '01',
        time: '13',
        am_pm:'pm',
        notes: ''
    },{ 
        slot: '5',
        hour: '02',
        time: '14',
        am_pm:'pm',
        notes: ''
    },{ 
        slot: '6',
        hour: '03',
        time: '15',
        am_pm:'pm',
        notes: ''
    },{ 
        slot: '7',
        hour: '04',
        time: '16',
        am_pm:'pm',
        notes: ''
    },{ 
        slot: '8',
        hour: '05',
        time: '17',
        am_pm:'pm',
        notes: ''
    },
]

// Function for day and date for the header

function getDayDateHeader () {

 var currentHeaderDayDate = moment().format('dddd, MMMM Do YYYY');
 $ ('#currentDay').text(currentHeaderDayDate)

};

// Day and date header deploys here

getDayDateHeader ();



//Saving data to local storage

function saveReminders (){

    localStorage.setItem("workDay", JSON.stringify(workDay));

}

// View Data saved in local storage in the slots

function viewReminders (){

    workDay.forEach(function (currentHour){

        $(`#${currentHour.slot}`).val(currentHour.notes);

    })
}

//If any data exists then to set it to view

function init() {

    var storedDay = JSON.parse(localStorage.getItem("workDay"));

    if (storedDay) {
        workDay = storedDay;
    }

    saveReminders();
    viewReminders();
}



// Creating the timeblock for each workDay variables inside the container.

workDay.forEach(function(thisHour){

// creates timeblocks row

    var hourRow = $("<form>").attr({

        "class": "row"
    });

    $(".container").append(hourRow);

    // creates time field

    var hourField = $("<div>")

        .text(`${thisHour.hour} ${thisHour.am_pm}`)

        .attr({

            "class": "d-flex justify-content-center align-items-center col-md-2 hour time-block "
            
    });

    // creates scheduler data

    var hourPlan = $("<div>")

        .attr({

            "class": "col-md-9 description p-0"

        });

    var planData = $("<textarea>");

    hourPlan.append(planData);

    planData.attr("slot", thisHour.slot);

    if (thisHour.time < moment().format("HH")) {

        planData.attr ({

            "class":"past" 

        })
    } else if (thisHour.time === moment().format("HH")) {

        planData.attr({

            "class":"present"

        })
    } else if (thisHour.time > moment().format("HH")) {

        planData.attr({

            "class":"future"
        })
    }

    // creates save button

    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

// loads any existing local storage data after components created

init();


// saves data to be used in localStorage

$(".saveBtn").on("click", function(event) {

    event.preventDefault();

    var saveIndex = $(this).siblings(".description").children(".future").attr("slot");

    workDay[saveIndex].notes = $(this).siblings(".description").children(".future").val();

    

    saveReminders();
    viewReminders();
})


