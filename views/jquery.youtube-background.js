$(function() {
	$('[data-youtube]').youtube_background();
});

$(function() {
	$('[data-youtube]').youtube_background({
		mobile: true
	});
});

$(function() {
	$('[data-youtube]').youtube_background({
		'play-button': true,
		'mute-button': true
	});
});

$(function() {
	$('[data-youtube]').youtube_background({
		'load-background': false
	});
});
