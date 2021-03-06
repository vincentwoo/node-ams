QUnit.module('dataimg');

var fixtures = __dirname + '/fixtures/cssdataimg';

var sample = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABRElEQVR42mNgAIKAuIb/AXH1cMyABwTC1Tb8B7EZYAaAwMytR/4fuv7of2B8A1ZDUNRde4RqGUgTTDIgDrcBMEuwqgEJHjx26390yeL/EG81gF0TCHUuSHzPweu4vRmc0vUf5kxs4PT5B2D54NQuTANCU3vyi1vW/ycG1PVu+e8f2+iLGrpAp+48cB2sYNvpx/8rZu1C0VQxc9f/KVsfgNnL1p3GDGiQv3YfghjgGJQFkgSzGaAMU+cIuNiKDWcwAzEwqTUurWYlxDag7SBXgEDL5J1wV6V37gCzcxvXAL1Q54s1Fmq6N6M43SGgCIVf3rERf2IDScLAoZsfUGgQwJVGUFIajK7q3ATxxiSI0yugfKwpFT0loiciEBvkOpA8hiEwZ8PSeGReP1ZngjSB5GGGwMMCOTcGQm3H5UXk3Ig3PIgFALVQ3pXPHoX7AAAAAElFTkSuQmCC";

test('simple', function() {
    var context = {
            root: fixtures,
            data: {},
            paths: []
        },
        o = {
            maxSize: 32768
        },
        src, res;
        
    src = 'a { background: url(/sample.png) }';
    res = run.call(context, '/test.css', src, o);
    equal('a { background: url("'+sample+'") }', res, 'image is encoded');

    src = 'a { background: url("/sample.png") }';
    res = run.call(context, '/test.css', src, o);
    equal('a { background: url("'+sample+'") }', res, 'url has double quotes');

    src = "a { background: url('/sample.png') }";
    res = run.call(context, '/test.css', src, o);
    equal('a { background: url("'+sample+'") }', res, 'url has double quotes');

    src = "a { background: url ( '/sample.png' ) }";
    res = run.call(context, '/test.css', src, o);
    equal('a { background: url("'+sample+'") }', res, 'a lot of spaces');
    
    src = 'a { background: url(/ape.jpg) }'
    res = run.call(context, '/test.css', src, o);
    equal('a { background: url("/ape.jpg") }', res, 'image is not encoded because its too large');
   
    src = 'a { background: url(http://ape.jpg) }'
    res = run.call(context, '/test.css', src, o);
    equal('a { background: url("http://ape.jpg") }', res, 'image is not encoded because its remote');   
});
