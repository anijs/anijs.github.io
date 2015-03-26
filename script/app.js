//Setting default class adding when anim
AniJS.setClassNamesWhenAnim('animated');

YUI().use('node-base', 'node-event-delegate', 'autocomplete', 'autocomplete-highlighters','autocomplete-filters', 'transition', function(Y) {
    //Obtain AniJS default helper
    var AniJSDefaultHelper = AniJS.getHelper();


    //Put this function into the helper
    AniJSDefaultHelper.validateCommandExecution = function(e, animationContext){
        var event = Y.one('#demoif').get('value'),
            eventTarget = Y.one('#demoon').get('value') || '#demotryit',
            behaviorTarget = Y.one('#demoto').get('value') || '#demotryit',
            behavior = AniJS.Parser.parseDoDefinition(Y.one('#demodo').get('value')),
            successMessage = 'Interaction setting up good!!! </br>' +
                            'Please ' + event + ' on ' + eventTarget;

        Y.one('#demo-message').set('innerHTML', successMessage);

        //Clear the trigered event in every launch
        AniJS.purge(eventTarget);

        //Creating an animation in non declarative way
        AniJS.createAnimation([{
            event: event,
            eventTarget: eventTarget,
            behaviorTarget: behaviorTarget,
            behavior: behavior,
            after: 'removeAnim'
        }]);

        //Running show info wall animation
        animationContext.run();
    };

    //Autocomplete
    var autocompleSources = APP_CONFIG.autoCompleteSources,
        autocompleteConfig = [
            {rootNode:'#demoif', source: autocompleSources.if},
            {rootNode:'#demoon', source: autocompleSources.on},
            {rootNode:'#demoto', source: autocompleSources.on},
            {rootNode:'#demodo', source: autocompleSources.do}
        ];

    Y.each(autocompleteConfig, function(item){
        Y.one(item.rootNode).plug(Y.Plugin.AutoComplete, {
            resultHighlighter: 'phraseMatch',
            resultFilters: 'phraseMatch',
            activateFirstItem: true,
            source: item.source
        });
    });

    // This just makes sure that the href="#" attached to the <a> elements
    // don't scroll you back up the page.
    Y.one('body').delegate('click', function(e) {
        e.preventDefault();
    }, 'a[href="#"]');

    //All non internal links open in a new tab
    var links = Y.all('a');
    links.each(function(a){
        if(a.getAttribute('href')[0] !== '#')
            a.setAttribute('target', '_blank');
    });

    //Nav responsive behavior
    Y.one('.collapse-toggle').on('click', function(e){
        e.preventDefault();
        Y.one('.collapse').toggleClass('in');
    });

    //The menu items are smart behavior
    Y.one('body').delegate('click', function(e) {
        if (!e.currentTarget.hasClass('pure-menu-selected')) {
            Y.one('.header li.pure-menu-selected').removeClass('pure-menu-selected');
            e.currentTarget.get('parentNode').addClass('pure-menu-selected');
        }
    }, '.header li a');

    //Dinamically square generation
    var baseNode = Y.one('#click-square'),
        colCount = 3,
        colorSquares = APP_CONFIG.colorSquares,
        behaviorSquares = APP_CONFIG.behaviorSquares,
        size = behaviorSquares.length,
        squareCollectionHTML = '',
        tempBehavior,
        tempSquareHTML;

    for (var i = 0; i < size; i++) {
        tempBehavior = behaviorSquares[i];
        tempSquareHTML = '<div class="demo-square demo1 ' + colorSquares[i] + '" ' +
                            'data-anijs="if: ' + 'click' + ',' +
                                        'do: ' + tempBehavior.do + ',' +
                                        'to: ' + tempBehavior.to + '' +
                                        '" ' +
                            'data-id="' + i + '"' +
                                        '>' +
                            '</div>';
        if(colCount === 0){
            colCount = 3;
            tempSquareHTML+= '<br>';
        } else{
            colCount--;
        }
        squareCollectionHTML += tempSquareHTML;
    }
    baseNode.one('.click-square-content-demo').append(Y.Node.create(squareCollectionHTML));
    var anijsDinamicallySintax = Y.one('.anijs-sintax-dinamically'),
        doValue = anijsDinamicallySintax.one('.do-value'),
        toValue = anijsDinamicallySintax.one('.to-value'),
        anijsHighlightDinamically = Y.one('.anijs-highlight-dinamically'),
        doHighLValue = anijsHighlightDinamically.one('.do-value'),
        toHighLValue = anijsHighlightDinamically.one('.to-value');
    baseNode.delegate('click', function(e){
        var currentSquareIndex = parseInt(e.currentTarget.getAttribute('data-id'));
        doValue.set('innerHTML', behaviorSquares[currentSquareIndex].do);
        toValue.set('innerHTML', behaviorSquares[currentSquareIndex].to);
        doHighLValue.set('innerHTML', behaviorSquares[currentSquareIndex].do);
        toHighLValue.set('innerHTML', behaviorSquares[currentSquareIndex].to);
    }, '.demo-square');

    // baseNode.appendChild(squareCollectionHTML);
    AniJS.run();

});
