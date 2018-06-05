if ($.fn.validatebox){
	$.fn.validatebox.defaults.rules.minLength.message = 'Please enter at least {0} characters.';
	$.fn.validatebox.defaults.rules.maxLength.message = 'Please enter at most {0} characters.';
	$.fn.validatebox.defaults.rules.equals.message = '两次输入不一致。';
}