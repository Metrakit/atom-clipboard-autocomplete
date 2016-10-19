'use babel';

class Provider {
    selector = '*';

    manifest = [];
    word = "cp"
    size = 8;

    constructor() {
        var self = this;
        setInterval(function() {
            var lastClipped = atom.clipboard.read();
            var index = (self.manifest.length-1);
            if ((self.manifest[index] === undefined || self.manifest[index] !== lastClipped) && lastClipped) {
                self.manifest.push(atom.clipboard.read());
            }
            if (self.manifest.length > self.size) {
                self.manifest.shift();
            }
        }, 500);
    }

    getSuggestions(config) {
        var buffer = config.editor.buffer;
        var bufferPosition = config.bufferPosition;
        var line = buffer.getTextInRange([[bufferPosition.row, 0], bufferPosition])
        var lastWords = line.split(" ").splice(-1);

        if (lastWords[0] === undefined) {
            return [];
        }
        var lastWord = lastWords[0];
        var re = new RegExp(".*" + this.word, "g");
        if (lastWord.match(re) == null || this.manifest.length === 0) {
            return [];
        }
        var suggestions = [];
        var manifest = this.manifest.reverse();

        for (var i = 0; i < manifest.length; i++) {
            var clipped = manifest[i];
            suggestions.push({
                "text": clipped,
                "replacementPrefix": "cp",
                "displayText": clipped,
                "iconHTML": '<i class="icon-clippy"></i>',
                "type": "snippet",
                "description": "Copy the content from the Clipboard"
            });
        }
        return suggestions;
    }

}

export default Provider;
