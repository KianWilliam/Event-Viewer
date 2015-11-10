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
defined('_JEXEC') or die('Access Restricted');
defined('DS')? :define('DS', DIRECTORY_SEPARATOR);
require_once(dirname(__FILE__).DS."helper.php");
$color = $params->get("col");
$fontcolor = $params->get("fontcolor");
$fontsize = $params->get("fontsize");
$fontfamily = $params->get("fontfamily");
$style = $params->get("fontstyle");
switch($style)
{
	case 0:
		$fontstyle = "normal";
		$fontweight= "normal";
		break;
	case 1:
		$fontstyle = "normal";
		$fontweight= "bold";
		break;
	case 2:
		$fontstyle = "italic";
		$fontweight= "normal";
		break;
	case 3:
		$fontstyle = "italic";
		$fontweight= "bold";
		break;		
}
	$events =  json_decode(str_replace("|qq|", "\"", $params->get('events')));
	for($i=0; $i<count($events); $i++)
	{
		$name[] = $events[$i]->eventname;
		$month[] = ($events[$i]->eventmonth)-1;
		$day[] = $events[$i]->eventday;
		$hour[] = $events[$i]->eventhour;
		$desc[] = $events[$i]->eventdesc;
	}




require_once(JModuleHelper::getLayoutPath("mod_eventviewer"));
