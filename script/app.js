YUI().use('node-base', 'node-event-delegate', 'autocomplete', 'autocomplete-highlighters','autocomplete-filters', 'transition', function(Y) {
    

    // This just makes sure that the href="#" attached to the <a> elements
    // don't scroll you back up the page.
    Y.one('body').delegate('click', function(e) {
        e.preventDefault();
    }, 'a[href="#"]');


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

    //Autocomplete
    var autocompleSources = APP_CONFIG.autoCompleteSources;

    Y.one('#demoif').plug(Y.Plugin.AutoComplete, {
        resultHighlighter: 'phraseMatch',
        resultFilters: 'phraseMatch',
        activateFirstItem: true,
        source: autocompleSources.if
    });

    //Autocomplete
    Y.one('#demoon').plug(Y.Plugin.AutoComplete, {
        resultHighlighter: 'phraseMatch',
        resultFilters: 'phraseMatch',
        activateFirstItem: true,
        source: autocompleSources.on
    });

    //Autocomplete
    Y.one('#demoto').plug(Y.Plugin.AutoComplete, {
        resultHighlighter: 'phraseMatch',
        resultFilters: 'phraseMatch',
        activateFirstItem: true,
        source: autocompleSources.on
    });

    //Autocomplete
    Y.one('#demodo').plug(Y.Plugin.AutoComplete, {
        resultHighlighter: 'phraseMatch',
        resultFilters: 'phraseMatch',
        activateFirstItem: true,
        source: autocompleSources.do
    });

    AniJS.getHelper().validateCommandExecution = function(e, animationContext){
        console.log('ejecutando funciones de retorno');
        var event = Y.one('#demoif').get('value'),
            eventTarget = Y.one('#demoon').get('value') || '#demoon',
            behaviorTarget = Y.one('#demoto').get('value') || '#demoto',
            behavior = Y.one('#demodo').get('value');

        //TODO: Might be necessary to valid the fields
        
        //Clear the trigered event in every launch
        AniJS.purge(eventTarget);


        AniJS.createAnimation([{
            event: event,
            eventTarget: eventTarget,
            behaviorTarget: behaviorTarget,
            behavior: behavior,
            after: 'removeAnim'
        }]);
        console.log(e);

        console.log(animationContext);
        animationContext.run();
        
    };

});
