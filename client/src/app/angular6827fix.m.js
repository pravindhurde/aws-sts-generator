(function(document) {
	if (!document) {return;}
	console.warn('Patching document.createElement as a solution for https://github.com/angular/angular/issues/6827');	
	let createElement = document.createElement;

	/**
	 * We create a workaround to use `name` of an element to store its `is` attribute
	 * <button is="toggle-button"></button> => <button-is-toggle-button></button-is-toggle-button>
	 */
	document.createElement = function(...args) {	
		if (args[0] && args[0].indexOf('-is-') > 0) {			
			let newArgs = args[0].split('-is-'); // 'button-is-toggle-button' -> ['button','toggle-button']

			newArgs[1] = {is: newArgs[1]}; 		// ['button','toggle-button'] -> ['button', {is: 'toggle-button'}]

			return createElement.apply(document, newArgs);
		}
		return createElement.apply(document, args);
	}

})(window ? window.document : null);