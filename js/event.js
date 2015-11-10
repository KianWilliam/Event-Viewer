/*
* @package Module event for Joomla! 3.x
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
*/
var newday;
(function($){

$.fn.calendarDay = function(options)
{
	
	
		var $container, $options;
		$container = $(this);
		$options = $.extend($.fn.calendarDay.defaults, options);
		 newday = new Days($container, $options);
		
		newday.readCurrentDate();
		
		 var arr = newday.today() ;
		
		$container.find('#month').bind('change', function(){
			var d = $container.find('#day').val();
			var m = $container.find('#month').val();			
			newday.fillCalendar(m, d, arr[2]);		
	});
	
	$container.find('#day').bind('change', function(){
			var d = $container.find('#day').val();
			var m = $container.find('#month').val();
			newday.fillCalendar(m, d,arr[2]);		
	});
	  
	
	
}


function Days($container, $options)
{
	var myobj=this;
	var currentd = myobj.today();
	var wc = screen.width * (0.29); 
	
	$container.css({position:'relative', marginLeft:'3px' ,width:wc+'px', backgroundColor:$options.color});
  	
	
   $('<label>Month:</label>').css({'float':'left', marginLeft:'3px', marginTop:'3px', color:'#fff', fontWeight:'bold', fontStyle:'italic'}).appendTo($container);
  
	$('<select name="month" id="month"></select>').css({'float':'left', marginLeft:'3px', marginTop:'3px', padding:0, width:'50px'}).appendTo($container);
	
	for(var i=-1; i<12; i++)
	{
		if(i==-1)
		{
			$('<option value="">Months</option>').appendTo('#month');
		}
		else
		{
		  $('<option value="'+i+'">'+(i+1)+'</option>').appendTo('#month');
		 
		}
		
	}
	 $('#month').val(currentd[0]);
	 $('<label>Day:</label>').css({'float':'left', marginLeft:'3px', marginTop:'3px', color:'#fff', fontWeight:'bold', fontStyle:'italic'}).appendTo($container);
	
	var ds = myobj.getDaysOfMonth(currentd[0], currentd[2]);
	
	$('<select  id="day"></select>').css({'float':'left', marginLeft:'3px', marginTop:'3px', padding:0, width:'50px'}).appendTo($container);
	for(var j=0; j<=31; j++)
	{
		if(j==0)
		{
			$('<option value="">Days</option>').appendTo('#day');
		}
		else
		{
		  $('<option value="'+j+'">'+j+'</option>').appendTo('#day');
		 
		}
	}
	
				
	 $('#day').val(currentd[1]);
	 
	var wt = parseInt($container.width())-4;
	$('<div id="tCont"></div>').css({'float':'left', marginTop:'7px', width:wt+'px', padding:'2px'}).appendTo($container);
	$('<table id="t" border="1" bordercolor="#fff" bgcolor="" cellspacing=1 cellpadding=1 width="100%"></table>').css({color:'#fff'}).appendTo('#tCont');
	var weekdays=["", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	for(i=0; i<=6; i++)
	{
		$('<tr id="tr'+i+'" bordercolor="#fff"></tr>').css({}).appendTo('#t');
		if(i==0)
		{
		 for(l=1; l<=7; l++)
		 {
			$('<td align="center" valign="middle"></td>').css({width:'35px'}).html(weekdays[l]).appendTo('#tr'+i+'');
		 }
		}
		else
		{
			for(l=1; l<=7; l++)
			{
				$('<td id="td'+i+l+'" align="center" valign="middle"></td>').css({width:'35px'}).html("&nbsp;").appendTo('#tr'+i+'');
			}
		}
	}
	
	for(i=1; i<=6; i++)
	{
		for(l=1; l<=7; l++)
		{
			$('#td'+i+l).bind("click", function(){
				if($(this).html()!="" && $(this).html()!="close" && $(this).html()!="today")
				{
					
					$(this).css({backgroundColor:'lime', fontWeight:'bold', color:'green'});
					$('#day').val($(this).html());
					for(var g=1; g<=6; g++)
					{
						for(var h=1; h<=7; h++)
						{
							if($('#td'+g+h).html()!= $(this).html())
							     $('#td'+g+h).css({backgroundColor:'transparent', fontWeight:'normal', color:'#fff'})
						}
					}
				}
			})
		}
	}
	$('<div id="eves"></div>').css({'float':'left'}).appendTo($container);
	
	
	$container.hide();
	
	
	
	this.fillCalendar=function(m1, d, y)
	{
		
		$('#eves').empty();
        $('<img />').attr('src', $options.path+"modules/mod_eventviewer/eve.png").css({float:'left', display:'block', padding:'5px'}).appendTo('#eves');
	    $('<div id="allevents"></div>').css({padding:'10px',fontSize:$options.fontsize, fontFamily:$options.fontfamily, fontWeight:$options.fontweight, fontStyle:$options.fontstyle}).appendTo('#eves');
	
	var n = myobj.getDaysOfMonth(m1, y);
	
	myobj.resetTable();
	var localDate = new Date();
	localDate.setFullYear(y);
	localDate.setMonth(m1);
	localDate.setDate(1);
	wd2 = localDate.getDay();
		wd2++;
		var dayCounter = 1;
		for(var i=wd2; i<=7; i++)
		{
			$container.find('#td1'+i).css({cursor:'hand', cursor:'pointer'}).html(dayCounter);
			if(dayCounter==d)
			{
				$container.find('#td1'+i).css({backgroundColor:'lime', color:'green', fontWeight:'bold'});
			}
			dayCounter++;
		}
		
		for(i=2; i<=6; i++)
		{
			
			for(var j=1; j<=7; j++)
			{
			
				if(dayCounter<=n)
				{
				
					$container.find('#td'+i+j).css({cursor:'hand', cursor:'pointer'}).html(dayCounter);
					if(dayCounter==d)
					{
						$container.find('#td'+i+j).css({backgroundColor:'lime', color:'green', fontWeight:'bold'});
					}
					
					
					
				}
				dayCounter++;
			}
		}
		for(var g=0; g<$options.months.length; g++)
		{
						//console.log($options.names[g]);
						if( m1==parseInt($options.months[g]))
						{
							$('<span></span><br />').css({color:$options.fontcolor, fontFamily:$options.fontfamily, fontWeight:$options.fontweight, fontStyle:$options.fontstyle, fontSize:$options.fontsize+'px'}).html($options.days[g]+"-"+$options.names[g]+":"+" @ "+$options.hours[g]+", "+$options.descs[g]).appendTo('#allevents');
						}
		}
		
		var himage = parseInt($options.months.length) * $container.children('#eves').children('#allevents').children('span').eq(0).height();
		var wimage = (116 * himage) / 198;
		$container.children('#eves').children('img').css({width:wimage+'px', height:himage+'px'});

	
	}
	this.resetTable = function()
	{
		for(i=1; i<=6; i++)
		{
			for(var j=1; j<=7; j++)
			{
				$container.find('#td'+i+j).html("");
				$container.find('#td'+i+j).css({backgroundColor:'transparent', color:'#fff', fontWeight:'normal', cursor:'text'});
			}
		}
		$('#td67').html('today').css({cursor:'hand', cursor:'pointer'}).bind('click', function(){
		  $('#month').val(currentd[0]);
		  $('#day').val(currentd[1]);
		  
		myobj.readCurrentDate();}
		)
		$('#td66').html('close').css({cursor:'hand', cursor:'pointer', fontWeight:'bold'}).bind("click", function(){
		var dt = myobj.getDaysOfMonth(parseInt($('#month').val()),parseInt( currentd[2]));
		if(parseInt($('#day').val())<=dt)
	         $container.parent().children('#myDate').val((parseInt($('#month').val())+1)+"/"+$('#day').val()+"/"+ currentd[2]);
		else
			$container.parent().children('#myDate').val("Wrong Day!");
			
			$container.hide();
		})
		
	}
	
	this.readCurrentDate = function()
	{
		
		var info = myobj.today()
			
			myobj.fillCalendar(info[0], info[1], info[2]);
	
	}
	
}
Days.prototype.getDaysOfMonth= function(m, y)
{

	switch(parseInt(m))
	 {
		case 0:
		case 2:
		case 4:
		case 6:
		case 7:
		case 11:
				return 31;
				break;
		case 3:
		case 5:
		case 8:
		case 9:
		case 10:
				return 30;
				break;
		case 1:
			if((parseInt(y)%400==0) || ((parseInt(y)%4==0) && (parseInt(y)%100!=0)) )
				return 29;
			else
				return 28;
			break;
		
		}	
}
Days.prototype.today = function()
{
	
		var d = new Date();
	        var year = d.getFullYear();  
	        var m = d.getMonth();
	        var day = d.getDate();
			
			
			return [m, day, year];
}


}(jQuery))