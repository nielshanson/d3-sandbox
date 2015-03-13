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
		return "rgb(255, 247, 251)"; // 0
	} else if (d > 0 && d<= 8){
		return "rgb(236, 226, 240)"; // 1
	} else if (d > 8 && d<= 16) {
		return "rgb(208, 209, 230)"; // 2
	} else if (d > 16 && d<= 24) {
		return "rgb(166, 189, 219)"; // 3
	} else if (d > 24 && d<= 32){
		return "rgb(103, 169, 207)"; // 4
	} else if (d > 32 && d<= 40){
		return "rgb(54, 144, 192)"; // 5
	} else if (d > 48 && d<= 56){
		return "rgb(2, 129, 138)"; // 6
	} else if (d > 56 && d<= 62) {
		return "rgb(1, 108, 89)"; // 7
	} else if (d > 62){
		return "rgb(1, 70, 54)"; // 7+
	} else {
		return "pink"; // number not in range
	}
}