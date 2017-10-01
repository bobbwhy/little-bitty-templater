
/**
 *  @class LittleBittyTemplate .. rml
 *  @description 
 *  This is extremely simple template engine.  No logic
 *  and no loops.  Just simple variable replacement.
 *  place variables within {|varName|} tags...
 *
 *  In instantiation, the template will 'compile'
 *  the templateText into an array of alternating text and
 *  tag names which will be reassembled later on.  this
 *  will save the need to run the regex after instantiation.
 */
function LittleBittyTemplater(name, templateText, tagMatchRe) { 
  this.name = name;

  tagMatchRe = tagMatchRe || /\{\|([a-zA-Z0-9\_]{1,})\|\}/g;
  var processedTemplate = [];
  var match;
  var cursor = 0;
  while(match = tagMatchRe.exec(templateText)) {
    processedTemplate = processedTemplate.concat(
      [
        templateText.slice(cursor, match.index),
        match[1],
      ]
    );
    cursor = match.index + match[0].length;
  }
  processedTemplate.push(templateText.slice(cursor));
  this.processedTemplate = processedTemplate;
}

LittleBittyTemplater.prototype.render = function(context) { 
  if (typeof context !== 'object') 
    return 'Invalid Context in LittleBittyTemplater' + this.name;
  var processedTemplate = this.processedTemplate;
    var textArray = [];
    var i = 0;
    var _l = processedTemplate.length;
    var v;
    for ( ; i < _l; i+=2 ) {
      textArray[i] = processedTemplate[i];
      v = context[processedTemplate[i+1]];
      if (typeof v === 'undefined' || v === null) { 
        textArray[i+1] = '';
      } else { 
        textArray[i+1] = String(context[processedTemplate[i+1]]);
      }
    }
    return textArray.join('');
}

module.exports = LittleBittyTemplater;
