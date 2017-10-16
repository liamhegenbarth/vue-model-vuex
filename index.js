
;(function () {

	var vueModelVuex = {};

	vueModelVuex.install = function (Vue, options) {

		var options = options || {};


		Vue.directive('model-vuex', {

			bind : function (el, binding, vnode) {

				var tag = vnode.tag,
					type = vnode.elm.type,
					value = binding.value,
					method = binding.arg,
					modifier = Object.keys(binding.modifiers);


				var handler = 
					( modifier.length > 0 )
						? modifier[0] :
					( tag === 'select' )
						? 'change' :
					( tag === 'input' && type === 'range' )
						? 'change' :
					( tag === 'input' && type === 'checkbox' )
						? 'click' :
					( tag === 'input' && type === 'radio' )
						? 'click' :
						'input';


				if ( options.hasOwnProperty('dev') )
				{
					console.log('tag =>', tag)
					console.log('type =>', type)
					console.log('value =>', value)
					console.log('method =>', method)
					console.log('handler =>', handler)
					console.log('modifier =>', modifier)
				}
				

				// get the value
				vnode.elm.value = value
					
				// set the value
				if ( vnode.context.hasOwnProperty(method) )
				{
					vnode.elm['on' + handler] = vnode.context[method]
				}
				else
				{
					console.error('[v-model-vuex warn] method ' + method + '() does not exist in component')
				}

			}

		})

	}
	  

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
