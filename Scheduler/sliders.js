function limitRange(){
  turnOnSliders();

  var contents = "<table><tr><td>&nbsp;<span style=\"padding-left:7em;\"></span></td><td><span style=\"padding-left:20em;\"></span></td></tr>"+
      "<tr><td><input type=\"checkbox\" id=\"mondayCheck\" value=\"true\" checked> Monday</td><td><div id=\"rangeMonday\"></div></td></tr><tr><td>&nbsp;</td></tr>" +
      "<tr><td><input type=\"checkbox\" id=\"tuesdayCheck\" value=\"true\" checked> Tuesday</td><td><div id=\"rangeTuesday\"></div></td></tr><tr><td>&nbsp;</td></tr>" +
      "<tr><td><input type=\"checkbox\" id=\"wednesdayCheck\" value=\"true\" checked> Wednesday</td><td><div id=\"rangeWednesday\"></div></td></tr><tr><td>&nbsp;</td></tr>" +
      "<tr><td><input type=\"checkbox\" id=\"thursdayCheck\" value=\"true\" checked> Thursday</td><td><div id=\"rangeThursday\"></div></tr><tr><td>&nbsp;</td></tr>" +
      "<tr><td><input type=\"checkbox\" id=\"fridayCheck\" value=\"true\" checked> Friday</td><td><div id=\"rangeFriday\"></div></td></tr><tr><td>&nbsp;</td></tr>" +
      "<tr><td><input type=\"checkbox\" id=\"saturdayCheck\" value=\"true\"> Saturday</td><td><div id=\"rangeSaturday\"></div></td></tr><tr><td>&nbsp;</td></tr>" +
      "<tr><td><input type=\"checkbox\" id=\"sundayCheck\" value=\"true\"> Sunday</td><td><div id=\"rangeSunday\"></div></td></tr><tr><td>&nbsp;</td></tr></table>";

  $("#rangeSelector").append(contents);

$("#rangeMonday").rangeSlider({
bounds:{
  min:0,
  max:144
},
defaultValues:{

  min: 36,
  max: 126
},
formatter:function(val){
        var hours = Math.floor(val / 6),
          minutes = Math.floor(val % 6)*10;
        return (hours > 9 ? hours.toString() : "0" + hours.toString()) + ":" +
        (minutes > 9 ? minutes.toString() : "0" + minutes.toString());
}
});

$("#rangeTuesday").rangeSlider({
bounds:{
  min:0,
  max:144
},
defaultValues:{

  min: 36,
  max: 126
},
formatter:function(val){
        var hours = Math.floor(val / 6),
          minutes = Math.floor(val % 6)*10;
        return (hours > 9 ? hours.toString() : "0" + hours.toString()) + ":" +
        (minutes > 9 ? minutes.toString() : "0" + minutes.toString());
}
});


$("#rangeWednesday").rangeSlider({
bounds:{
  min:0,
  max:144
},
defaultValues:{

  min: 36,
  max: 126
},
formatter:function(val){
        var hours = Math.floor(val / 6),
          minutes = Math.floor(val % 6)*10;
        return (hours > 9 ? hours.toString() : "0" + hours.toString()) + ":" +
        (minutes > 9 ? minutes.toString() : "0" + minutes.toString());
}
});

$("#rangeThursday").rangeSlider(
  {
bounds:{
  min:0,
  max:144
},
defaultValues:{

  min: 36,
  max: 126
},
formatter:function(val){
        var hours = Math.floor(val / 6),
          minutes = Math.floor(val % 6)*10;
        return (hours > 9 ? hours.toString() : "0" + hours.toString()) + ":" +
        (minutes > 9 ? minutes.toString() : "0" + minutes.toString());
}
});

$("#rangeFriday").rangeSlider({
bounds:{
  min:0,
  max:144
},
defaultValues:{

  min: 36,
  max: 126
},
formatter:function(val){
        var hours = Math.floor(val / 6),
          minutes = Math.floor(val % 6)*10;
        return (hours > 9 ? hours.toString() : "0" + hours.toString()) + ":" +
        (minutes > 9 ? minutes.toString() : "0" + minutes.toString());
}
});

$("#rangeSaturday").rangeSlider({
bounds:{
  min:0,
  max:144
},
defaultValues:{

  min: 36,
  max: 126
},
formatter:function(val){
        var hours = Math.floor(val / 6),
          minutes = Math.floor(val % 6)*10;
        return (hours > 9 ? hours.toString() : "0" + hours.toString()) + ":" +
        (minutes > 9 ? minutes.toString() : "0" + minutes.toString());
      }
});

$("#rangeSunday").rangeSlider({
bounds:{
  min:0,
  max:144
},
defaultValues:{

  min: 36,
  max: 126
},
formatter:function(val){
        var hours = Math.floor(val / 6),
          minutes = Math.floor(val % 6)*10;
        return (hours > 9 ? hours.toString() : "0" + hours.toString()) + ":" +
        (minutes > 9 ? minutes.toString() : "0" + minutes.toString());
      }
});

};
