/*
Author: Peter "Coburn" Fornari

This is the main script which initializes and does everything
*/
function isDef(o)
{
	return !(typeof(o)==='undefined'||o==null);
}

(function(Themerizer){
	//Defaults
	var loc = Themerizer.loc = { "isReady" : true };
	loc.pageType = "unknown";
	loc.pageNumber = 1;
	loc.pageRequest = null;
	
	//Quick check for 404
	{block:PostTitle}
		var postTitle = {JSPostTitle};
		if(postTitle === "Not Found")
		{
			loc.pageType = "notFound";
			return;
		}
	{/block:PostTitle}
	
	//Trust tumblrs output vs our search
	var pageDetermined = false;
	
	//Main page only? The docs don't seem to say yes
	//but testing says yes sooooo...
	{block:IndexPage}
		loc.pageType = "frontPage";
		pageDetermined = true;
	{/block:IndexPage}
	
	//Tag search page
	//If tag is not found, it actually gives a notFound error
	{block:TagPage}
		loc.pageType = "tagPage";
		loc.pageRequest = {
			"tag" : {JSTag},
			"urlSafeTag" : {JSURLSafeTag}
			//"tagUrl" : {JSTagURL}, //Comes up as blank sometimes?
			//"tagUrlChrono" : {JSTagURLChrono}
		};
		pageDetermined = true;
	{/block:TagPage}
	
	//Search page
	{block:SearchPage}
		loc.pageType = "searchPage";
		loc.pageRequest = {
			"searchQuery" : {JSSearchQuery},
			"urlSafeSearchQuery" : {JSURLSafeSearchQuery},
			"resultCount" : {JSSearchResultCount}
		};
		pageDetermined = true;
	{/block:SearchPage}
	
	//Day page
	{block:DayPage}
		loc.pageType = "dayPage";
		pageDetermined = true;
	{/block:DayPage}
	
	//Permalink page (also ask, submit, and other pages)
	{block:PermalinkPage}
		loc.pageType = "permalinkPage";
		pageDetermined = true;
	{/block:PermalinkPage}
	
	//The following page types need a search of the URL string to determine where we are
	//pageType = "permalinkPage"; Needs more info
	//pageType = "dayPage";, Needs more info
	//pageType = "askPage";, 
	//pageType = "submitPage";, 
	//pageType = "customPage";,  
	//pageType = "frontPage";
	//We also need to find the page number
	
	//Get where we currently are to find where the format of the query for other pages
	//Some of the link formats
	//http://example.tumblr.com
	//http://example.tumblr.com/day/year4/month2/day2
	//http://example.tumblr.com/search/query
	//Each one of these can have /page/# somewhere in there too
	var fields = location.pathname.split("/");
	//Let permalink fall through because it could be an ask or submit page
	if((!pageDetermined || loc.pageType === "permalinkPage") && fields.length == 2)
	{
		switch(fields[1])
		{
			case "ask":
				loc.pageType = "askPage";
			break;
			case "submit":
				loc.pageType = "submitPage";
			break;
			default:
				loc.pageType = "customPage";
				loc.pageRequest = {
					"pageName" : fields[1]
				};
			break;
		}
		pageDetermined = true;
	}
	else
	{
		for(var i=0; i<fields.length; i++)
		{
			if(!pageDetermined && fields[i] == "tagged" && isDef(fields[i+1]))
			{
				loc.pageType = "tagPage";
				loc.pageRequest = {
					"tag" : fields[i+1]
				};
				i++;
				pageDetermined = true;
			}
			else if(!pageDetermined && fields[i] == "search"  && isDef(fields[i+1]))
			{
				loc.pageType = "searchPage";
				loc.pageRequest = {
					"search" : fields[i+1]
				};
				i++;
				pageDetermined = true;
			}
			else if(fields[i] == "post" && isDef(fields[i+1]) && isDef(fields[i+2]))
			{
				loc.pageType = "permalinkPage";
				loc.pageRequest = {
					"postId" : fields[i+1],
					"postTitle" : fields[i+2]
				};
				i+=2;
				pageDetermined = true;
			}
			else if(fields[i] == "day" && isDef(fields[i+1]) && isDef(fields[i+2]) && isDef(fields[i+1]))
			{
				loc.pageType = "dayPage";
				loc.pageRequest = {
					"year" : fields[i+1],
					"month" : fields[i+2],
					"day" : fields[i+3]
				};
				i+=3;
				pageDetermined = true;
			}
			else if(fields[i] == "page" && isDef(fields[i+1]))
			{
				loc.pageNumber = parseInt(fields[i+1]);
				i++;
			}
			else if(!pageDetermined)
			{
				loc.pageType = "customPage";
				loc.pageRequest = {
					"pageName" : fields.join("/")
				};
				pageDetermined = true;
				break;
			}
		}
	}
})(window.Themerizer = window.Themerizer || {});