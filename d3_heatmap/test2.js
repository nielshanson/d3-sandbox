function showBlast(target, sample)
{
var xmlhttp;
if (sample =="" || target == "") {
  document.getElementById("txtHint").innerHTML="";
  return;
}
if (window.XMLHttpRequest) {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
}
else {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange=function() {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
		TINY.box.show({iframe:'out.html',width:750,height:550});
    }
  }
var input = "test_update.php?sample=" + sample + "&target=" + target;
xmlhttp.open("GET",input,false);
xmlhttp.send();
}

function colorPicker(d) {
	if( d <= 0 ){
		return "rgb(255, 250, 250)"; // 0
	} else if (d > 0 && d<= 25){
		return "rgb(241, 238, 246)"; // 1
	} else if (d > 25 && d<= 50) {
		return "rgb(189, 201, 225)"; // 2
	} else if (d > 50 && d<= 75) {
		return "rgb(116, 169, 207)"; // 3
	} else if (d > 75 && d<= 100){
		return "rgb(5, 112, 176)"; // 4
	} else if (d > 100) {
	    return "rgb(4, 90, 141)";
	}else {
		return "pink"; // number not in range
	}
}