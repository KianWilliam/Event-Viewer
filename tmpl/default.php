<?php 

/**
 * @package Module EventViewer for Joomla! 3.x
 * @version $Id: mod_eventviewer 1.0.0 2015-08-01 23:26:33Z $
 * @author Kian William Nowrouzian
 * @copyright (C) 2015- Kian William Nowrouzian
 * @license GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 
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
 
**/


?>
<?php
defined('_JEXEC') or die(); 
$document = &JFactory::getDocument();
$document->addStyleSheet(JURI::base()."modules/mod_eventviewer/css/mystyles.css");
if($params->get("loadJquery")==0)
{
    $document->addScript(JURI::base()."modules/mod_eventviewer/js/jquery.js");
}
$noconflict = "var eve = jQuery.noConflict()";
$document->addScriptDeclaration($noconflict);
$document->addScript(JURI::base()."modules/mod_eventviewer/js/event.js");
$mycontent = "

	eve(document).ready(function(){
		eve('#containerg').calendarDay({color:'".$color."', fontcolor:'".$fontcolor."', fontsize:'".$fontsize."', fontfamily:'".$fontfamily."',
			fontstyle:'".$fontstyle."', fontweight:'".$fontweight."'});
		var objDay = eve.fn.calendarDay.defaults.getDay();
			var valDate = objDay.today();
			valDate[0]++;
			
			eve('#myDate').val(valDate[0]+'/'+valDate[1]+'/'+valDate[2]);
			
			eve('#calen').bind('click', function(){
			
				eve(this).next().show();
			
			});
		
		
		
		
	});
	var path = '".JURI::base()."';
	eve.fn.calendarDay.defaults = {};
	var n = ".json_encode($name).";
	var m = ".json_encode($month).";
	var d = ".json_encode($day).";
	var h = ".json_encode($hour).";
	var des = ".json_encode($desc).";
	eve.fn.calendarDay.defaults.names = [];
	eve.fn.calendarDay.defaults.months = [];
	eve.fn.calendarDay.defaults.days=[];
	eve.fn.calendarDay.defaults.hours=[];
	eve.fn.calendarDay.defaults.descs=[];
	eve.fn.calendarDay.defaults.path = path;
	
	for(var i=0; i<n.length; i++)
	{
		eve.fn.calendarDay.defaults.names[i] = n[i];
		eve.fn.calendarDay.defaults.months[i] = m[i];
		eve.fn.calendarDay.defaults.days[i] = d[i];
		eve.fn.calendarDay.defaults.hours[i] = h[i];
		eve.fn.calendarDay.defaults.descs[i] = des[i];
	}
	
	eve.fn.calendarDay.defaults.color = '#eb0ace';
	eve.fn.calendarDay.defaults.fontcolor='#fff';
	eve.fn.calendarDay.defaults.fontsize='11px';
	eve.fn.calendarDay.defaults.fontfamily='arial';
	eve.fn.calendarDay.defaults.fontweight='bold';
	eve.fn.calendarDay.defaults.fontstyle='normal';
	eve.fn.calendarDay.defaults.getDay = function() {return newday;}

";
$document->addScriptDeclaration($mycontent); 
?>
<form name="myForm" class="myform">
		<input type="text" name="myDate" value="" id="myDate"><img name="calen" id="calen" src="<?php echo JURI::base()."modules/mod_eventviewer/c1.png"?>" style="cursor:hand;cursor:pointer"><div id="containerg"></div>
</form>
