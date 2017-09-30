# LittyBittyTemplater

This is just a bare bones templating engine optimized for performance.

**What this does NOT have: iterations and logic.**  If you need to have these features, apply it to the data, or use another templater.

**What this DOES have: a render method AND a template compilation for faster performance.**  When you instantiate the LittyBittyTemplater, your template text will be processed into an array for text substitution.  This means that the regexp matcher only has to run once.  Each render will run on the array.

### Usage: 

```
    var LittyBittyTemplater = require('little-bitty-templater');

    var templateText = 'The Quick, {|color|} {|animal|}...';
    var contextData = { 
        color: 'brown',
        animal: 'fox'
    };

    var templater 
        = new LittyBittyTemplater('aTemplateName', templateText);

    // The Quick, brown fox...
    var renderedText = templater.render(contextData);


```

**you can also use your own template tag**

```
    var LittyBittyTemplater = require('little-bitty-templater');

    var templateText = 'The Quick, {{color} {{animal}}...';
    var contextData = { 
        color: 'brown',
        animal: 'fox'
    };

    var yourOwnTemplateTag = /\{\|([a-zA-Z0-9\_]{1,})\|\}/g;
    var templater 
        = new LittyBittyTemplater('aTemplateName', templateText, yourOwnTemplateTag);

    // The Quick, brown fox...
    var renderedText = templater.render(contextData);
```

