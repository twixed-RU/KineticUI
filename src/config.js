KineticUI.Config = {

	button : {
		cornerRadius : 5,
		fill : {
			up : {
				startPoint: {x:0, y:15},
				endPoint: {x:0, y:17},
				colorStops: [0, '#F3B931', 1, '#E6951D']
			},
			hover : {
				startPoint:{x:0, y:15},
				endPoint: {x:0, y:17},
				colorStops: [0, '#F3B931', 1, '#F3B931']
			},
			down : {
				startPoint: {x:0, y:-100},
				endPoint: {x:0, y:100},
				colorStops: [0, '#E6951D', 1, '#F3B931']
			},
			disabled : {
				startPoint: {x:0, y:15},
				endPoint: {x:0, y:17},
				colorStops: [0, '#929292', 1, '#818181']
			}
		},
		font : {
			color : {
				up : '#000000',
				hover : '#ffffff',
				down : '#000000',
				disabled : '#555555'
			},
			family : 'Arial',
			size : 16,
			style : 'bold'
		},
		height : 32,
		padding : 40
	},

	input : {
		cornerRadius : 5,
		cursor : {
			color : '#000000',
			interval : 250,
			width : 1
		},
		fill : {
			normal : {
				startPoint: {x:0, y:15},
				endPoint: {x:0, y:17},
				colorStops: [0, '#F8F8F8']
			},
			hover : {
				startPoint:{x:0, y:15},
				endPoint: {x:0, y:17},
				colorStops: [0, '#FAFAFA', 1, '#FAFAFA']
			},
			focus : {
				startPoint: {x:0, y:-100},
				endPoint: {x:0, y:100},
				colorStops: [0, '#FFFFFF', 1, '#FFFFFF']
			},
			disabled : {
				startPoint: {x:0, y:15},
				endPoint: {x:0, y:17},
				colorStops: [0, '#DDDDDD']
			}
		},
		font : {
			color : {
				normal : '#555555',
				hover : '#333333',
				focus : '#000000',
				disabled : '#555555',
				placeholder : '#999999'
			},
			family : 'Arial',
			size : 16,
			style : 'bold'
		},
		height : 32,
		stroke : {
			color : {
				normal : '#555555',
				hover : '#F3B931',
				focus : '#E6951D',
				disabled : '#999999'
			},
			enabled : true,
			size : 1
		},
		padding : 7,
		width : 150
	},

	slide : {
		fill : {
			on : {
				startPoint: {x:0, y:15},
				endPoint: {x:0, y:17},
				colorStops: [0, '#F3B931', 1, '#E6951D']
			},
			off : {
				startPoint:{x:0, y:15},
				endPoint: {x:0, y:17},
				colorStops: [0, '#FAFAFA', 1, '#E9E9E9']
			},
			disabled : {
				startPoint: {x:0, y:15},
				endPoint: {x:0, y:17},
				colorStops: [0, '#929292', 1, '#818181']
			}
		},
		height : 32,
		pin : {
			fill : {
				colorStops: [0, '#E0E0E0', 0.25, '#DDDDDD', 1, '#FFFFFF']
			},
			stroke : {
				color : '#555555',
				enabled : true,
				size : 1
			}
		},
		stroke : {
			color : {
				normal : '#555555',
				disabled : '#999999'
			},
			enabled : true,
			size : 1
		},
		width : 64		
	}

};
