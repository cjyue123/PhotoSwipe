// PhotoSwipe - http://www.photoswipe.com/
// Copyright (c) %%year%% by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: %%version%%

(function (window, Util) {
	
	/*
	 * Class: Code.PhotoSwipe.ElementClass
	 * Most PhotoSwipe classes inherit from this class
	 * Provides hooks for fading in and out
	 */
	Code.PhotoSwipe.ElementClass = SimpleClass.extend({
		
		el: null,
		settings: null,
		isHidden: null,
		
		fadeInHandler: null,
		fadeOutHandler: null,
		
		
		/*
		 * Function: init
		 */
		init: function(options){
			
			this.settings = {
				opacity: 1,
				fadeInSpeed: 250,
				fadeOutSpeed: 500
			};
			
			Util.extend(this.settings, options);
			
			this.fadeInHandler = this.postFadeIn.bind(this);
			this.fadeOutHandler = this.postFadeOut.bind(this);
			this.isHidden = true;
			
		},
		
		
		
		/*
		 * Function: resetPosition
		 */
		resetPosition: function(){
		},
		
		
		
		/*
		 * Function: show
		 */
		show: function(){
			
			this.stopFade();
						
			// Show
			Util.DOM.setStyle(this.el, 'opacity', this.settings.opacity);
			Util.DOM.show(this.el);
			
			this.postShow();
			
		},
		
		
		
		/*
		 * Function: postShow
		 * Overide this 
		 */
		postShow: function(){
			
			this.isHidden = false;
			this.addEventHandlers();		
			Util.Events.fire(this, Code.PhotoSwipe.ElementClass.EventTypes.onShow);
		
		},
		
	
		
		/*
		 * Function: fadeIn
		 */
		fadeIn: function(){
			
			Util.DOM.setStyle(this.el, 'opacity', 0);
			
			this.fadeInFromCurrentOpacity();
			
		},
		
		
		
		/*
		 * Function: fadeInFromCurrentOpacity
		 */
		fadeInFromCurrentOpacity: function(){
			
			this.stopFade();
			
			this.isHidden = false;
			
			// Fade in
			Util.DOM.show(this.el);
			Util.Animation.fadeIn(
				this.el, 
				this.settings.opacity, 
				this.settings.fadeInSpeed, 
				this.fadeInHandler
			);
			
		},
		
		
				
		/*
		 * Function: postFadeIn
		 */
		postFadeIn: function(e){
			
			if (this.isHidden){
				return;
			}
			
			this.addEventHandlers();			
			Util.Events.fire(this, Code.PhotoSwipe.ElementClass.EventTypes.onFadeIn);
			
		},
		
	
				
		/*
		 * Function: hide
		 */
		hide: function(){
					
			this.stopFade();
			
			Util.DOM.hide(this.el);
			
			this.postHide();
			
		},
		
		
		/*
		 * Function: postHide
		 * Overide this 
		 */
		postHide: function(){
			
			this.isHidden = true;
			this.removeEventHandlers();	
			Util.Events.fire(this, Code.PhotoSwipe.ElementClass.EventTypes.onHide);
			
		},
		
		
		/*
		 * Fuction: fadeOut
		 */
		fadeOut: function(){
			
			this.stopFade();
				
			this.isHidden = true;
						
			Util.Animation.fadeOut(this.el, this.settings.fadeOutSpeed, this.fadeOutHandler);
			
		},
		
		
		
		
		/*
		 * Function: preFadeOut
		 */
		postFadeOut: function(e){
			
			if (!this.isHidden){
				return;
			}
			
			Util.DOM.hide(this.el);
			this.removeEventHandlers();
			
			Util.Events.fire(this, Code.PhotoSwipe.ElementClass.EventTypes.onFadeOut);
			
		},
		
		
		
		/*
		 * Function: stopFade
		 */
		stopFade: function(){
			
			Util.Animation.stopFade(this.el);
		
		},
		
		
		/*
		 * Function: addEventHandlers
		 */
		addEventHandlers: function(){
					
		},
		
		
		/*
		 * Function: removeEventHandlers
		 */
		removeEventHandlers: function(){
						
		}
		
		
	});
	
	
	
	Code.PhotoSwipe.ElementClass.EventTypes = {
		onShow: 'PhotoSwipeElementClassOnShow',
		onHide: 'PhotoSwipeElementClassOnHide',
		onClick: 'PhotoSwipeElementClassOnClick',
		onFadeIn: 'PhotoSwipeElementClassOnFadeIn',
		onFadeOut: 'PhotoSwipeElementClassOnFadeOut'
	};
	

})
(
	window,
	Code.PhotoSwipe.Util
);
