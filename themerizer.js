/*
Author: Peter "Coburn" Fornari

This is the main script which initializes and does everything
*/
function(Themerizer){
	//Defaults
	var loc = this.loc = { "isReady" : true };
	loc.pageType = "unknown";
	loc.pageNumber = 1;
	loc.pageRequest = null;
	
	//Quick check for 404
	{block:PostTitle}
		var postTitle = {PostTitle};
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
	{block:TagPage}
		loc.pageType = "tagPage";
		loc.pageRequest = {
			"tag" : {Tag},
			"urlSafeTag" : {URLSafeTag},
			"tagUrl" : {TagURL},
			"tagUrlChrono" : {TagURLChrono}
		};
		pageDetermined = true;
	{/block:TagPage}
	
	//Search page
	{block:SearchPage}
		loc.pageType = "searchPage";
		loc.pageRequest = {
			"searchQuery" : {SearchQuery},
			"urlSafeSearchQuery" : {URLSafeSearchQuery},
			"resultCount" : {SearchResultCount}
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
	//Link formats
	//http://example.tumblr.com
	//http://example.tumblr.com/day/year4/month2/day2
	//http://example.tumblr.com/search/query
	//Each one of these can have /page/# somewhere in there too
	var nextQueryUrl = "http://" + location.hostname + "/";
	var fields = location.pathname.split("/");
	if((!pageDetermined || loc.pageType === "permalinkPage") && fields.length == 1)
	{
		switch(fields[0])
		{
			case "ask":
				pageType = "ask";
			break;
			case "submit":
				pageType = "submit";
			break;
			default:
				pageType = "customPage";
				pageRequest = {
					"pageName" : fields[0]
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
				pageType = "tagPage";
				pageRequest = {
					"tag" : fields[i+1]
				}
				i++;
				pageDetermined = true;
			}
			else if(!pageDetermined && fields[i] == "search"  && isDef(fields[i+1]))
			{
				pageType = "searchPage";
				pageRequest = {
					"search" : fields[i+1]
				};
				i++;
				pageDetermined = true;
			}
			else if(fields[i] == "day" && isDef(fields[i+1]) && isDef(fields[i+2]) && isDef(fields[i+1]))
			{
				pageType = "dayPage";
				pageRequest = {
					"year" : fields[i+1],
					"month" : fields[i+2],
					"day" : fields[i+3]
				};
				i+=3;
				pageDetermined = true;
			}
			else if(fields[i] == "page" && isDef(fields[i+1]))
			{
				pageNumber = parseInt(fields[i+1]);
				i++;
			}
			else if(!pageDetermined)
			{
				pageType = "customPage";
				pageRequest = {
					"pageName" : fields.join("/");
				};
				pageDetermined = true;
				break;
			}
		}
	}
};
}(window.Themerizer = window.Themerizer || {});