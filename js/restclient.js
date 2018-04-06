 // The root URL for the RESTful services
var rootURL = "http://54.215.186.133:20001/fault";

function loginUser (user) {
	var restUrl = rootURL + '/creuser/validate';

	$.ajax({
	    url: restUrl,
	    data: request,
	    type: 'POST',
	    /*method: request.method,
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
        contentType: false,  // tell jQuery not to set contentType*/
	    success: function(response) {
	    	console.log(response);
	    	//document.getElementById('jqxTextAreaResponse').innerHTML = response;
	    	//$('#jqxTextAreaResponse').jqxTextArea('val', JSON.stringify(response));
	    },
	    beforeSend: function(xhr) {
	        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	    },
	    error: function(xhr) {
	    	console.log ("Failure occurred during processing request : " + xhr);
	    }
	});		
}

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

function getFaults() {
	var restUrl = rootURL + '/faults';
	console.log('Url : ' + restUrl);
	
	$.ajax({
	    url: restUrl,
	    dataType: "json",
	    //crossDomain: true,
	    //dataType: 'jsonp',
	    success: function(response) {
	    	//console.log(response);
	    	//document.getElementById('policydata').innerHTML = response;	    	
	    	$('#jqxTextAreaGetFaults').jqxTextArea('val', JSON.stringify(response));
	    },
	    error: function(xhr) {
	    	console.log ("Failure occurred during table generation : " + xhr);
	    }
	});	
}

function setupGetAllFaultsGrid() {
	var restUrl = rootURL + '/faults';
	console.log('Url : ' + restUrl);
	
    //get data from web service and add to grid
  	//Initializing the source property
    source = {
        datatype: 'json',
        datafields: [
            { name: 'id', type: 'number' },
            { name: 'startDate', type: 'string' },
            { name: 'endDate', type: 'string' },
            { name: 'category', type: 'string' },
            { name: 'subCategory', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'fSignature', type: 'string' },
            { name: 'aibcStatus', type: 'string' }	            
            ]
    };
    //Getting the source data with ajax GET request
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: false,
        url: restUrl,
        cache: false,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
        	source.localdata = data;
        },
        error: function (err) {
        	alert('Error');
        }
    });
    
    //Preparing the data for use
    var dataAdapter = new $.jqx.dataAdapter(source);

    // initialize jqxGrid
    $('#jqxFaultsgrid').jqxGrid(
    {
        width: 1250,
        source: dataAdapter,
        editable: true,
        enabletooltips: true,
        selectionmode: 'multiplecellsadvanced',
        columns: [
            { text: 'ID', columntype: 'textbox', datafield: 'id', width: 30 },
            { text: 'Created Date', datafield: 'startDate', columntype: 'textbox', width: 170 },
            { text: 'Processed Date', columntype: 'dropdownlist', datafield: 'endDate', width: 170 },
            { text: 'Fault Category', columntype: 'dropdownlist', datafield: 'category', width: 160 },
            { text: 'Fault Sub Category', columntype: 'dropdownlist', datafield: 'subCategory', width: 160 },
            { text: 'Fault Description', columntype: 'dropdownlist', datafield: 'description', width: 200 },
            { text: 'Fault Signature', columntype: 'dropdownlist', datafield: 'fSignature', width: 200 },
            { text: 'Fault Status', columntype: 'dropdownlist', datafield: 'aibcStatus', width: 100 }
            /*{ text: 'Available', datafield: 'available', columntype: 'checkbox', width: 67 },
            { text: 'Ship Date', datafield: 'date', columntype: 'datetimeinput', width: 110, align: 'right', cellsalign: 'right', cellsformat: 'd',
	            validation: function (cell, value) {
		            if (value == '')
		            return true;
		
		            var year = value.getFullYear();
		            if (year >= 2015) {
		            	return { result: false, message: 'Ship Date should be before 1/1/2015' };
		            }
		            return true;
	            }
            },
            { text: 'Quantity', datafield: 'quantity', width: 70, align: 'right', cellsalign: 'right', columntype: 'numberinput',
	            validation: function (cell, value) {
	            if (value < 0 || value > 150) {
	            return { result: false, message: 'Quantity should be in the 0-150 interval' };
	            }
	            return true;
	            },
	            createeditor: function (row, cellvalue, editor) {
	            editor.jqxNumberInput({ decimalDigits: 0, digits: 3 });
	            }
            },
            { text: 'Price', datafield: 'price', align: 'right', cellsalign: 'right', cellsformat: 'c2', columntype: 'numberinput',
	            validation: function (cell, value) {
	            if (value < 0 || value > 15) {
	            return { result: false, message: 'Price should be in the 0-15 interval' };
	            }
	            return true;
	            },
	            createeditor: function (row, cellvalue, editor) {
	            editor.jqxNumberInput({ digits: 3 });
	            }		
            }*/
        ]
    });

    // events
    /*$('#jqxgrid').on('cellbeginedit', function (event) {
        var args = event.args;
        $('#cellbegineditevent').text('Event Type: cellbeginedit, Column: ' + args.datafield + ', Row: ' + (1 + args.rowindex) + ', Value: ' + args.value);
    });

    $('#jqxgrid').on('cellendedit', function (event) {
        var args = event.args;
        $('#cellendeditevent').text('Event Type: cellendedit, Column: ' + args.datafield + ', Row: ' + (1 + args.rowindex) + ', Value: ' + args.value);
    });*/        	
}

