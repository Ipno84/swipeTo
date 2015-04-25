(function($) {
	$.fn.swipeTo = function(options) {
		
        var settings = $.extend({
			minSwipe: 100,
			angle: 10,
			wrapScroll: 'body',
			binder: true,
			swipeStart: function() {},
			swipeMove: function() {},
			swipeEnd: function() {}
		}, options );
		
		var start;
		var moving;
		var vertical;
		var verticalMov;
		var direction;
		var res;
		var minSwipe = settings.minSwipe;
		var moveStatus;
		var wrapScroll = $(settings.wrapScroll);
		var angle = settings.angle;
		var handler = this.selector;
		var binder = settings.binder;
		var swipeStart = settings.swipeStart;
		var swipeMove = settings.swipeMove;
		var swipeEnd = settings.swipeEnd;
		
		var onTouchStart = $('body').on('touchstart', handler, function(ev) {
			var that = $(this);
		    var e = ev.originalEvent;
		    start = e.touches[0].clientX;
		    vertical = e.touches[0].clientY;
		    var style = window.getComputedStyle(that.get(0));
		    var matrix = new WebKitCSSMatrix(style.transform);
		    moveStatus = matrix.m41;
		    start = 0 - moveStatus + start;
		    if(typeof swipeStart == 'function') {
			    swipeStart.call(this);   
		    }
		});
		
		var onTouchMove = $('body').on('touchmove', handler, function(ev) {
			var that = $(this);
			that.removeClass('swiped')
		    var e = ev.originalEvent;
		    moving = e.changedTouches[0].clientX;
		    verticalMov = e.changedTouches[0].clientY;
		    res = start - moving;
		    var horRes = vertical - verticalMov;
		    var absRes = Math.abs(res);
		    var absHorRes = Math.abs(horRes);
		    if(res < 0) {
			    direction = 'left';
			    var blockLeft = true;
		    }
		    if(res > 0) {
			    direction = 'right';
			    var blockRight = true;
		    }
		    var resPx = 0 - res;
		    if(absRes >= (absHorRes * angle) && blockRight) {
			    wrapScroll.addClass('overflow-hidden');
			    animateTo(that, resPx);
			    if(!that.hasClass('swiping')) {
					that.addClass('swiping');
			    }
		    }
		    if(typeof swipeMove == 'function') {
			    swipeMove.call(this);   
		    }
		});
		
		var onTouchEnd = $('body').on('touchend', handler, function(ev) {
			var that = $(this);
			var e = ev.originalEvent;
			wrapScroll.removeClass('overflow-hidden');
			that.removeClass('swiping');
		    var style = window.getComputedStyle(that.get(0));
		    var matrix = new WebKitCSSMatrix(style.transform);
		    moveStatus = matrix.m41;
		    var absMoveStatus = Math.abs(moveStatus);
		    that.addClass('swiped');
			if(absMoveStatus < minSwipe) {
				animateTo(that, 0);
				that.removeClass('open');
			} else {
				animateTo(that, 0 - minSwipe);
				that.addClass('open');
			}
		    if(typeof swipeEnd == 'function') {
			    swipeEnd.call(this);   
		    }
		});
		
		if(binder) {
			var onTap = $('body').on('click tap', handler, function(ev) {
				if(moveStatus != 0) {
					var that = $(this);
					var e = ev.originalEvent;
					e.preventDefault();
					that.addClass('swiped');
					animateTo(that, 0);
					that.removeClass('open');
				}
				
			});
		}
	};
}(jQuery));

var animateTo = function(that, pos) {
	that.css({
	        'transform': 'translateX('+pos+'px)',
	        '-webkit-transform': 'translateX('+pos+'px)',
	        '-moz-ransform': 'translateX('+pos+'px)',
	        '-o-transform': 'translateX('+pos+'px)',
	        '-ms-transform': 'translateX('+pos+'px)'
	}, 500)
}

var addCssClass = function(className, rules) {
	$("<style type='text/css'>."+className+"{"+rules+"}</style>").appendTo("head");
}