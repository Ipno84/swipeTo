$(function() {
	$('.item-swipe').swipeTo({
		minSwipe: 100,
		angle: 10,
		wrapScroll: 'body',
		binder: true,
		swipeStart: function() {
			console.log('start');
		},
		swipeMove: function() {
			console.log('move');
		},
		swipeEnd: function() {
			console.log('end');
		},
	});	
	deleteItem();
	getIe();
})

var deleteItem = function() {
	var deleteItemFnc = $('body').on('click tap', '.btn-delete', function(e) {
		e.preventDefault();
		var that = $(this);
		that.parent().parent().fadeOut('500');
	})
}