module.exports = function(stream, onLine, onEnd) {
    var lingeringLine = '';

    stream.on('data', function(chunk) {
        var lines = chunk.split('\n');

        lines[0] = lingeringLine + lines[0];
        lingeringLine = lines.pop();

        lines.forEach(onLine);
    });

    process.stdin.on('end', function() {
        onLine(lingeringLine);
        onEnd();
    });
};
