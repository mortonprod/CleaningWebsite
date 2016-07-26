var path = require('path');
///resolve will get the full path by combining them. So _root is one directory back from the helper.ts file.
var _root = path.resolve(__dirname, '..','..');
function root(args:any) {
    args = Array.prototype.slice.call(arguments, 0);///call used to make Array (this) arguments. ??TODO:This will not cut anything??
    var output = path.join.apply(path, [_root].concat(args));///Add the arguments together into a single path
    console.log("helper: " + output);
    return output; ///Set arguments to the correct location.
}
exports.root = root;