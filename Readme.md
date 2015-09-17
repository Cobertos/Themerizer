# Themerizer
(thee-mer-ize-er)

A small tool that normalizes the features of Tumblr for javascript for access through a theme.
Licensed under the MIT License (should be included with the source code in LICENSE.txt)

NOTE:
 * Right now finds current page type, page number, and other page related info
 * It WILL handle custom pages that have a '/' in them but not custom pages named as other default pages (probably shouldn't do that anyway)
 
USAGE:
 * Load `themerizer.js` into your theme (with the static uploader or something like RawGit)
 * Paste the script `themerizerEmbed.js` into a `<script>` tag at the top of your theme. **It must be directly in the theme, not in a `<script>` tag's `src`!**
 * You now have access to the global `Themerizer` which contains...
 
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

Themerizer.loc.pageRequest = An object with the other Tumblr theme
related data (lots of data or none depending on the page type).
```
