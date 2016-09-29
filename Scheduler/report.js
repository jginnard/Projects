function getReport(term, year, subject, course) {
  console.log(term +" "+ year +" "+ subject +" "+ course);
  if (subject == "") {
          document.getElementById("resultsTable").innerHTML = "";
          return;
      } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("resultsTable").innerHTML = xmlhttp.responseText;
            }
        };
        xmlhttp.open("GET","reports.php?term="+term+"&year="+year+"&subject="+subject+"&course="+course,true);
        xmlhttp.send();
      }
}
