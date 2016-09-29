//Created by Jeremy Ginnard, 2016, ALL RIGHTS RESERVED

var courses = new Object;//Data for all courses
var choices = [];//Classes selected by user
var options = [];//All courses matching classes selected by user, First column contins {subject, course}, access with options[j][0].subject && options[j][0].course
var schedules = [];
var combinations;
var counters = [];
var matrix;
var allCombinations = [];
var events = [];
var limitTimes = false;
var fileName = "/Scheduler/Data/fall.txt";
var term = null;


//Selects the data file
var urlParam = function(name, w){
    w = w || window;
    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
        val = w.location.search.match(rx);
    return !val ? '':val[1];
}
if(urlParam('term') == "fall"){
  fileName = "/Scheduler/Data/fall.txt";}
if(urlParam('term') == "winter"){
  fileName = "/Scheduler/Data/winter.txt";}
if(urlParam('term') == "summer"){
  fileName = "/Scheduler/Data/summer.txt";}


//Handels error when trimming undefined value
function trimVal(value){
  if(value)
  return value.trim();
  else {
    return "";
  }
}

//Parses EMU class data
function getData(file) {
    $.get(file, function (data){
            var lines = data.split('\n');
            for(var i=0; i<lines.length; i++){
            var line = lines[i].split('\;');
            courses[line[7]] = {"crn": line[7], "subject": trimVal(line[4]), "course": line[5], "section": line[1], "honors": trimVal(line[8]), "title": line[9],
            "instructor": line[28], "remaining": line[14], "startDate": line[15], "endDate": line[16],"startTime": line[17],
            "endTime": line[18],"monday": line[19],"tuesday": line[20],"wednesday": line[21],"thursday": line[22],
            "friday": line[23], "saturday": line[24],"sunday": line[25], "location": (line[26] + " " + line[27])};
            }
            if(lines[0].substring(4,6) == 50){
              term = "summer" + (parseInt(lines[0].substring(0,4))-1);
            }
            else if(lines[0].substring(4,6) == 20){
              term = "winter" + (parseInt(lines[0].substring(0,4))-1);
            }
            else if(lines[0].substring(4,6) == 10){
              term = "fall" + (parseInt(lines[0].substring(0,4))-1);
            }
            makeAutoFillList()
      });
};

function makeAutoFillList(){
var subjectList = ["ACC", "ACLA", "ACOL", "ADBS", "AEPH", "AFC", "AFLT", "AGIN", "AGTR", "AHPR", "AHRN", "AMUS",
"ANTH", "AORG", "APED", "APNO", "ARTE", "ARTH", "ARTS", "ASTR", "ATHL", "ATM", "ATPT", "ATTR",
"ATUB", "AVCL", "AVLA", "AVLN", "AVOC", "AVT", "BIO", "BIOT", "BMMT", "CAE", "CASI", "CET",
"CHEM", "CHL", "CHNE", "CLRA", "CLSC", "CMT", "CNST", "COB", "COSC", "COT", "COUN", "CRM",
"CRTW", "CSIE", "CTAA", "CTAC", "CTAO", "CTAR", "CTAT", "CTWE", "CURR", "DANC", "DOTS", "DS",
"DTC", "ECA", "ECE", "ECON", "EDLD", "EDMT", "EDPS", "EDST", "EDT", "EDUC", "ELEC", "EM",
"ENGL", "ENVI", "ESLN", "ESSC", "ET", "FERM", "FIN", "FLAN", "FRNH", "GEOG", "GERN", "GHPR",
"GREK", "HIST", "HLAD", "HLED", "HPHP", "HRM", "HSEM", "IA", "IB", "IDE", "IHHS", "IMC", "IS",
"JPNE", "JRNL", "JSTS", "LATN", "LAW", "LEAD", "LEGL", "LING", "LITR", "LNGE", "MATH", "MET",
"MGMT", "MKTG", "MSL", "MUSC", "NSCI", "NURS", "OCTH", "OM", "ORPR", "PAS", "PC", "PDD", "PEGN",
"PHED", "PHIL", "PHY", "PLSC", "PMED", "PRCT", "PSCI", "PSY", "PURL", "QUAL", "RDNG", "RECR",
"REE", "SAG", "SCM", "SET", "SMGT", "SOCL", "SOFD", "SPAI", "SPCI", "SPEI", "SPGN", "SPLI", "SPMD",
"SPNH", "SPSI", "SSC", "STAT", "STS", "SWRK", "TEDU", "THRC", "TM", "TS", "TSLN", "UNIV", "UNIV",
"URED", "URP", "WGST", "WRTG"];
  $(function() {
  $("#subject1, #subject2, #subject3, #subject4, #subject5, #subject6, #subject7, #subject8, #reportSubject").autocomplete({
  source: subjectList
  });
  });
}

