// requires API_ENDPOINT_URL_STR in window scope

var
	$donut_info = $("[data-role='donut_info']");

function g_ajaxer(url_str, ok_cb, fail_cb){
	$.ajax({
		url: url_str,
		type: "GET",
		crossDomain: true,
		contentType: "application/json",
		dataType: "json",
		success: ok_cb,
		error: fail_cb,
		timeout: 3000
	});
}
function handleFailure(fe){
	console.log("FAIL");
	if(fe.status === 405){
		$filter_type.text("No API to call");
	}else{
		$filter_type.text("Failed due to CORS");
	}
}
function handleSuccess(data_arr){
	showDonuts(data_arr);
}
function postRequest(){
	showSearching();
	g_ajaxer(window.API_ENDPOINT_URL_STR, handleSuccess, handleFailure);
}
function showDonuts(data_arr){
	var 
		html_str = '',
		donutname_str = "",
		donutimage_str = "",
		donutdescription_str = "",
		urlIndex_int = 0;

	for(var i_int = 0; i_int < data_arr.length; i_int += 1){
		donutname_str = data_arr[i_int].name.S || data_arr[i_int].name;
		donutimage_str = data_arr[i_int].image.S || data_arr[i_int].image;
		donutdescription_str = data_arr[i_int].description.S || data_arr[i_int].description;
		donutdescription_str = donutdescription_str.replace("DonutTable", "");
		urlIndex_int = donutimage_str.lastIndexOf('/')
		donutimage_str = './images' + donutimage_str.substring(urlIndex_int)

		if (i_int % 3 == 0) {
			html_str += '<div class="row justify-content-center">'
		}
		html_str += '<div class="col-md-4">';
		html_str += 	'<div class="card w-25">';
		html_str += 	'<img src="' + donutimage_str + '" class="card-img-top img-responsive" alt="..." style="object-fit: contain;">';
		html_str += 		'<div class="card-body text-center">'; 
		html_str += 		'<h5 class="card-title"> ' + donutname_str + '</h5>';
		html_str += 	'<p class="card-text">' + donutdescription_str + '</p>';
		html_str += '<a href="#" class="btn btn-primary" style="background-color: rgb(86, 205, 226); border:none; color: white; font-size: 15px; text-shadow: -1px 1px 0 #000, .5px .5px 0 #000, .5px -.5px 0 #000; -.5px -.5px 0 #000;"> Order Now </a>';
		html_str += '<br> <br> </div> </div> </div>';
		if (i_int % 3 == 2) {
			html_str += '</div>';
		}
	}
	$donut_info
		.attr("data-showing", "showing")
		.append(html_str);
	if(data_arr.length === 0){
		$donut_info.html('<h6>No donuts found!</h6>');
	}

}
function showSearching(){
	$donut_info.attr("data-showing", "not_showing").html("");
}

//onm load
postRequest();