
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

  tagMatchRe = tagMatchRe || /\{\|([^\|\}.]{1,})\|\}/g;
  prevIfExists = /\<\-/;
  nextIfExists = /\-\>/;
  var processedTemplate = [];
  var match;
  var cursor = 0;
  var varName;
  while(match = tagMatchRe.exec(templateText)) {
    var tag= match[1];
    varInfo = tag.split(/\<\-|\-\>/);
    var _l = varInfo.length;
    varInfo = (_l === 3) 
             ? varInfo
             : (_l === 1) 
               ? varInfo = [ '', tag, '' ]
               : ( varInfo[0] === tag ) 
                  ? [ '', tag, varInfo[1] ]
                  : varInfo.concat( [ '' ] );
    processedTemplate = processedTemplate.concat(
      [
        templateText.slice(cursor, match.index),
      ].concat(varInfo)
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
    var _l = processedTemplate.length;
    var i = 0;
    var v;
    for ( ; i < _l; i+=4 ) {
      textArray[i] = processedTemplate[i];
      v = context[processedTemplate[ i + 2 ]];

      if (typeof v === 'undefined' || v === null) { 
        textArray[i+1] = '';
      } else {
          textArray[i+1] = processedTemplate[ i + 1 ] + String(v) + processedTemplate[ i + 3 ];
      }
    }
    return textArray.join('');
}

module.exports = LittleBittyTemplater;
