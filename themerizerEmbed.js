/* 
Author: Peter "Coburn" Fornari

THIS FILE MUST BE COPY-PASTED INTO THE THEME SOURCE
Otherwise we can't get any variables
*/
function n(o){return (typeof(o)==='undefined' ? null : o);}

(function(Themerizer){
Themerizer.t{
"block:PostTitle" : /*{block:PostTitle}*/true ||/*{/block:PostTitle}*/false,
"postTitle" : n({JSPostTitle}),

"block:IndexPage" : /*{block:IndexPage}*/true ||/*{/block:IndexPage}*/false,

"block:TagPage" : /*{block:TagPage}*/true ||/*{/block:TagPage}*/false,
"tag" : n({JSTag}),
"urlSafeTag" : n({JSURLSafeTag}),
"tagUrl" : n({JSTagURL}),
"tagUrlChrono" : n({JSTagURLChrono}),

"block:SearchPage" : /*{block:SearchPage}*/true ||/*{/block:SearchPage}*/false,
"searchQuery" : n({JSSearchQuery}),
"urlSafeSearchQuery" : n({JSURLSafeSearchQuery}),
"searchResultCount" : n({JSSearchResultCount}),

"block:DayPage" : /*{block:DayPage}*/true ||/*{/block:DayPage}*/false,
	
"block:PermalinkPage" : /*{block:PermalinkPage}*/true ||/*{/block:PermalinkPage}*/false
};
})(window.Themerizer = window.Themerizer || {});