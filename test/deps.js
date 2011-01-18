QUnit.module('deps');

var join = require('path').join;

test('require parser', 7, function() {
    same( parse('require("test")'), {"test": true}, "double quots" );   
    same( parse("require('test')"), {"test": true}, "single quots" );    
    same( parse(" require ( 'test' ) "), {"test": true}, "with spaces" );    
    same( parse("require('test/test-test')"), {"test/test-test": true}, "with special chars" );
    same( 
        parse("require('test'); function test() { test() } require(\"test1\")"),
        {test: true, test1: true},
        "more real live code" 
    );    
    same( parse('require(test);require("fui")'), {fui: true}, "take only if a string was passed" );   
    same( parse('require("fui")', true), ['fui'], "return array" );   
});

test('find dependencies', function() {
    var root = join(__dirname, 'fixtures', 'deps');

    same(
        find(root+'/1/a.js'),
        [root + '/1/a.js', root + '/1/b.js'],
        'deps test 1, required files without any path prefix'
    );

    same(
        find(root+'/2/a.js'),
        [root + '/2/a.js', root + '/2/b.js'],
        'deps test 2, path contains ./'
    );

    same(
        find(root+'/3/b.js'),
        [root + '/3/b.js', root + '/3/1/a.js'],
        'deps test 3, b->a'
    );
    
    same(
        find(root+'/3/1/a.js'),
        [root + '/3/1/a.js', root + '/3/b.js'],
        'deps test 4, a->b'
    );  
    
    same(
        find(root+'/4/c.js'),
        [root + '/4/c.js', root + '/4/1/a.js', root + '/4/b.js'],
        'deps test 4, c->a->b'
    );  

});
