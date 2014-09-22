!function($){var Slider=function(element,options){this.element=$(element),this.picker=$('<div class="slider"><div class="slider-track"><div class="slider-selection"></div><div class="slider-handle"></div><div class="slider-handle"></div></div><div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div></div>').insertBefore(this.element).append(this.element),this.id=this.element.data("slider-id")||options.id,this.id&&(this.picker[0].id=this.id),"undefined"!=typeof Modernizr&&Modernizr.touch&&(this.touchCapable=!0);var tooltip=this.element.data("slider-tooltip")||options.tooltip;switch(this.tooltip=this.picker.find(".tooltip"),this.tooltipInner=this.tooltip.find("div.tooltip-inner"),this.orientation=this.element.data("slider-orientation")||options.orientation,this.orientation){case"vertical":this.picker.addClass("slider-vertical"),this.stylePos="top",this.mousePos="pageY",this.sizePos="offsetHeight",this.tooltip.addClass("right")[0].style.left="100%";break;default:this.picker.addClass("slider-horizontal").css("width",this.element.outerWidth()),this.orientation="horizontal",this.stylePos="left",this.mousePos="pageX",this.sizePos="offsetWidth",this.tooltip.addClass("top")[0].style.top=-this.tooltip.outerHeight()-14+"px"}this.min=this.element.data("slider-min")||options.min,this.max=this.element.data("slider-max")||options.max,this.step=this.element.data("slider-step")||options.step,this.value=this.element.data("slider-value")||options.value,this.value[1]&&(this.range=!0),this.selection=this.element.data("slider-selection")||options.selection,this.selectionEl=this.picker.find(".slider-selection"),"none"===this.selection&&this.selectionEl.addClass("hide"),this.selectionElStyle=this.selectionEl[0].style,this.handle1=this.picker.find(".slider-handle:first"),this.handle1Stype=this.handle1[0].style,this.handle2=this.picker.find(".slider-handle:last"),this.handle2Stype=this.handle2[0].style;var handle=this.element.data("slider-handle")||options.handle;switch(handle){case"round":this.handle1.addClass("round"),this.handle2.addClass("round");break;case"triangle":this.handle1.addClass("triangle"),this.handle2.addClass("triangle")}this.range?(this.value[0]=Math.max(this.min,Math.min(this.max,this.value[0])),this.value[1]=Math.max(this.min,Math.min(this.max,this.value[1]))):(this.value=[Math.max(this.min,Math.min(this.max,this.value))],this.handle2.addClass("hide"),this.value[1]="after"==this.selection?this.max:this.min),this.diff=this.max-this.min,this.percentage=[100*(this.value[0]-this.min)/this.diff,100*(this.value[1]-this.min)/this.diff,100*this.step/this.diff],this.offset=this.picker.offset(),this.size=this.picker[0][this.sizePos],this.formater=options.formater,this.layout(),this.picker.on(this.touchCapable?{touchstart:$.proxy(this.mousedown,this)}:{mousedown:$.proxy(this.mousedown,this)}),"show"===tooltip?this.picker.on({mouseenter:$.proxy(this.showTooltip,this),mouseleave:$.proxy(this.hideTooltip,this)}):this.tooltip.addClass("hide")};Slider.prototype={constructor:Slider,over:!1,inDrag:!1,showTooltip:function(){this.tooltip.addClass("in"),this.over=!0},hideTooltip:function(){this.inDrag===!1&&this.tooltip.removeClass("in"),this.over=!1},layout:function(){this.handle1Stype[this.stylePos]=this.percentage[0]+"%",this.handle2Stype[this.stylePos]=this.percentage[1]+"%","vertical"==this.orientation?(this.selectionElStyle.top=Math.min(this.percentage[0],this.percentage[1])+"%",this.selectionElStyle.height=Math.abs(this.percentage[0]-this.percentage[1])+"%"):(this.selectionElStyle.left=Math.min(this.percentage[0],this.percentage[1])+"%",this.selectionElStyle.width=Math.abs(this.percentage[0]-this.percentage[1])+"%"),this.range?(this.tooltipInner.text(this.formater(this.value[0])+" : "+this.formater(this.value[1])),this.tooltip[0].style[this.stylePos]=this.size*(this.percentage[0]+(this.percentage[1]-this.percentage[0])/2)/100-("vertical"===this.orientation?this.tooltip.outerHeight()/2:this.tooltip.outerWidth()/2)+"px"):(this.tooltipInner.text(this.formater(this.value[0])),this.tooltip[0].style[this.stylePos]=this.size*this.percentage[0]/100-("vertical"===this.orientation?this.tooltip.outerHeight()/2:this.tooltip.outerWidth()/2)+"px")},mousedown:function(ev){this.touchCapable&&"touchstart"===ev.type&&(ev=ev.originalEvent),this.offset=this.picker.offset(),this.size=this.picker[0][this.sizePos];var percentage=this.getPercentage(ev);if(this.range){var diff1=Math.abs(this.percentage[0]-percentage),diff2=Math.abs(this.percentage[1]-percentage);this.dragged=diff2>diff1?0:1}else this.dragged=0;this.percentage[this.dragged]=percentage,this.layout(),$(document).on(this.touchCapable?{touchmove:$.proxy(this.mousemove,this),touchend:$.proxy(this.mouseup,this)}:{mousemove:$.proxy(this.mousemove,this),mouseup:$.proxy(this.mouseup,this)}),this.inDrag=!0;var val=this.calculateValue();return this.element.trigger({type:"slideStart",value:val}).trigger({type:"slide",value:val}),!1},mousemove:function(ev){this.touchCapable&&"touchmove"===ev.type&&(ev=ev.originalEvent);var percentage=this.getPercentage(ev);this.range&&(0===this.dragged&&this.percentage[1]<percentage?(this.percentage[0]=this.percentage[1],this.dragged=1):1===this.dragged&&this.percentage[0]>percentage&&(this.percentage[1]=this.percentage[0],this.dragged=0)),this.percentage[this.dragged]=percentage,this.layout();var val=this.calculateValue();return this.element.trigger({type:"slide",value:val}).data("value",val).prop("value",val),!1},mouseup:function(){$(document).off(this.touchCapable?{touchmove:this.mousemove,touchend:this.mouseup}:{mousemove:this.mousemove,mouseup:this.mouseup}),this.inDrag=!1,0==this.over&&this.hideTooltip(),this.element;var val=this.calculateValue();return this.element.trigger({type:"slideStop",value:val}).data("value",val).prop("value",val),!1},calculateValue:function(){var val;return this.range?(val=[this.min+Math.round(this.diff*this.percentage[0]/100/this.step)*this.step,this.min+Math.round(this.diff*this.percentage[1]/100/this.step)*this.step],this.value=val):(val=this.min+Math.round(this.diff*this.percentage[0]/100/this.step)*this.step,this.value=[val,this.value[1]]),val},getPercentage:function(ev){this.touchCapable&&(ev=ev.touches[0]);var percentage=100*(ev[this.mousePos]-this.offset[this.stylePos])/this.size;return percentage=Math.round(percentage/this.percentage[2])*this.percentage[2],Math.max(0,Math.min(100,percentage))},getValue:function(){return this.range?this.value:this.value[0]},setValue:function(val){this.value=val,this.range?(this.value[0]=Math.max(this.min,Math.min(this.max,this.value[0])),this.value[1]=Math.max(this.min,Math.min(this.max,this.value[1]))):(this.value=[Math.max(this.min,Math.min(this.max,this.value))],this.handle2.addClass("hide"),this.value[1]="after"==this.selection?this.max:this.min),this.diff=this.max-this.min,this.percentage=[100*(this.value[0]-this.min)/this.diff,100*(this.value[1]-this.min)/this.diff,100*this.step/this.diff],this.layout()}},$.fn.slider=function(option,val){return this.each(function(){var $this=$(this),data=$this.data("slider"),options="object"==typeof option&&option;data||$this.data("slider",data=new Slider(this,$.extend({},$.fn.slider.defaults,options))),"string"==typeof option&&data[option](val)})},$.fn.slider.defaults={min:0,max:10,step:1,orientation:"horizontal",value:5,selection:"before",tooltip:"show",handle:"round",formater:function(value){return value}},$.fn.slider.Constructor=Slider}(window.jQuery);