//Parses U of M class data
function getDataUM() {
    $.get('UMdata.txt', function (data){
            var lines = data.split('\n');
            for(i=0; i<lines.length; i++){
            var line = lines[i].split('\;')
            courses[line[0]] = {"crn": line[0], "subject": line[1], "course": line[2], "title": line[3],
            "instructor": line[4], "remaining": line[14], "startDate": line[5], "endDate": line[6],"startTime": line[7],
            "endTime": line[8],"monday": line[9],"tuesday": line[10],"wednesday": line[11],"thursday": line[12],
            "friday": line[13], "saturday": line[14],"sunday": line[15], "location": line[16]};
            }
          console.log("Data imported for UofM.");
        });
};

//Grabs the classes entered by the user
function GetChoices(){
if(document.getElementById("subject1").value != ""){
choices[0]={"subject": document.getElementById("subject1").value.toUpperCase(), "course": document.getElementById("course1").value, "honors": document.getElementById("honors1").checked};
}
if(document.getElementById("subject2").value != ""){
choices[1]={"subject": document.getElementById("subject2").value.toUpperCase(), "course": document.getElementById("course2").value, "honors": document.getElementById("honors2").checked};
}
if(document.getElementById("subject3").value != ""){
choices[2]={"subject": document.getElementById("subject3").value.toUpperCase(), "course": document.getElementById("course3").value, "honors": document.getElementById("honors3").checked};
}
if(document.getElementById("subject4").value != ""){
choices[3]={"subject": document.getElementById("subject4").value.toUpperCase(), "course": document.getElementById("course4").value, "honors": document.getElementById("honors4").checked};
}
if(document.getElementById("subject5").value != ""){
choices[4]={"subject": document.getElementById("subject5").value.toUpperCase(), "course": document.getElementById("course5").value, "honors": document.getElementById("honors5").checked};
}
if(document.getElementById("subject6").value != ""){
choices[5]={"subject": document.getElementById("subject6").value.toUpperCase(), "course": document.getElementById("course6").value, "honors": document.getElementById("honors6").checked};
}
if(document.getElementById("subject7").value != ""){
choices[6]={"subject": document.getElementById("subject7").value.toUpperCase(), "course": document.getElementById("course7").value, "honors": document.getElementById("honors7").checked};
}
if(document.getElementById("subject8").value != ""){
choices[7]={"subject": document.getElementById("subject8").value.toUpperCase(), "course": document.getElementById("course8").value, "honors": document.getElementById("honors8").checked};
}
validator(choices);
console.log("Choices collectd.");
};

//Validates user input and displays messages
function validator(arr){
  var error1 = false;
  var error2 = false;
  var choices = arr;
  var message1 = "Subjects must be 3-8 uppercase letters. Not valid subject(s): \n";
  var message2 = "Courses must be 2-3 digits. Not valid course(s): \n"
  var output = "";
  var subjectTest = /^[A-Z]{3,8}$/;
  var courseTest = /^([0-9]{2,3})([A-Z]{0,2})$/;
  for(var i = 0; i < choices.length; i++){
    if(!(subjectTest.test(choices[i].subject))){
      message1 += choices[i].subject + "\n";
      error1 = true;
    }
    if(!(courseTest.test(choices[i].course))){
      message2 += choices[i].course + "\n";
      error2 = true;
    }
  }
  if(error1){
    output += message1;
  }
  if(error2){
  	if(output > ""){
  		output += ". ";
  	}
    output += message2;
  }
  if(error1 || error2){
  	output = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">"
  +"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>"
  +"<strong>Warning! </strong>" + output + "</div>";
    $("#messageBox").append(output);
    throw new Error("Invalid Input.");
  }
  if(choices.length == 0){
    throw new Error("No Input.");
  }
};


