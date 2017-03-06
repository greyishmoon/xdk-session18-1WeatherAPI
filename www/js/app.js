var feedURL = "https://www.metaweather.com/api/location/2487956/";

$(document).on('pagecreate', '#feedPage', function(event) {
    
	//alert ('pagecreate');
	
	<!-- Use an HTML GET request to obtain data from a Yahoo Pipe
	<!-- The Yahoo pipe currently parses the BBC News RSS feed  -->
        
	var xmlhttp = new XMLHttpRequest();
    
	xmlhttp.open("GET", feedURL, true);
	xmlhttp.send();
		
	//alert (feedURL);
    
	<!-- parse the resulting JSON into Javascript Data Object -->
	<!-- you can use a live parser to inspect the contents of the JSON
	<!-- http://json.parser.online.fr/ -->
	//var weather= JSON.parse(xmlhttp.responseText);
	
	//alert(xmlhttp.responseText);
    
    // Callback function for async operation
    xmlhttp.onreadystatechange = function() {
        //alert(xmlhttp.readyState + " : " + xmlhttp.status);
        
        // if readyState = 4 (4: request finished and response is ready)
        if (xmlhttp.readyState === 4 
            // AND status = 200 (200: 'OK')
            && xmlhttp.status === 200) {
            processXML(xmlhttp);
        }    
    };
    
    //alert("RUNNING");
	
});

// Process xml object when downloaded
function processXML(xmlhttp) {
    //alert(xmlhttp.responseText);
    var weather= JSON.parse(xmlhttp.responseText);
    var test = new Date();
    var foo = Date.now();
    
    //alert(weather.title);
    // Print location
    $('#labelLocation').text("Location: " + weather.title);
    // Print date of first consolidated_weather element
    $('#labelDate').text("Date: " + weather.consolidated_weather[0].applicable_date);
    
    
    // Use Ractive binding to print weather list to listview
    // Define Ractive binding
	var ractive = new Ractive({
    	el: 'container', // where
        
    	template: '#myTemplate', // how
        
    	data: { weather : weather.consolidated_weather } 
        // what - specify the list of news articles 'items' using dot notation
	});
    
    $('#labelTest').text("Test Date: " + getDate());
       
}

// Get todays date
function getDate() {
    var today = new Date();   
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();    
    var formatedDate = yyyy + '/' + mm + '/' + dd;
    return formatedDate;
        //$('#caseDate').val(dd + '-' + mm + '-' + yyyy);    
}


