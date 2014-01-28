var KineticUI = {
	traceEnabled : false,

	enableTrace : function(){
		KineticUI.traceEnabled = true;
	},
	disableTrace : function(){
		KineticUI.traceEnabled = false;
	},
	trace : function(str,error){
		if (KineticUI.traceEnabled && console) {
			if (!error) {
				if (console.log) console.log(str);
			} else {
				if (console.error) console.error(str);
			}
		}
	},
	preventEvent : function(event){
		event.cancelBubble = true;
		event.stopPropagation();
		event.preventDefault();
	},
	cloneArray : function(array){
		var result = [];
		for (var key in array) {
			if (typeof array[key] == 'object') {
				if (Array.isArray(array[key]))
					result[key] = this.cloneArray(array[key]);
				else
					result[key] = this.cloneObject(array[key]);
			} else
				result[key] = array[key];
		}
		return result;
	},
	cloneObject : function(object){
		var result = {};
		for(var key in object){
			if (!object.hasOwnProperty(key)) continue;
			if (typeof object[key] == 'object') {
				if (Array.isArray(object[key]))
					result[key] = this.cloneArray(object[key]);
				else
					result[key] = this.cloneObject(object[key]);
			} else
				result[key] = object[key];
		}
		return result;
	},
	extend : function(dst,src,clone){
		var result = dst;
		if (clone) result = KineticUI.cloneObject(dst);
		if (src !== undefined) {
			if (result === undefined || result == null) result = {};
			for (var key in src) {
				if (!src.hasOwnProperty(key)) continue;
				if (typeof src[key] == 'object')
					result[key] = this.extend(result[key],src[key]);
				else
					result[key] = src[key];
			}
		}
		return result;
	}
};