//Creates an array with all possible options
function AllOptions(){
//Iterate through the chosen courses.
var course =[];
var message = "";
var full = false;
  for(var j = 0; j<choices.length; j++){
    course = [];
    number = 0; //Set index for number of matches.
		for(e in courses){ //Look through courses for matches.
		if(((courses[e].honors) == "H") && (choices[j].subject == courses[e].subject) && (choices[j].course == courses[e].course.substring(0,3)) && (courses[e].remaining <= 0)){
		full = true;
		}
        if((choices[j].honors ==  true) && ((courses[e].honors) == "H") && (choices[j].subject == courses[e].subject) && (choices[j].course == courses[e].course.substring(0,3)) && (courses[e].remaining > 0)){ //Check for match and open seats  && (courses[e].remaining > 0)
        course[number] = courses[e].crn; //Store match in course
        number++; //Increment match index for storing matches
        }
				else if((choices[j].honors == false) && (choices[j].subject == courses[e].subject) && (choices[j].course == courses[e].course.substring(0,3)) && (courses[e].remaining > 0)){ //Check for match and open seats  && (courses[e].remaining > 0)
        course[number] = courses[e].crn; //Store match in course
        number++; //Increment match index for storing matches
      	}

		}
		if(number == 0 && full){
      message = "<div class=\"alert alert-warning alert-dismissible\" role=\"alert\">"
  +"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>"
  +"<strong>Warning! </strong>" + "All sections for " + choices[j].subject + " " + choices[j].course + " are full.</div>";
      $("#messageBox").append(message);
    }
    else if(number == 0 && (choices[j].honors ==  true)){
      message = "<div class=\"alert alert-warning alert-dismissible\" role=\"alert\">"
  +"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>"
  +"<strong>Warning! </strong>" + "No honors class for " + choices[j].subject + " " + choices[j].course + "</div>";
      $("#messageBox").append(message);
    }
    else if(number == 0){
      message = "<div class=\"alert alert-warning alert-dismissible\" role=\"alert\">"
  +"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>"
  +"<strong>Warning! </strong>" + "No classes found for "+ choices[j].subject + " " + choices[j].course + "</div>";
      $("#messageBox").append(message);
      throw new Error("Class not found.");
    }
    options[j] = course;
	}
  //Sets var combinations to total number of possible combinations
  combinations = 1;
  for (var i = 0; i <options.length; i++){
    combinations = combinations * options[i].length;
  }
};

//Creates an empty array of given length
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;
    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
    return arr;
};

