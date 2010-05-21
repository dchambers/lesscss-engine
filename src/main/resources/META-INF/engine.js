var compileString = function(css) {
	var result;
    new(less.Parser)({ optimization: 3 }).parse(css, function (e, root) {
		result = root.toCSS();
    });
	return result;	
};

var compileFile = function(file) {
    var result, charset = 'UTF-8', dirname = file.replace(/\\/g, '/').replace(/[^\/]+$/, '');
    less.Parser.importer = function(path, paths, fn) {
    	var cssFile = readUrl(dirname + path, charset);
    	var pathPrefix = path.replace(/[^\/]*$/, '');
    	
    	if(pathPrefix) {
    		//print("\n\nBEFORE:\n" + cssFile);
        	cssFile = cssFile.replace(/url\(["']?([^\/"'][^:'")]*)["']?\)/g, 'url("' + pathPrefix + '$1")'
        		).replace(/@import "([^"]+)"/g, '@import "' + pathPrefix + '$1"');
        	//print("\n\nAFTER:\n" + cssFile);
    	}
    	
        new(less.Parser)({ optimization: 3 }).parse(cssFile, function (e, root) {
            fn(root);
        });
    };
    new(less.Parser)({ optimization: 3 }).parse(readUrl(file, charset), function (e, root) {
		result = root.toCSS();
    });
	return result;	
};