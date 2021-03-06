
var fs = require('fs');

var mocha = require('mocha');
var expect = require('chai').expect;


function test(isLib) { 
  var LittleBittyTemplater 
      = require(isLib ? '../lib/' : '../src/' + 'index.js');

  var data = require('./test-data');
  var testTemplateText;
  var expectedResultText;
  var templater;

  before( 
    function() { 
      testTemplateText = String(fs.readFileSync('./test/test-template-text.html'));
      expectedResultText = String(fs.readFileSync('./test/expected-result-text.html'));
      expectedResultTextAuthor = String(fs.readFileSync('./test/expected-result-text-author.html'));
      templater = new LittleBittyTemplater('testTemplater', testTemplateText);
    }
  );

  describe(
    'testing the LittleBittyTemplater ' + (isLib === true ? 'lib' : 'src') + ' version!',
    function() { 
      it('should be able to create a templater',
        function() { 
          templater = new LittleBittyTemplater('test', testTemplateText);
          expect(templater.name).to.equal('test');
          expect(templater.processedTemplate).to.deep.equal(data.processedTemplate);
        }
      );

      it('should be able to render some text using the context without an author field.',
        function() { 
          var renderedText = templater.render(data.context);
          expect(renderedText).to.equal(expectedResultText);
        }
      );

      it('should be able to render some text using the context with an author field',
        function() { 
          var renderedText = templater.render(data.contextWithAuthor);
          expect(renderedText).to.equal(expectedResultTextAuthor);
        }
      );
    }
  );
}

module.exports = test;

