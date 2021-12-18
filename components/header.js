function navbar() {
	return `<nav>
	<input type="checkbox" name="" id="check" />
	<label for="check" class="check">
		<i class="fa fa-bars" id="btn"></i>
	</label>
	<label class="logo"
		><a href="mainHome.html"
			><img
				src="https://static.frontendmasters.com/assets/fm/js/static/frontendmasters.e1e10b58c1.svg" /></a
	></label>

	<ul>
		<li><a href="/courses.html">Courses</a></li>
		<li><a href="">Learn</a></li>
		<li><a href="">Pricing</a></li>
		<li><a href="">Login</a></li>
		<li><a class="join" href="">Join Now</a></li>
	</ul>
</nav>`;
}

export default navbar;