//Creates an array of indexes for creation of each possible combination
function setMatrix(){
	matrix = createArray(combinations, options.length);
	var index = 0;
	for(var a = 0; a < options[0].length; a++){
		if(choices.length==1){
		matrix[index][0] = a;
		index++;
		}
	for(var b = 0; b < (options[1] == null? 0:options[1].length); b++){
		if(choices.length==2){
		matrix[index][0] = a;
		matrix[index][1] = b;
		index++;
		}
	for(var c = 0; c < (options[2] == null? 0:options[2].length); c++){
		if(choices.length==3){
		matrix[index][0] = a;
		matrix[index][1] = b;
		matrix[index][2] = c;
		index++;
		}
	for(var d = 0; d < (options[3] == null? 0:options[3].length); d++){
		if(choices.length==4){
		matrix[index][0] = a;
		matrix[index][1] = b;
		matrix[index][2] = c;
		matrix[index][3] = d;
		index++;
		}
	for(var e = 0; e < (options[4] == null? 0:options[4].length); e++){
		if(choices.length==5){
		matrix[index][0] = a;
		matrix[index][1] = b;
		matrix[index][2] = c;
		matrix[index][3] = d;
		matrix[index][4] = e;
		index++;
		}
	for(var f = 0; f < (options[5] == null? 0:options[5].length); f++){
		if(choices.length==6){
		matrix[index][0] = a;
		matrix[index][1] = b;
		matrix[index][2] = c;
		matrix[index][3] = d;
		matrix[index][4] = e;
		matrix[index][5] = f;
		index++;
		}
	for(var g = 0; g < (options[6] == null? 0:options[6].length); g++){
		if(choices.length==7){
		matrix[index][0] = a;
		matrix[index][1] = b;
		matrix[index][2] = c;
		matrix[index][3] = d;
		matrix[index][4] = e;
		matrix[index][5] = f;
		matrix[index][6] = g;
		index++;
		}
	for(var h = 0; h < (options[7] == null? 0:options[7].length); h++){
		if(choices.length==8){
		matrix[index][0] = a;
		matrix[index][1] = b;
		matrix[index][2] = c;
		matrix[index][3] = d;
		matrix[index][4] = e;
		matrix[index][5] = f;
		matrix[index][6] = g;
		matrix[index][7] = h;
		index++;
		}
	}
	}
	}
	}
	}
	}
	}
	}
};

//Uses the matrix to create array of crn combinations
function getAllCombinations(){
  setMatrix();
  var schedule = [];
  allCombinations = [];
  for(var i = 0; i<matrix.length; i++){//Iterates through each combination
    schedule = [];
    for( var j = 0; j< options.length; j++){//Iterates through each class in each combination
      schedule[j] = options[j][matrix[i][j]];
    }
    allCombinations[i] = schedule;
  }
};

//Checks if two classes occur on the same day
function sameDay(a, b){
  if(courses[a].monday == courses[b].monday && courses[a].monday != " "){
    return true;
  }
  else if(courses[a].tuesday == courses[b].tuesday && courses[a].tuesday != " "){
    return true;
  }
  else if(courses[a].wednesday == courses[b].wednesday && courses[a].wednesday != " "){
    return true;
  }
  else if(courses[a].thursday == courses[b].thursday && courses[a].thursday != " "){
    return true;
  }
  else if(courses[a].friday == courses[b].friday && courses[a].friday != " "){
    return true;
  }
  else if(courses[a].saturday == courses[b].saturday && courses[a].saturday != " "){
    return true;
  }
  else if(courses[a].sunday == courses[b].sunday && courses[a].sunday != " "){
    return true;
  }
  else{
    return false;
  }
};

//Converts the time for comparison
function convertTime(oldTime){
  var newTime;
  newTime = oldTime.substring(0,2) + oldTime.substring(3,5);
  newTime = Number(newTime);
  if((oldTime.substring(6,8) == "pm") && (newTime < 1200)){
    newTime = newTime + 1200;
  }
  if(newTime < 1000){
    newTime = "0" + newTime;
  }
  return newTime;
};

//Coverts the date and time for use in the calendar
function convertDateTime(date, time){
  var result = "";
    day = date.getDate();
    if(day < 10){
      day = "0" + day;
    };
    month = date.getMonth() + 1;
    if(month < 10){
      month = "0" + month;
    };
    year = date.getFullYear();
    time = "" + convertTime(time);
  result = year+"-"+month+"-"+day+"T"+time.substring(0,2)+":"+time.substring(2)+":00";
  return result;
};

//Checks if two classes conflict
function conflictChecker(c, d){
var aStart = convertTime(courses[c].startTime);
var aEnd = convertTime(courses[c].endTime);
var bStart = convertTime(courses[d].startTime);
var bEnd = convertTime(courses[d].endTime);
  if( ((aStart >= bStart && aStart <= bEnd) ||
       (aEnd > bStart && aEnd <= bEnd) ||
       (bStart >= aStart && bStart < aEnd) ||
       (bEnd > aStart && bEnd <= aEnd)) && sameDay(c, d)){
    return true;
  }
  else if(limitTimes && checkRange(c) || limitTimes && checkRange(d)){
  	return true;
  }
  else{
    return false;
  }
};

