QUnit.module('transport');

test('correct transport wrapping', 2, function() {
    var context = {
            options: {
                find: {
                    root: '/'
                }
            }  
        };

    equal(
        run.call(context, '/test/test.js', 'exports.test = 123;'),
        ';require.def("test/test", ["require", "exports", "module"], function(require, exports, module) {\nexports.test = 123;\n});\n',
        'transport text is correct'  
    );
    
    context.options.find.root = '/fui/fui/fui/';

    equal(
        run.call(context, '/fui/fui/fui/test/test.js', 'exports.test = 123;'),
        ';require.def("test/test", ["require", "exports", "module"], function(require, exports, module) {\nexports.test = 123;\n});\n',
        'root was applied correctly'  
    ); 
});
