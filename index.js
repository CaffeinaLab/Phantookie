#!/usr/bin/env node

var URL = process.argv[2];
if (URL == null) {
	process.stderr.write("Invalid URL");
	process.exit();
}

var _ = require('underscore');
var moment = require('moment');
var phantom = require('phantom');
var fs = require('fs');

var cookie_map = require("./cookiemap.json");
var cookie_header_properties = ['name','domain','expires','path','secure','description'];

var TIME = null;

function cookieParser(c) {
	var cookie_map_element = _.find(cookie_map, function(el) {
		if (el.name === c.name) return true;
		if (el.regex != null && new RegExp(el.regex).test(c.name)) return true;
		return false;
	}) || {
		category: 'Uncategorized',
		description: '-'
	};

	return _.extend(c, {
		expires: c.expiry == null ? 'End of browser session' : moment(c.expiry*1000).fromNow(),
		description: cookie_map_element.description,
		category: cookie_map_element.category
	});
}

phantom.create(function(ph) {
	ph.createPage(function(page) {

		TIME = Date.now() + 500000;

		page.open(URL, function(status) {
			page.get('cookies', function(cookies) {

				var tpl_data = {
					url: URL,
					date: moment().format('YYYY-MM-DD HH:mm:ss'),
					headers: cookie_header_properties,
					cookies: _.groupBy(_.map(cookies, cookieParser), 'category')
				};

				var tpl = _.template( fs.readFileSync(__dirname + '/templates/std.tpl').toString() );
				process.stdout.write(tpl(tpl_data));
				ph.exit();

			});
		});
	});
});