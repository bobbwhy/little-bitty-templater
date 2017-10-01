# LittyBittyTemplater

This is just a bare bones templating engine optimized for performance.

**What this does NOT have: iterations and sophisticated logic.**  If you need to have these features, apply it to the data, or use another templater.

**What this DOES have:**

* **a render method AND a template compilation for faster performance.**  
    - When you instantiate the LittyBittyTemplater, your template text will be processed into an array for text substitution.  This means that the regexp matcher only has to run once.  Each render will run on the array.
* **a VERY Basic Logic that allows you to omit text surrounding a null or undefined context field.**

### Usage: 

**simple variable substitution**
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

**omit text around a null or undefined field**
Within the variable tag: If you place '<-' before the variable name.._without a space_, everything _within_ the tag and _before_ the '<-' will render ONLY if the value from the context is NOT null or undefined.

If you place '->' after the variable name, everything within the tag and after the '->' will render only if the value from the context is NOT null or undefined.


```
    var templateText = 'Title: {|title}{|<br>by <-author->: |}';
    var context = { 
        title: 'Birds',
        author: 'Robert'
    }
    templater.render(context);
    // Title: Birds<br>by Robert:

    var context = { 
        title: 'Birds',
        author: null
    }
    templater.render(context);
    // Title: Birds
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

