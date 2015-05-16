# Themerizer
(thee-mer-ize-er)

A small tool that normalizes the features of Tumblr for javascript for access through a theme.
Licensed under the MIT License (should be included with the source code in LICENSE.txt)

NOTE:
 * The only thing that this is current useful for right now is for finding the current page type.
 * Handles custom pages that have '/' but not custom pages named as other default pages (probably shouldn't do that anyway)
 
USAGE:
 * Load the script in your Tumblr theme
 * Use the global `Themerizer` and get `.loc`
 * Use `.pageType`, `.pageNumber`, and `.pageRequest` to get...
 
```javascript
Themerizer.loc.pageType = //Gets the page type, listed below
"unknown"
|| "notFound" //404, post not found
|| "frontPage" //Front page of blog
|| "tagPage" //Tag search
|| "searchPage" //Text string earch
|| "dayPage"
|| "permalinkPage" //Only post permalink
|| "askPage"
|| "submitPage"
|| "customPage" //User defined page (check pageRequest for the page name)

Themerizer.loc.pageNumber = 1; //If /page/# appears in the url, we'll get it, otherwise 1

Themerizer.loc.pageRequest = An object with a bunch of data on it
or like no data depending on the pageType (you'll have to read below)
```
