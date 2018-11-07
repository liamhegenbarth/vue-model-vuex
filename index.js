
;(function () {

	var vueModelVuex = {};
	
	function getProp(tag, type) {
		return ( tag === 'input' && type === 'checkbox' )
			? 'checked' :
			'value';
	}

	vueModelVuex.install = function (Vue, options) {
	
		var options = options || {};


		// define directive
		Vue.directive('model-vuex', {
			update: function(el, binding, vnode) {
				// get the value being passed from vuex store and bind
				// set the prop based on input type
				vnode.elm[getProp(vnode.tag, vnode.elm.type)] = binding.value;
			},
			bind : function (el, binding, vnode) {

				// store settings from how user calls directive
				var tag = vnode.tag,
					type = vnode.elm.type,
					value = binding.value,
					method = binding.arg,
					modifier = Object.keys(binding.modifiers);


				// construct event handler
				// based on type of input
				var handler = 
					( modifier.length > 0 )
						? modifier[0] :
					( tag === 'select' )
						? 'change' :
					( tag === 'input' && type === 'range' )
						? 'change' :
					( tag === 'input' && type === 'checkbox' )
						? 'change' :
					( tag === 'input' && type === 'radio' )
						? 'click' :
						'input';


				// store input prop type
				// proper support for checkboxes
				var prop = getProp(tag, type);

				// simple dev mode
				// output settings
				if ( options.hasOwnProperty('dev') )
				{
					console.log('tag =>', tag)
					console.log('type =>', type)
					console.log('value =>', value)
					console.log('method =>', method)
					console.log('handler =>', handler)
					console.log('modifier =>', modifier)
					console.log('prop =>', prop)
				}
				

				// get the value being passed from vuex store and bind
				// set the prop based on input type
				vnode.elm[prop] = value
					
				// set the value in the vuex store by binding user defined method
				if ( vnode.context.hasOwnProperty(method) )
				{
					vnode.elm['on' + handler] = vnode.context[method]
				}
				// if no method has been defined yet, log a little error
				else
				{
					console.error('[v-model-vuex warn] method ' + method + '() does not exist in component')
				}

			}

		})

	}
	  

	// boiler environment sniffing
	if ( typeof exports == "object" )
	{
		module.exports = vueModelVuex
	}
	else if ( typeof define == "function" && define.amd )
	{
		define([], function () { return vueModelVuex })
	}
	else if ( window.Vue )
	{
		window.VueModelVuex = vueModelVuex
		Vue.use(vueModelVuex)
	}

})()
