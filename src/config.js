KineticUI.Config = {

	button : {
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
		radius : 5,
		padding : 40
	}

};
