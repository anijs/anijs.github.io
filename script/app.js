YUI().use('node-base', 'node-event-delegate', 'autocomplete', 'autocomplete-highlighters','autocomplete-filters', 'transition', function(Y) {
    

    //Setting default class adding when anim
    AniJS.setClassNamesWhenAnim('animated');

    //Obtain AniJS default helper
    var AniJSDefaultHelper = AniJS.getHelper();

    //Put this function into the helper
    AniJSDefaultHelper.validateCommandExecution = function(e, animationContext){
        var event = Y.one('#demoif').get('value'),
            eventTarget = Y.one('#demoon').get('value') || '#demoon',
            behaviorTarget = Y.one('#demoto').get('value') || '#demoto',
            behavior = Y.one('#demodo').get('value'),
            successMessage = 'Animation setting up good!!! </br>' +
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

});
