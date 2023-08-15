(function($) {
	var config = {};

	function getConfig() {
			var currentUrl = location.host + location.pathname;
			var config = {
				//add your custom config here
			};

			return config;
	}

	function isMobile() {
			return navigator.userAgent.match(/Android/i) ||
					navigator.userAgent.match(/webOS/i) ||
					navigator.userAgent.match(/iPhone/i) ||
					navigator.userAgent.match(/iPad/i) ||
					navigator.userAgent.match(/iPod/i) ||
					navigator.userAgent.match(/BlackBerry/i) ||
					navigator.userAgent.match(/Windows Phone/i) ||
					window.innerWidth < 1024
	}


	function debug(messages) {
			if (getQueryString('ads-debug') !== 'true') {
					return false;
			}
			if (typeof console === undefined) {
					return false
			}

			typeof console.group === 'function' ? console.group('*** ADVERTISING DEBUG  *** ') : console.log('*** ADVERTISING DEBUG  *** ');

			messages.forEach(function(message) {
					typeof console.info === 'functon' ? console.info(message) : console.log(message);
			})

			typeof console.groupEnd === 'function' && console.groupEnd();
	}

	function createSlot(adunit, sizes, id, outOfPage){
		if(outOfPage){
			return googletag.defineOutOfPageSlot(adunit, id).addService(googletag.pubads());
		}else{
			return googletag.defineSlot(adunit, sizes, id).addService(googletag.pubads());
		}
	}

	function buildSlots(config, callback) {
			var slotsLoaded = [];
			var slots = {};

			googletag.cmd.push(function() {
					//add your slots here

					/*
						slots.adTop = createSlot('123123123/SOME_AD_UNIT', [[320, 50], [320, 100]], 'ad-top');
					*/

					/* add your targeting here too

					googletag.pubads().setTargeting('demo', config.demo);
					googletag.pubads().setTargeting('seccion', config.pagetype);

					*/

					googletag.pubads().enableSingleRequest();
					googletag.enableServices();

					googletag.pubads().addEventListener('slotRenderEnded', function(e) {
							if (!e.isEmpty) {
									slotsLoaded.push(e.slot.getSlotElementId());
									debug([e.slot.getSlotElementId(), e.slot.getResponseInformation()])
							} else {
									debug(['slot ' + e.slot.getSlotElementId() + ' came empty'])
							}
					});
			});
	}

	$(function(){
		config = getConfig();
		buildSlots(config);
	})

})(jQuery)
