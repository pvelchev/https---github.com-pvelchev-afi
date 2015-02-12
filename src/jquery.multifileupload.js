/*!
* jquery.multiplefileinput
* @version 1.0.0
* @author Velchev Consulting
* @author Petar Velchev <pbx@developer.bg>
* @license MIT
* @url http://myclabs.github.io/jquery.confirm/
*/

(function ($) {

$.fn.multiplefileinput = function (options) {
	return this.each( function() { 
		if (typeof options === 'undefined') options = {};
		if ($(this).data('options')) var _dataOptions = $(this).data('options');
		else var _dataOptions={};
		//eval('var dataOptions = '+ dataOptionsStr);
		var dataOptions = _dataOptions;
		options = $.extend( {element: $(this),required:$(this).attr('required'), form:$(this).parent('form')},
							options,
							dataOptions
						);
		$.multiplefileinput(this,options);
	});
};

$.multiplefileinput = function (that,options) { 
	$.multiplefileinput.defaults = {
		browseButtonStr:'Browse',
		selectedButtonStr:'',
		size:'input-group-sm',
		selectButtonClass:'btn-default',
		browseButtonClass:'btn-default',
		singularSelectedText:'%s file was selected',
		pluralSelectedText:'There are %s files selected',
		fileNotAllowedText:'Files of type %s are not allowed',
		nothingSelectedText:'No slected files',
		allowedFileTypes:[''],
		maxFileSize:'5000',
		trashImage:'data:image/png;base64,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',
		fileImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAABnRSTlMA/wD/AP83WBt9AAAACXBIWXMAAIhCAACIQgE+ZX7pAAAMJklEQVR4nO3d62/aZhvHcRvbYAgEaA4ckrAQVZ3W//9vaaWqIiRLAsRAcKA+4NNeIFXb83Rph++TuX6fV1sl7EsJ3wTbtx09yzKtaJIk8X0/+qc4jqMoStNU9nTimKZpWZZlWZVK5fj4uF6v67oue6iC0QsUwHa7fX19dV13s9kUaGxhTNNstVrtdvvo6Ej2LIVRgAB833dd13Vd3/dlz1IMjUaj3+9Xq1XZgxSA0gG4rjuZTIIgkD1IIbXb7V6vVy6XZQ+iNEUD8Dzv6elps9nIHqTYdF2/uLg4PT2VPYi6lAsgDMPJZLJarWQPcjgajcZgMLAsS/YgKlIogDiOp9PpfD6XPcgBMgzj6uqq1WrJHkQ5qgQQBMHt7W0YhrIHOWTn5+e9Xg+nSv9OiQDW6/V4PE6SRPYgh6/dbl9dXZVKJdmDqEJ+AI7jPD4+yp2BlHq9PhwODcOQPYgSZAaQZdnDw8NisZA1AFm2bd/c3OAMqSYxgCRJRqPRt2/fpOwdLMu6ubnBxTI5AWRZNh6PXdcVv2v4rlQqDYfDRqMhexCZ5BwMTadTvPulS9N0NBotl0vZg8gkIYCXl5fZbCZ+v/D/siy7v7+n/O0QHYDneff394J3Cm+bTCYPDw/SzwdKITSAKIpub29pfqEVN5/PaTYgNIDxeBxFkcg9wq9bLBYEGxAXwGq1wklPxRFswBSzmyzLnp6e+G3fMAzLskzTVOQCJ9v1NlmWrddrMXd77q5LXl5eElkyJCiA+Xy+3W7ZbrNcLjebzWazWavVDn5xS5Iky+VyOp0KWDFFqgERF8KSJPn06RPD71yr1ep0OgSvYgZBMBqNmP8o+aGTkxMKDYgIYDKZsDrTXK/X+/1+rVZjsrUiiqLo8+fPYj4OvXv37urq6rAb4P7JYbvdPj8/M9nU5eXl+/fvKb/7NU2zLKvX64nZ13K5/PPPPw/7mJh7AIvFIv9X0DCM9+/f497WndPTU2H3Nx58A9wDyL/mx7KsDx8+1Ot1JvMcAF3XRd7ceNgN8A0gDMOcDzUplUo3NzeVSoXVSIdB8N29B9wA3wBeX19zbmEwGBA82/NTtm0L3uOhNsA3gJyff87OzvAggx8yDEP8Jb/lcnl414k5BhDHcZ4nWxmG0e12Gc5zYKTc0LhbKyF+v/xwDCDn559Op6PIugY1yTouOrAGOAawXq/3fq1lWTjp+TaJt7Tv1k7L2jtbHAPIc8W+3W4f/PKenOQ+6nA+nx/Gw2w4vsnyLP1vNpsMJzlI0n9AOI7DdYWvGCoGYJom8fUORfH8/Fz0BngFEMfx3ufLGo3GYS/AYkKRL1HRG+AVQJ7PP3hi2a9QJABN056fn4t7PKBiAHiS/a9QJwCtyA94RQDAhuM4RTw3yvEYYO/XmqagGzWBrSJeH8BbDVja/YGfi4sLpT6hvQEXm4CxYj1jCwEAewV6vhACAC6K0gACAF4K0QACAI7UbwABAF+KN4AAgDuVG0AAIIKyDSAAEETNBhAAiKNgAwgAhFKtAQQAoin1XAkEABIsFovJZCJ7Ck1DACDLbDbbLR2VCwGANA8PD/kfHp4TAgCZ7u7uPM+TOAACAJnSNB2NRmEYyhoAAYBkcRyPRqM899DmgQBAvjAMb29vxfzlv/+BAEAJ3759u7u7E3+BDAGAKlzXFf+QOQQACnEcR/DFAQQAanl8fPR9X9juEACoJcuyu7s7YQfECACUEwSBsJVCCABU5DhOnr+w+OsQAChKzG0DCKCoivLwzb0FQbBcLnnvBQEUFYWHyE+nU95HwwigqKrV6sH/EoiiyHEcrrtAAEWl63q1WpU9BXfz+ZzrkQACKDAKf0sziiKuNwwggALrdDqGYciegrvVasVv4wigwCzLury8lD0FdwgA/lW73W61WrKn4CuKIn63yyCAwvvtt9+63a7sKfjabrectowACk/X9W63++HDB9u2Zc/CC78A8FciD0StVvv999/DMPQ8z/M83/c5nT3Msmy35SzL0jTd/e/uP3jsbifPn51+GwI4HLqu27Zt2/a7d+8E7zrLsu126/t+EARBEPi+z/ZBD/yuByMAYEDX9UqlUqlUvv9LkiSLxcJxHH4/vJnAMQBwYRjG+fn5x48fz8/PZc/yFgQAHOm63u/3Ly4uZA/yrxAAcHd2dqbsxQoEACIoe6UCAYAItm0fHx/LnuIHEAAIouZ1OgQAgvz9JKk6EAAIggCANDVv4EQAQBoCANIQAJCGAIA0BACkIQAgDQEAaQgASEMAQBoCANIQAJCGAIA0BACkIQAgDQEAaQgASEMAQBoCANIQAJCGAIA0BACkIQAgDQEAaQgASEMAQBoCANIQAJCGAIA0BACkIQAgDQEAaQgASEMAQBoCANIQAJCGAIA0BACkIQAgDQEAaQgASEMAQBoCANIQAJCGAIA0BACkIQAgDQEAaQgASEMAQBoCANIQAJCGAIA0BACkIQAgDQEAaQgASEMAQBoCANIQAJCGAIA0BACkIQAgDQEAaQgASEMAQBoCANIQAJCGAIA0BACkIQAgDQEAaQgASEMAQBoCANIQAJCGAIA0BACkIQAgDQEAaQgASEMAQBoCANIQAJCGAIA0BACkIQAgDQEAaQgASEMAQBoCANIQAJCGAIA0BACkIQAgDQEAaQgASEMAQBoCANIQAJCGAIA0BACkIQAgDQEAaQgASEMAQBoCANIQAJCGAIA0BACkIQAgDQEAaQgASEMAQBoCANIQAJCGAIA0BACkIQAgDQEAaQgASEMAQBoCANIQAJCGAIA0BACkIQAgDQEAabwCME1z79fGccxwElBEnm9rnrfT23gFYFnW3q+NoojhJKCIPN/WPG+ntyEAEAQB/KrtdstwElBEnm9r8QIwTVPX9f1eu16vsyxjOw/IlWXZer3e77W6rhfvGEDLUW0cx57nsR0G5PI8b++DYH4//jU1A9A0zXVdhpOAdHm+oUUNoFwu7/3al5eXNE0ZDgMSpWn68vKy98vzvJF+imMAjUZj79dGUTSfzxkOAxLN5/M8p4DyvJF+imMAx8fHeV4+m82SJGE1DMiSJMlsNsuzhZxvpLdxDMA0zXq9vvfLkySZTqcM5wEpptNpnh9k9Xqd3ykgjfdaoGazmefljuOsVitWw4B4q9XKcZw8W8j5FvopvgHk/+V1f3/v+z6TYUAw3/fv7+9zboTr5x+NdwCVSsW27TxbSNN0NBqFYchqJBAjDMPRaJTzVJ5t25VKhdVIP8R9OXT+X2FRFH358mWz2TCZBwTYbDZfvnzJv6aL9+cfTUAAJycne6+J+C5Jkq9fv+LEaCHM5/OvX7/mP4On6/rJyQmTkd7ai4BVN5PJJOeJsO/q9Xq/36/Vaky2Bmx5nvf09MTqd3Wn0+n1ekw29QYRASRJ8unTJ4Yn9VutVqfTqVarrDYIOfm+P5vNGJ6yMwzj48ePhmGw2uC/ERGApmmO4zw+PrLdZrlcbjabzWazVquVSri3U7Q0TT3Pc13XdV3mK9gvLi7Ozs7YbvOHBAWQZdnnz5/5LfQ3DMOyLNM0UQJvaZrGcRxFEb/r9OVy+Y8//sh/6PgrOF5j+ztd1/v9/ng85rT9JEmwbuJg9Pt9Me9+TeRTIVqt1tHRkbDdQUEdHR21Wi1huxP6geH6+prr2m4oOsuyrq+vRe5RaACWZQ2HQ2G/3aBYdF0fDoeCf0SKPmSs1WqDwUDwTqEQBoOB+Cs8Es6ZtNvtTqcjfr+gsk6n0263xe9XzknDbrcrYJkHFEWz2ex2u1J2LScAXdcHgwFOCoGmaUdHR4PBQNaRoaALYT+UZdnDw8NisZA1AEh3cnJyeXkp8byIzAB2eKySgEIQtt7hDfID0DRtvV6Px2NcyqXDMIzr62uuj3v4RUoEoGlaEAS3t7e484uCSqUyHA5z3irIiioBaJoWx/F0OsVdL4ft9PS02+1yfdDDf6JQADthGE4mEzwM4vC0Wq1er8f7Ht//SrkAdtjeWwRyqXwfn6IB7LiuO5lMgiCQPQjsybbtXq+n8kVPpQPY8X1/d9sRHhBUFNVqdXeznvq3rRYggO+22+3r66vrupvNpkBjE6Hrer1ebzabx8fHXJ/nzFaRAvguSRLf96N/2t2nh4eq81YqlXZ3n1r/VK1WBdzDztxfWNsPTgcqB2QAAAAASUVORK5CYII='
	};
	
	var mem = {};
	mem.settings = $.extend({},$.multiplefileinput.defaults,options);
	mem.supportOf = {
	  fileList: !!window.FileList,
      filereader: typeof FileReader != 'undefined',
      dnd: 'draggable' in document.createElement('span'),
      formdata: !!window.FormData,
      progress: "upload" in new XMLHttpRequest
    };
	mem.filesToShow = {
      'image/png': true,
      'image/jpeg': true,
      'image/gif': true
    };
	
	var del = function(index){
	    var files = mem.files_buffer.find('input[type=file]');
		files.each(function( i,elem ) {
			if (i === index) $(this).remove();
		});
		mem.numFiles = mem.files_buffer.find(':file').length;
		if (   (typeof mem.settings.required ==='string')
				&& (mem.settings.required == 'required') 
				&& (mem.numFiles == 0) 
				) { 
				mem.current_input.attr('required','required');
			}
		fill_dropdown();
		fill_field();
	}
	
	function setCSS(){
		if ($('#multiplefileuploadCSS').length == 0 ){
			var css =
			'\n<style id="multiplefileuploadCSS">"\n'
				+'.multiplefileupload .btn-file {position: relative;  overflow: hidden;}\n'
				+'.multiplefileupload .btn-file input[type=file]{\n'
				+'position: absolute;  top: 0;  right: 0;  min-width: 100%;  min-height: 100%;  text-align: right; '
				+'filter: alpha(opacity=0); opacity: 0;  display: block;}\n'
				+'.multiplefileupload input[readonly]{background-color: white ! important; }\n'
				+'.multiplefileupload .files_uploaded {padding:1em;width:40em ! important;max-width:800px ! important;}\n'
				+'.multiplefileupload .imgcontainer{ float:left;display:inline-block;margin:0.5em;width:15em;height:16em;padding:0.5em;border:1px solid #999;box-shadow:2px 2px 3px #999;overflow:hidden;position:relative;text-align:center}'
				+'.multiplefileupload .imgcontainer p{width:100%}\n'
				+'.multiplefileupload .files_uploaded a{ opacity:0.5; background-repeat: no-repeat;position:absolute;bottom:0.5em;right:0.5em;display:block;width:3em;height:3em;cursor:pointer;border-radius:0.3em}\n'
				+'.multiplefileupload .files_uploaded a {background-size: 3em 3em;background-image: url(data:image/png;base64,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);}'
				+'.multiplefileupload .files_uploaded a:hover{ opacity:1}'
			+'\n</style>\n';
			$(css).appendTo($('body'));
		}
	}
	
	function getHTML(that){
		var input=$(that); 
		mem.name=input.attr('name'); 
		mem.multiple = input.attr('multiple');
		if (mem.multiple) {
			if ( mem.name.lastIndexOf('[') === -1) mem.name = mem.name+'[]';
		}
		input.attr('name',mem.name);
		input.removeAttr('multiple');
		mem.template = $('<div>');
		mem.template.append(input.clone());

		var ret =
		'<div style="display:none;" class="files_buffer"></div>'
		+'<div class="multiplefileupload input-group '+mem.settings.size+'">'
		+'<span class="input-group-btn">'
			+'<span class="file-input btn btn-file fileinput_container '+mem.settings.browseButtonClass+'">'
				+ mem.settings.browseButtonStr 
				+ mem.template.html()
			+'</span>';
			if (mem.multiple) {
				ret+=
				'<span class="file-input btn dropdown-toggle '+ mem.settings.selectButtonClass+'" data-toggle="dropdown" aria-expanded="false">'
					+ mem.settings.selectedButtonStr + ' <span class="caret"></span>'
				+'</span>'
					+'<div class="dropdown-menu files_uploaded">'
						+ mem.settings.nothingSelectedText
					+'</div>';
			}
		ret+='</span>'
		+'<input type="text" class="input_field form-control" readonly value="'+ mem.settings.nothingSelectedText + '">'
		+'</div>';
		
		return ret;
	}
	
	function _init(that){ 
		setCSS();
		mem.div = $(getHTML(that));
		$(that).replaceWith(mem.div); 
		mem.files_buffer = mem.div.prev('.files_buffer'); 
		mem.files_uploaded = mem.div.find('.files_uploaded');
		mem.files_uploaded.data('del',del);
		mem.input_field = mem.div.find('.input_field'); 
		mem.fileinput_container = mem.div.find('.fileinput_container'); 
		mem.current_input = mem.fileinput_container.find(':file').first(); 
		$(mem.current_input).on('change',function(e) { moveit(e);});
		 //mem.settings.form.on('submit',function(){ mem.current_input.remove()});
		
		$(document).ready( function (){
			var formSubmit = mem.settings.form.attr('onsubmit'));
			var submitHandlers = $._data(mem.settings.form[0],'events').submit;
			console.log(submitHandlers);
			// let make my event first of submits
			var evLen = submitHandlers.lenght;
			if (evLen > 1 ){
				var lastSubmitEvent = submitHandlers[evLen-1];
				submitHandlers.splice(evLen-2,1);
				submitHandlers.unshift(lastSubmitEvent);
			}
			console.log(submitHandlers); console.log('DONE');
		});
 	}

	function moveit(e){
		if (mem.multiple) {
			var label = mem.current_input.val().replace(/\\/g, '/').replace(/.*\//, '');
			mem.current_input.appendTo(mem.files_buffer);
			mem.numFiles = mem.files_buffer.find(':file').length;
			var new_input = $(mem.template.html());
			if (   (typeof mem.settings.required ==='string')
				&& (mem.settings.required == 'required') 
				&& (mem.numFiles > 0) 
				) { 
				new_input.removeAttr('required');
			}
			new_input.appendTo(mem.fileinput_container);
			mem.current_input = new_input;
			fill_dropdown();
			fill_field(label);
			$(mem.current_input).on('change',function(e) { moveit(e);});
		}
		else {
			fill_field();
		}
	}
	function fill_dropdown(){ 
		var allFiles = mem.files_buffer.find('input[type=file]');
		
		$(mem.files_uploaded).empty();
		if (allFiles.length === 0) {
			var div = $('<p>'+mem.settings.nothingSelectedText+'</p>');
			mem.files_uploaded.append(div);
		}
		else {
			allFiles.each(function( index,elem ) { 
				var div = $('<div class="imgcontainer">');
				var p   = $('<p>');
				div.append(p);
				var lbl = $(elem).val().replace(/\\/g, '/').replace(/.*\//, '');
				var ext=lbl.substr((~-lbl.lastIndexOf(".") >>> 0) + 2);
				var filename= lbl.replace('.ext','');
				var canonicalFilename = filename.substr(0,16);
				if ( filename != canonicalFilename) canonicalFilename+='... ';
				var okFileName=canonicalFilename+'.'+ext;
				var txt='';
				if (mem.supportOf.fileList){
					var files = elem.files; 
					var file=files[0]; 
					if (mem.filesToShow[file.type] == true ) {
						var reader = new FileReader();
						reader.onload = function (event) {
							var img = $('<img>');
							img.attr('src', event.target.result);
							img.css({'max-width':'14em','max-height':'10em','border-radius':'0.3em'});
							p.append($(img));
						};
						reader.readAsDataURL(file);
					}
					else {
						var img = $('<img>');
							img.attr('src', mem.settings.fileImage);
							img.css({'max-width':'14em','max-height':'10em','border-radius':'0.3em'});
							p.append($(img));
					}
					txt+='<span><strong title="'+lbl+'">'+okFileName+'</strong>' + '<br>'+ (file.size/1024).toFixed(2) + " КB " +'<br>'+file.lastModifiedDate.toLocaleDateString()+'</span>'
					
				}
				else {
					txt+= '<span><strong title="'+lbl+'">'+okFileName+'</strong></span>';
				}
				
				txt += '<a onclick="$(this).parents(\'div.files_uploaded\').data(\'del\')('+index+')" ></a>';
				
				div.append($(txt));
				mem.files_uploaded.append(div);
			});
		}
	}
	
	function fill_field(){ 
		var lbl= mem.current_input.val();
		label = lbl.replace(/\\/g, '/').replace(/.*\//, '');
		if (mem.multiple === 'multiple') {
			if (mem.numFiles == 0) label= mem.settings.nothingSelectedText;
			else 
			label = (mem.numFiles == 1) ? sprintf( mem.settings.singularSelectedText, mem.numFiles ) : 
										  sprintf( mem.settings.pluralSelectedText, mem.numFiles );
		}
		mem.input_field.val(label);
	}
	
	function sprintf( f ){ 
		for( var i=1; i < arguments.length; i++ ) {
			f = f.replace( /%s/, arguments[i] );
		}
		return f;
	}
	
	_init(that);
}
})(jQuery);