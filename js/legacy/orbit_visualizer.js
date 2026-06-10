function init(orbit) {
	canvas = document.getElementById("orbitCanvas");
	if(!canvas)
	{
		console.error("Canvas element not found");
		return
	}
	ctx = canvas.getContext("2d");
	T_PERIOD = orbit.calculatePeriod(HYPOTHETICAL_A);
	MAGPIE.PDL.GEOGRAPHY.CANVAS.resizeCanvas();
	window.addEventListener("resize", resizeCanvas);
}