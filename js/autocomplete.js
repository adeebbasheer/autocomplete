(function ($) {
	$.fn.autocomplete = function(options) {
		var that = this;
		var n=0;

		this.keyup(function(event) {
			
			//----------------------------on keydown and keyup-------------------------
			var len = $(options.dest+' li').length;
			if (n > len || n < 0) {
				n=0;
			}
			// console.log($(options.dest).html()); 

			if (event.which==40) {
				n++;
				// console.log(n);
				$(options.dest +' :nth-child('+n+')').addClass('bg');
				$(options.dest +' :nth-child('+(n-1)+')').removeClass('bg');
				that.val($(options.dest+' li.bg').text());
			} else if (event.which==38) {
				n--;
				$(options.dest +' :nth-child('+n+')').addClass('bg');
				$(options.dest +' :nth-child('+(n+1)+')').removeClass('bg');
				that.val($(options.dest+' li.bg').text());
			} else if (event.which==13) {
				that.val($(options.dest+' li.bg').text());
				$(options.dest).find('li').remove();
			} else {
				n=0;
				// console.log(event.which);
				var html = "";
				var val = that.val();
				var list = options.input;
				for (var i =  0; i < list.length; i++) {
					if(val.length>0) {
						if (val.toLowerCase() === list[i].slice(0, val.length).toLowerCase()) {
							html = html + '<li><strong>'+list[i].slice(0, val.length)+'</strong>'+list[i].slice(val.length)+'</li>';	
						}
					}						
				};
				$(options.dest).html(html);
			}

			//------------------------on-click of li---------------------
			$(options.dest).find('li').on('click', function (e1) {				
				that.val($(e1.target).text());
				console.log(e1);
			});

			//---------------------on-hover of li-------------------------
			$(options.dest).find('li').hover(function(e) {
				that.val($(e.target).text());
			});
		});
				
		//-------------------on blur of input--------------------
		that.blur(function () {
			$(options.dest).find('li').remove();
		});				
	};
} (jQuery));