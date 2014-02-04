KineticUI.Slide = function(config){
	this.____init(config);
};

KineticUI.Slide.prototype = {
	____init : function(config){
		this._config = KineticUI.extend(KineticUI.Config.slide, config, true);

		this.___init(this._config);

		var self = this;

		this._background = new Kinetic.Rect({
			cornerRadius : this._config.height / 2,
			height : this._config.height,
			width : this._config.width,
			fillLinearGradientStartPoint : this._config.fill.off.startPoint,
			fillLinearGradientEndPoint : this._config.fill.off.endPoint,
			fillLinearGradientColorStops : this._config.fill.off.colorStops,
			fillPriority : 'linear-gradient',
			strokeEnabled : this._config.stroke.enabled,
			stroke : this._config.stroke.color.normal,
			strokeWidth : this._config.stroke.size
		});
		this.add(this._background);

		this._pin = new Kinetic.Rect({
			cornerRadius : this._config.height / 2,
			height : this._config.height,
			width : this._config.height,
			fillRadialGradientEndRadius : this._config.height,
			fillRadialGradientColorStops : this._config.pin.fill.colorStops,
			fillPriority : 'radial-gradient',
			strokeEnabled : this._config.pin.stroke.enabled,
			stroke : this._config.pin.stroke.color,
			strokeWidth : this._config.pin.stroke.size,
			draggable : true,
			dragBoundFunc: function(pos) {
				var xMax = self.width() - this.width() + this.parent.position().x;
				if (pos.x < this.parent.position().x) pos.x = this.parent.position().x;
				if (pos.x > xMax) pos.x = xMax;
				pos.y = this.getAbsolutePosition().y;
				return pos;
			}
		});
		this.add(this._pin);
		this._pin.on('dragstart',this.pinDragStart);
		this._pin.on('dragend',this.pinDragEnd);

		this.disabled = false;
		this._state = 'off';

		this.on('click touchend',this.mouseClick);

	},
	batchDraw : function(){
		if (this.parent) if (this.parent.batchDraw) this.parent.batchDraw();
	},
	colorScheme : function(scheme){
		this._background.setAttrs({
			fillLinearGradientStartPoint : this._config.fill[scheme].startPoint,
			fillLinearGradientEndPoint : this._config.fill[scheme].endPoint,
			fillLinearGradientColorStops : this._config.fill[scheme].colorStops		
		});
		this.batchDraw();
	},
	mouseClick : function(e){
		if (this.disabled) return;
		KineticUI.Event.blur(this);
		if (this._state == 'off') {
			this.state('on');
		} else {
			this.state('off');
		}
	},
	pinDragStart : function(e){
		KineticUI.Event.blur(this);
	},
	pinDragEnd : function(e){
		var pin = e.targetNode;
		var slide = pin.parent;
		if (pin.position().x + pin.width() / 2 > slide.width() / 2) {
			slide.state('on');
		} else {
			slide.state('off');
		}
	},
	disable : function(){
		this.disabled = true;
		this.colorScheme('disabled');
		this._pin.draggable(false);
	},
	enable : function(){
		this.disabled = false;
		this._pin.draggable(true);
		if (this._state == 'off')
			this.colorScheme('off');
		else
			this.colorScheme('on');
	},
	state : function(value){
		if (value === undefined) {
			return this._state;
		} else {
			if (value == 'off') {
				this._pin.position({x:0, y:0});
				this._state = 'off';
				if (this.disabled) {
					this.colorScheme('disabled');
				} else {
					this.colorScheme('off');
				}
			} else {
				this._pin.position({x:(this.width() - this._pin.width()), y:0});
				this._state = 'on';
				if (this.disabled) {
					this.colorScheme('disabled');
				} else {
					this.colorScheme('on');
				}
			}
			this.fire('change',{targetNode:this,state:this._state},true);
		}
	}
};

Kinetic.Util.extend(KineticUI.Slide, Kinetic.Group);
