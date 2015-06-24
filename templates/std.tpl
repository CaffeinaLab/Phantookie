<!DOCTYPE html>
<html>
<head>
	<style>
		html {
			background: rgb(204,204,204);
			font-family: helvetica,arial;
		}
		body {
			background: white;
			width: 1280px;
			display: block;
			margin: 0 auto;
			box-sizing: border-box;
			padding: 20px;
			box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
		}
		table{
			width: 100%;
			border-collapse: collapse;
		}
		th {
			text-transform: uppercase;
		}
		td, th {
			border: 1px solid #ddd;
			padding: 5px;
		}
		@media print {
			body {
				margin: 0;
				box-shadow: 0;
			}
		}
	</style>
</head>
<h1>Cookie profilation</h1>
<h2>URL: <code><%= url %></code></h2>
<h2>Date: <code><%= date %></code></h2>
<hr>
<% _.each(cookies, function(list, category) { %>
	<h3><%= category %></h3>
	<table>
		<tr><% _.each(headers, function(h) { %><th><%= h %></th><% }); %></tr>
		<% _.each(list, function(c) { %>
		<tr><% _.each(headers, function(h) { %><td><%= c[h] %></td><% }); %></tr>
		<% }); %>
	</table>
<% }); %>
</body>
</html>