function setupPendingFaultsGrid() {
	var restUrl = rootURL + '/pending/faults';
	console.log('Url : ' + restUrl);
	
    //get data from web service and add to grid
  	//Initializing the source property
    source = {
        datatype: 'json',
        datafields: [
            { name: 'id', type: 'number' },
            { name: 'startDate', type: 'string' },
            { name: 'endDate', type: 'string' },
            { name: 'category', type: 'string' },
            { name: 'subCategory', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'fSignature', type: 'string' },
            { name: 'aibcStatus', type: 'string' },
            { name: 'process', type: 'bool' }
            ]
    };
    //Getting the source data with ajax GET request
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: false,
        url: restUrl,
        cache: false,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
        	source.localdata = data;
        },
        error: function (err) {
        	alert('Error');
        }
    });
    
    //Preparing the data for use
    var dataAdapter = new $.jqx.dataAdapter(source);

    // initialize jqxGrid
    $('#jqxPendingFaultsgrid').jqxGrid(
    {
        width: 1250,
        source: dataAdapter,
        editable: true,
        enabletooltips: true,
        selectionmode: 'multiplecellsadvanced',
        columns: [
            { text: 'ID', columntype: 'textbox', datafield: 'id', width: 30 },
            { text: 'Created Date', datafield: 'startDate', columntype: 'textbox', width: 170 },
            { text: 'Processed Date', columntype: 'dropdownlist', datafield: 'endDate', width: 170 },
            { text: 'Fault Category', columntype: 'dropdownlist', datafield: 'category', width: 160 },
            { text: 'Fault Sub Category', columntype: 'dropdownlist', datafield: 'subCategory', width: 160 },
            { text: 'Fault Description', columntype: 'dropdownlist', datafield: 'description', width: 200 },
            { text: 'Fault Signature', columntype: 'dropdownlist', datafield: 'fSignature', width: 200 },
            { text: 'Fault Status', columntype: 'dropdownlist', datafield: 'aibcStatus', width: 100 },
            { text: 'Process', datafield: 'process', columntype: 'checkbox', width: 67 },
        ]
    });        	
}


function setupExampleGrid() {
	// prepare the data
	var data = new Array();
	var firstNames =
	[
	    "Andrew", "Nancy", "Shelley", "Regina", "Yoshi", "Antoni", "Mayumi", "Ian", "Peter", "Lars", "Petra", "Martin", "Sven", "Elio", "Beate", "Cheryl", "Michael", "Guylene"
	];
	var lastNames =
	[
	    "Fuller", "Davolio", "Burke", "Murphy", "Nagase", "Saavedra", "Ohno", "Devling", "Wilson", "Peterson", "Winkler", "Bein", "Petersen", "Rossi", "Vileid", "Saylor", "Bjorn", "Nodier"
	];
	var productNames =
	[
	    "Black Tea", "Green Tea", "Caffe Espresso", "Doubleshot Espresso", "Caffe Latte", "White Chocolate Mocha", "Cramel Latte", "Caffe Americano", "Cappuccino", "Espresso Truffle", "Espresso con Panna", "Peppermint Mocha Twist"
	];
	var priceValues =
	[
	    "2.25", "1.5", "3.0", "3.3", "4.5", "3.6", "3.8", "2.5", "5.0", "1.75", "3.25", "4.0"
	];
	for (var i = 0; i < 1000; i++) {
	    var row = {};
	    var productindex = Math.floor(Math.random() * productNames.length);
	    var price = parseFloat(priceValues[productindex]);
	    var quantity = 1 + Math.round(Math.random() * 10);
	    row["firstname"] = firstNames[Math.floor(Math.random() * firstNames.length)];
	    row["lastname"] = lastNames[Math.floor(Math.random() * lastNames.length)];
	    row["productname"] = productNames[productindex];
	    row["price"] = price;
	    row["quantity"] = quantity;
	    row["total"] = price * quantity;
		row["discontinued"] = false;
	    data[i] = row;
	}
	var source =
	{
	    localdata: data,
	    datatype: "array"
	};
	var dataAdapter = new $.jqx.dataAdapter(source, {
		downloadComplete: function (data, status, xhr) { },
	    loadComplete: function (data) { },
	    loadError: function (xhr, status, error) { }    
	});
	$("#jqxgrid").jqxGrid(
	{
		//width: getWidth('jqxgrid'),
		width: "100%",
		source: dataAdapter,                
		pageable: true,
		autoheight: true,
		sortable: true,
		altrows: true,
		enabletooltips: true,
		editable: true,
		selectionmode: 'multiplecellsadvanced',
	    columns: [
	        { text: 'First Name', datafield: 'firstname', width: 100 },
	        { text: 'Last Name', datafield: 'lastname', width: 100 },
	        { text: 'Product', datafield: 'productname', width: 180 },
	        { text: 'Quantity', datafield: 'quantity', width: 80, cellsalign: 'right' },
	        { text: 'Unit Price', datafield: 'price', width: 90, cellsalign: 'right', cellsformat: 'c2' },
	        { text: 'Total', datafield: 'total', width: 100, cellsalign: 'right', cellsformat: 'c2' },
			{ text: 'Discontinued', columntype: 'checkbox', datafield: 'Discontinued' }
	    ]
	});              
}

/*function getIssuePolicy(env, policy) {
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
            
            var response=jQuery.parseJSON(data);
            
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
            }
	        $('#restresponse').append(data);
            //$('#restresponse').append(JSON.stringify(data));
            //renderDetails(data);
        },
        fail: function(data){ console.log ("Failure occurred : " + data);}
    });
}*/

