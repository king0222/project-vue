import Vue from 'vue'

//滚动加载


Vue.directive('scroll', {
	bind: function(el, binding) {
		const scrollMore = (el, binding) => {
			let offset = el.offsetTop;
		  	if(document.body.scrollTop + window.innerHeight >= (el.clientHeight + offset - 5)) {   
		  		if(!el['scrollDisable']) {
			    	el['scrollDisable'] = true; 
			    	let fnc = binding.value;  
					let none = el.getAttribute('data-none');
			    	if (!none) {
			    		fnc().then(data => {
			    			el['scrollDisable'] = false; 
				    		if (data.none) {
				    			el.setAttribute('data-none', true)
				    		}
				    	}).then(err => {
				    		if (err) {
				    			console.log('return err or empty data is:', err)
				    		}
				    	});
			    	}
			    	
			    }
		  	}
		}

		el['scrollDisable'] = false;
  		el['fn'] = scrollMore.bind(null, el, binding)
  		window.addEventListener('scroll', el['fn'])
	},
	inserted: function(el, binding) {
	},
	update: function(el, binding) {
	},
  	componentUpdated: function (el, binding) {
    },
    unbind: function(el, binding) {
    	el['scrollDisable'] = false;
    	window.removeEventListener('scroll', el['fn'])
    }
})