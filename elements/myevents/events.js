/*

 @package Module eventviewer for Joomla! 3.x
  @version $Id: mod_eventviewer 1.0.0 2015-08-01 23:26:33Z $
  @author Kian William Nowrouzian
  @copyright (C) 2015- Kian William Nowrouzian
  @license GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html 
     This file is part of eventviewer.
    eventviewer is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    eventviewer is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with eventviewer.  If not, see <http://www.gnu.org/licenses/>.
*/
var counter = 1;


var eventname="Event Name";
var eventmonth="Month";
var eventday="Day";
var eventhour="Hour";
var eventdesc="Event Description...";

function jInsertEditorText(text, editor) {
	var newEl = new Element('span').set('html', text);
	//var valeur = newEl.getChildren()[0].getAttribute('src');
	//$(editor).value = valeur;
	//addthumbnail(valeur, editor);
}



function addeventmy(eventname, eventmonth, eventday, eventhour, eventdesc)
{

	var event = new Element('li', {
		'class': 'myevent',
		'id': 'myevent' + counter
	});
	
	event.set('html', '<div class="myeventhandle"><div class="myeventnumber">Event Number: ' + counter + ', Use numbers for month(1-12) & day(1-31)</div></div>'+
	'<div class="del"><input name="myeventdelete' + counter + '" class="myeventdelete" type="button" value="' + Joomla.JText._('MOD_EVENTVIEWER_REMOVE', 'RemoveEvent') + '" onclick="javascript:removeevent(this.getParent().getParent());" />'+
	'<div class="eventrow"><div class="eventname">Event Name:<input name="myeventname'+counter+'" id="myeventname'+counter+'" class="myeventname" type="text" value="'+eventname+'"  /></div>'+
	'Month:<input name="myeventmonth' + counter + '" id="myeventmonth' + counter + '" class="myeventmonth hasTip" title="Event::This is the month that the event occured.use 1-12" type="text" value="'+eventmonth+'" " />'+
    '<br />Day:<input name="myeventday' + counter + '" id="myeventday' + counter + '" class="myeventday" title="Event::This is the day that the event occured." type="text" value="'+eventday+'" " />'+
	'<br />Hour:<input name="myeventhour' + counter + '" id="myeventhour' + counter + '" class="myeventhour" title="Event::This is the hour that the event occured." type="text" value="'+eventhour+'" " />'+
	'</div>'+
    '<div class="explanation">Description of Event:<textarea name="myeventdesc' + counter + '"  class="myeventdesc">'+eventdesc+'</textarea></div>');
	
	document.id('myeventslist').adopt(event);
	storeevent();
	makesortables();
	SqueezeBox.initialize({});
	/*SqueezeBox.assign(slide.getElement('a.modal'), {
		parse: 'rel'
	});*/	

	counter++;
}

function storeevent()
{

	var i = 0;
	var events = new Array();
	document.id('myeventslist').getElements('.myevent').each(function(el) {
		event = new Object();
		event['eventname'] = el.getElement('.myeventname').value;		
		event['eventmonth'] = el.getElement('.myeventmonth').value;
		event['eventday'] = el.getElement('.myeventday').value;		
		event['eventhour']=el.getElement('.myeventhour').value;
		event['eventdesc']=el.getElement('.myeventdesc').value;		
	
		events[i] = event;
		i++;
	});

	events = JSON.encode(events);	
	events = events.replace(/"/g, "|qq|");
	document.id('myevents').value = events;
	

}

function makesortables() {
	var sb = new Sortables('myeventslist', {
		/* set options */
		clone: true,
		revert: true,
		handle: '.myeventhandle',
		/* initialization stuff here */
		initialize: function() {

		},
		/* once an item is selected */
		onStart: function(el, clone) {
			el.setStyle('background', '#add8e6');
			clone.setStyle('background', '#ffffff');
			clone.setStyle('z-index', '1000');
		},
		/* when a drag is complete */
		onComplete: function(el) {
			el.setStyle('background', '#fff');
			//storesetwarning();
		},
		onSort: function(el, clone) {
			clone.setStyle('z-index', '1000');
		}
	});
}
/*
function addthumbnail(imgsrc, editor) {
	var slideimg = $(editor).getParent().getElement('img');
	var testurl = 'http';
	if (imgsrc.toLowerCase().indexOf(testurl.toLowerCase()) != -1) {
		slideimg.src = imgsrc;
	} else {
		slideimg.src = JURI + imgsrc;
	}

	slideimg.setProperty('width', '64px');
	slideimg.setProperty('height', '64px');
}*/

function removeevent(event) {
	if (confirm(Joomla.JText._('MOD_EVENTSHOWCK_REMOVE', 'Remove this event') + ' ?')) {
		event.destroy();
		counter--;
		storeevent();
	}
}

function callevents() {
	
	var events = JSON.decode(document.id('myevents').value.replace(/\|qq\|/g, "\""));
	if (events) {
		events.each(function(event) {
			addeventmy(event['eventname'],
					event['eventmonth'],
					event['eventday'],
					event['eventhour'],
					event['eventdesc']
					);
		});
		
	}
}


window.addEvent('domready', function() {
	callevents();

	var script = document.createElement("script");
	script.setAttribute('type', 'text/javascript');
	script.text = "Joomla.submitbutton = function(task){"
			+ "storeevent();"
			+ "if (task == 'module.cancel' || document.formvalidator.isValid(document.id('module-form'))) {	Joomla.submitform(task, document.getElementById('module-form'));"
			+ "if (self != top) {"
			+ "window.top.setTimeout('window.parent.SqueezeBox.close()', 1000);"
			+ "}"
			+ "} else {"
			+ "alert('Formulaire invalide');"
			+ "}"
			+"}";
	document.body.appendChild(script);
});

