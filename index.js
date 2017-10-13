
;(function () {

	var vueModelVuex = {};

	vueModelVuex.install = function (Vue, options) {

		var options = options || {};


		Vue.directive('model-vuex', {

			bind : function (el, binding, vnode) {

				var tag = vnode.tag,
					type = vnode.type,
					value = binding.value,
					method = binding.arg;

				var handler = 
					( binding.modifiers.length > 0 )
						? binding.modifiers[0] :
					( tag === 'select' )
						? 'change' :
					( tag === 'input' && type === 'range' )
						? 'change' :
					( tag === 'input' && type === 'checkbox' )
						? 'click' :
					( tag === 'input' && type === 'radio' )
						? 'click' :
						'keyup';


				if ( options.hasOwnProperty('dev') )
				{
					console.log('tag', tag)
					console.log('type', type)
					console.log('value', value)
					console.log('method', method)
					console.log('handler', handler)
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