//Checks combination for conflicting classes
function checker(arr){
  var check = true;
  for(var i = 0; i < arr.length; i++){
    if(i == 0){
      if(limitTimes && checkRange(arr[i])){
        check = false;
      }
    }
    for(var j = i + 1; j < arr.length; j++){
      if(conflictChecker(arr[i], arr[j])){
        check = false;
      }
      else if(i == 0 && limitTimes && checkRange(arr[j])){
        check = false;
      }
    }
  }
  return check;
};

//Creates array of schedules that don't conflict
function checkSchedules(){
  var index = 0;
  for(var k = 0; k <allCombinations.length; k++){
    if(checker(allCombinations[k])){
      schedules[index] = allCombinations[k];
      index++;
    }
  }
  if(schedules.length == 0){//No Matches Found.
    var message = "<div class=\"alert alert-warning alert-dismissible\" role=\"alert\">"
+"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>"
+"<strong>Warning! </strong>" + "All combinations conflict. Try removing classes. </div>";
    $("#messageBox").append(message);
  };
};

//Prints the table for the specified combination
function printTable(classes, option) {

var buttons = "<div class=\"btn-group\" role=\"group\" aria-label=\"...\">" +
    "<button type=\"button\" class=\"btn btn-default\" onclick=\"printCalendar(" + option + ")\">See Calendar</button>" +
    "<button type=\"button\" class=\"btn btn-default\" onclick=\"submitChoice(" + option + ")\">Submit</button></div>";


var result ="<h3>Option " + (option+1) +" </h3>"+ buttons +"<table class=\"scheduleTable\"><tr><th>CRN</th><th>Course</th><th>Title</th><th>Start Date</th><th>End Date</th><th>Days</th><th>Time</th><th>Location</th><th>Instructor</th>"
for(var i = 0; i < classes.length; i++){
  result+= "<tr><td>"+ courses[classes[i]].crn +"</td><td>" + courses[classes[i]].subject + " " + courses[classes[i]].course + "</td><td>" + courses[classes[i]].title
        + "</td><td>" + courses[classes[i]].startDate + "</td><td>" + courses[classes[i]].endDate + "</td><td>" + courses[classes[i]].monday + courses[classes[i]].tuesday
        + courses[classes[i]].wednesday + courses[classes[i]].thursday + courses[classes[i]].friday + courses[classes[i]].saturday + courses[classes[i]].sunday + "</td><td>"
        + courses[classes[i]].startTime + "-" + courses[classes[i]].endTime + "</td><td>" + courses[classes[i]].location + "</td><td>"
        + courses[classes[i]].instructor + "</td></tr>";
};
result += "</table><div id=\"calendar\"><div id=\"cal" + option +"\"></div></div>";
$("#resultsContainer").append(result);
};

//Saves selected option to database
function submitChoice(id){
  var content = "<form id=\"myForm\" action=\"submitClasses.php\" method=\"POST\">Student ID number:<br><input type=\"text\" name=\"studentId\"><br>Student Email Address:<br><input type=\"text\" name=\"email\"><br>";
  for(var i = 0; i < schedules[id].length; i++){
    content +=  "<input type=\"hidden\" value=\"" + schedules[id][i] + "\"name=\"class" + i +"\"/>";
    console.log(i);
  }
  content += "<input type=\"hidden\" value=\"" + term + "\"name=\"term\"/></form>";

  BootstrapDialog.show({
            title: 'Submit Selection',
            message: content,
            cssClass: 'login-dialog',
            buttons: [{
                label: 'Submit',
                cssClass: 'btn-primary',
                action: function(dialog){
                  document.getElementById("myForm").submit();
                    dialog.close();
                }
            },
            {
                label: 'Cancel',
                cssClass: 'btn-primary',
                action: function(dialog){
                    dialog.close();
                }
            }
          ]
        });
};

