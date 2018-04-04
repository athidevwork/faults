 // The root URL for the RESTful services
var rootURL = "http://54.215.186.133:20001/fault";
var faultRootUrl = "";

function sendFaultRequest(request) {
	var restUrl = rootURL + '/save';
	
	$.ajax({
	    url: restUrl,
	    data: request,
	    type: 'POST',
	    method: request.method,
	    dataType: request.dataType ||"json",
	    crossDomain: true,
	    //dataType: 'jsonp',
	    contentType: request.contentType || "application/json; charset=utf-8",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Requested-With',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,HEAD,DELETE,OPTIONS'
        },
        enctype: 'multipart/form-data',
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
	    success: function(response) {
	    	console.log(response);
	    	//document.getElementById('jqxTextAreaResponse').innerHTML = response;
	    	$('#jqxTextAreaResponse').jqxTextArea('val', JSON.stringify(response));
	    },
	    beforeSend: function(xhr) {
	        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	    },
	    error: function(xhr) {
	    	console.log ("Failure occurred during processing request : " + xhr);
	    }
	});	
}

function getIssuePolicy(env, policy) {
	var restUrl = rootURL + '/policy?env=' + env + '&policy=' + policy;
	console.log(restUrl);
	
	$.ajax({
	    url: restUrl,
	    dataType: "json",
	    success: function(response) {
	    	console.log(response);
	    	document.getElementById('policydata').innerHTML = response;
	    },
	    error: function(xhr) {
	    	console.log ("Failure occurred during table generation : " + data);
	    }
	});	
}

function getLink(env, product) {
	var restUrl = rootURL + '/link';
	
	$.ajax({
	    url: restUrl,
	    data: {"env": env,"product":product},
	    success: function(response) {
	    	console.log(response);
	    	document.getElementById(product).onclick = function() {
	    		document.getElementById(product).href=response; 
	    		return false;
	    	};
	    },
	    error: function(xhr) {
	    	console.log ("Failure occurred during processing link : " + data);
	    }
	});	
}

function getConfig(env, outputFormat) {
	var restUrl = '';
		
	if (outputFormat.trim() === "HTML")
		restUrl = rootURL + '/htmlconfig/' + env;
	else
		restUrl	= rootURL + '/config/' + env;
	
	console.log ("var env = " + env);
	console.log ("var format = " + outputFormat);	
	console.log ("var rest url : " + restUrl)
	$.ajax({
        type: 'GET',
        url: restUrl,
        dataType: outputFormat,
        success: function(data){
            console.log("rest response: " + data);
            //console.log("format =" + outputFormat);
            //$('#restresponse').show();
            $('#restresponse').empty();
            
            /*var response=jQuery.parseJSON(data);
            
            if (typeof response =='object') {
            	console.log ("is json");
            	$('#restresponse').append(
            		    $('<pre>').text(
            		        JSON.stringify(data, null, '  ')
            		    )
            	 );
            } else {
                var xml, xmlfound=false;
                var xmlDoc = $.parseXML( data );
                $data = $( xmlDoc );
                $xml.find("oasisConfigType").each(function(index,elem){
                    console.log ("is xml");
                	$('#restresponse').append($xml);
                });
            	
            	$('#restresponse').append(data);
            }*/
	        $('#restresponse').append(data);
            //$('#restresponse').append(JSON.stringify(data));
            //renderDetails(data);
        },
        fail: function(data){ console.log ("Failure occurred : " + data);}
    });
}