//Creates an array of events for the selected combination for use in the calendar
function makeEvents(crn){
  var index = 0;
  var courseTitle = courses[crn].subject + " " + courses[crn].course;
  var startTime = courses[crn].startTime;
  var endTime = courses[crn].endTime;
  var dateCounter = new Date(courses[crn].startDate);
  var endDate = new Date(courses[crn].endDate);
  var monday = courses[crn].monday == "M";
  var tuesday = courses[crn].tuesday == "T";
  var wednesday = courses[crn].wednesday == "W";
  var thursday = courses[crn].thursday == "R";
  var friday = courses[crn].friday == "F";
  var saturday = courses[crn].saturday == "S";
  var sunday = courses[crn].sunday == "U";
  if(classEvents.length > 0){
    index = classEvents.length;
  }

  while(dateCounter.getTime() <= endDate.getTime()){
    if(courses[crn].location == "ONLINE"){
      break;
    }
    else if(monday && dateCounter.getDay() == 1){
    classEvents[index] = {title: courseTitle, start: convertDateTime(dateCounter, startTime), end: convertDateTime(dateCounter, endTime)};
    index++;
    }
    else if(tuesday && dateCounter.getDay() == 2){
    classEvents[index] = {title: courseTitle, start: convertDateTime(dateCounter, startTime), end: convertDateTime(dateCounter, endTime)};
    index++;
    }
    else if(wednesday && dateCounter.getDay() == 3){
    classEvents[index] = {title: courseTitle, start: convertDateTime(dateCounter, startTime), end: convertDateTime(dateCounter, endTime)};
    index++;
    }
    else if(thursday && dateCounter.getDay() == 4){
    classEvents[index] = {title: courseTitle, start: convertDateTime(dateCounter, startTime), end: convertDateTime(dateCounter, endTime)};
    index++;
    }
    else if(friday && dateCounter.getDay() == 5){
    classEvents[index] = {title: courseTitle, start: convertDateTime(dateCounter, startTime), end: convertDateTime(dateCounter, endTime)};
    index++;
    }
    else if(saturday && dateCounter.getDay() == 6){
    classEvents[index] = {title: courseTitle, start: convertDateTime(dateCounter, startTime), end: convertDateTime(dateCounter, endTime)};
    index++;
    }
    else if(sunday && dateCounter.getDay() == 0){
    classEvents[index] = {title: courseTitle, start: convertDateTime(dateCounter, startTime), end: convertDateTime(dateCounter, endTime)};
    index++;
    }
    dateCounter.setDate(dateCounter.getDate() + 1);
  }
};

//Prints the selected calendar to the screen
function printCalendar(calId){
  classEvents = [];
  var classes = schedules[calId];
  var courseStart = courses[classes[0]].startDate;
  courseStart = courseStart.substring(6)+"-"+courseStart.substring(0,2)+"-"+(parseInt(courseStart.substring(3,5))+7);
  console.log(courseStart);
  var id = "#cal" + calId;
  for(var j = 0; j< classes.length; j++){
    makeEvents(classes[j]);
  };

$(id).fullCalendar({
  defaultView: 'agendaWeek',
  aspectRatio: 1,
  height: 600,
  header: {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
  },
  defaultDate: courseStart,
  editable: false,
  eventLimit: true, // allow "more" link when too many events
  events: classEvents
});
};

// function reset(){
//   choices = [];//Classes selected by user
//   options = [];//All courses matching classes selected by user, First column contins {subject, course}, access with options[j][0].subject && options[j][0].course
//   schedules = [];
//   combinations = [];
//   counters = [];
//   matrix = [];
//   allCombinations = [];
//   events = [];
//   bodyContents = "<body><h3>EMU Scheduler: Created by Jeremy Ginnard</h3><table><tr><th>Subject</th><th>Course Number</th></tr><tr>" +
//   			"<td><input type=\"text\" id=\"subject1\" data-toggle=\"tooltip\"  title=\"4 uppercase letters\"></td><td><input type=\"text\" id=\"course1\" data-toggle=\"tooltip\"  title=\"2-3 digits\"></td></tr><tr>"+
//   			"<td><input type=\"text\" id=\"subject2\" data-toggle=\"tooltip\"  title=\"4 uppercase letters\"></td><td><input type=\"text\" id=\"course2\" data-toggle=\"tooltip\"  title=\"2-3 digits\"></td></tr><tr>" +
//   			"<td><input type=\"text\" id=\"subject3\" data-toggle=\"tooltip\"  title=\"4 uppercase letters\"></td><td><input type=\"text\" id=\"course3\" data-toggle=\"tooltip\"  title=\"2-3 digits\"></td></tr><tr>" +
//   			"<td><input type=\"text\" id=\"subject4\" data-toggle=\"tooltip\"  title=\"4 uppercase letters\"></td><td><input type=\"text\" id=\"course4\" data-toggle=\"tooltip\"  title=\"2-3 digits\"></td></tr><tr>" +
//   			"<td><input type=\"text\" id=\"subject5\" data-toggle=\"tooltip\"  title=\"4 uppercase letters\"></td><td><input type=\"text\" id=\"course5\" data-toggle=\"tooltip\"  title=\"2-3 digits\"></td></tr><tr>" +
//   			"<td><input type=\"text\" id=\"subject6\" data-toggle=\"tooltip\"  title=\"4 uppercase letters\"></td><td><input type=\"text\" id=\"course6\" data-toggle=\"tooltip\"  title=\"2-3 digits\"></td></tr><tr>" +
//   			"<td><input type=\"text\" id=\"subject7\" data-toggle=\"tooltip\"  title=\"4 uppercase letters\"></td><td><input type=\"text\" id=\"course7\" data-toggle=\"tooltip\"  title=\"2-3 digits\"></td></tr><tr>" +
//   			"<td><input type=\"text\" id=\"subject8\" data-toggle=\"tooltip\"  title=\"4 uppercase letters\"></td><td><input type=\"text\" id=\"course8\" data-toggle=\"tooltip\"  title=\"2-3 digits\"></td></tr><tr>" +
//   			"<td><button type onclick=\"MakeSchedule()\">Submit</td><td><button onclick=\"reset()\">Reset</button></td></tr></table></body>";
//   $('body').replaceWith(bodyContents);
// };

//Runs all the code
function MakeSchedule(){
  //resets the arrays for repeated Runs
  choices = [];//Classes selected by user
  options = [];//All courses matching classes selected by user, First column contins {subject, course}, access with options[j][0].subject && options[j][0].course
  schedules = [];
  combinations;
  counters = [];
  matrix = [];
  allCombinations = [];
  events = [];
  $( "#resultsContainer" ).empty();
  $("#messageBox").empty();

	GetChoices();
  AllOptions();
  getAllCombinations();
  getSliders();
  checkSchedules();
  for(var n = 0; n<schedules.length; n++){
    printTable(schedules[n], n);
  }
};

//SLIDERS

//Turns on the sliders so conflicting combinations are removed
function turnOnSliders(){
  limitTimes = true;
};
var monday = {min: "00:00", max: "24:00"};
var tuesday = {min: "00:00", max: "24:00"};
var wednesday = {min: "00:00", max: "24:00"};
var thursday = {min: "00:00", max: "24:00"};
var friday = {min: "00:00", max: "24:00"};
var saturday = {min: "00:00", max: "24:00"};
var sunday = {min: "00:00", max: "24:00"};

//Grabs the values from the sliders
function getSliders(){
  if($("#mondayCheck").prop('checked')){
  monday = $("#rangeMonday").rangeSlider("values");
  }
  if($("#tuesdayCheck").prop('checked')){
  tuesday = $("#rangeTuesday").rangeSlider("values");
  }
  if($("#wednesdayCheck").prop('checked')){
  wednesday = $("#rangeWednesday").rangeSlider("values");
  }
  if($("#thursdayCheck").prop('checked')){
  thursday = $("#rangeThursday").rangeSlider("values");
  }
  if($("#fridayCheck").prop('checked')){
  friday = $("#rangeFriday").rangeSlider("values");
  }
  if($("#saturdayCheck").prop('checked')){
  saturday = $("#rangeSaturday").rangeSlider("values");
  }
  if($("#sundayCheck").prop('checked')){
  sunday = $("#rangeSunday").rangeSlider("values");
  }
};

//Checks that a class is in the user defined range
function checkRange(class1){
if(courses[class1].monday == "M"){
  if(!$("#mondayCheck").prop('checked')){
  return true;
  }
  else if(convertTime(courses[class1].startTime) < (Math.floor(monday.min / 6)*100 + Math.floor(monday.min % 6)*10)){
    return true;
  }
  else if(convertTime(courses[class1].endTime) > (Math.floor(monday.max / 6)*100 + Math.floor(monday.max % 6)*10)){
    return true;
  }
}

if(courses[class1].tuesday == "T"){
  if(!$("#tuesdayCheck").prop('checked')){
  return true;
  }
  else if(convertTime(courses[class1].startTime) < (Math.floor(tuesday.min / 6)*100 + Math.floor(tuesday.min % 6)*10)){
    return true;
  }
  else if(convertTime(courses[class1].endTime) > (Math.floor(tuesday.max / 6)*100 + Math.floor(tuesday.max % 6)*10)){
    return true;
  }
}

if(courses[class1].wednesday == "W"){
  if(!$("#wednesdayCheck").prop('checked')){
  return true;
  }
  else if(convertTime(courses[class1].startTime) < (Math.floor(wednesday.min / 6)*100 + Math.floor(wednesday.min % 6)*10)){
    return true;
  }
  else if(convertTime(courses[class1].endTime) > (Math.floor(wednesday.max / 6)*100 + Math.floor(wednesday.max % 6)*10)){
    return true;
  }
}

if(courses[class1].thursday == "R"){
  if(!$("#thursdayCheck").prop('checked')){
  return true;
  }
  else if(convertTime(courses[class1].startTime) < (Math.floor(thursday.min / 6)*100 + Math.floor(thursday.min % 6)*10)){
    return true;
  }
  else if(convertTime(courses[class1].endTime) > (Math.floor(thursday.max / 6)*100 + Math.floor(thursday.max % 6)*10)){
    return true;
  }
}

if(courses[class1].friday == "F"){
  if(!$("#fridayCheck").prop('checked')){
  return true;
  }
  else if(convertTime(courses[class1].startTime) < (Math.floor(friday.min / 6)*100 + Math.floor(friday.min % 6)*10)){
    return true;
  }
if(convertTime(courses[class1].endTime) > (Math.floor(friday.max / 6)*100 + Math.floor(friday.max % 6)*10)){
    return true;
  }
}

if(courses[class1].saturday == "S"){
  if(!$("#saturdayCheck").prop('checked')){
  return true;
  }
  else if(convertTime(courses[class1].startTime) < (Math.floor(saturday.min / 6)*100 + Math.floor(saturday.min % 6)*10)){
    return true;
  }
  else if(convertTime(courses[class1].endTime) > (Math.floor(saturday.max / 6)*100 + Math.floor(saturday.max % 6)*10)){
    return true;
  }
}

if(courses[class1].sunday == "U"){
  if(!$("#sundayCheck").prop('checked')){
  return true;
  }
  else if(convertTime(courses[class1].startTime) < (Math.floor(sunday.min / 6)*100 + Math.floor(sunday.min % 6)*10)){
    return true;
  }
  else if(convertTime(courses[class1].endTime) > (Math.floor(sunday.max / 6)*100 + Math.floor(sunday.max % 6)*10)){
    return true;
  }
}
else {
  return false;
}
};

function toggle_visibility(className) {
    $('.' + className).css('visibility', 'visible');
}



// });
