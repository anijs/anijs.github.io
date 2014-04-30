YUI().use('node-base', 'node-event-delegate', 'autocomplete', 'autocomplete-highlighters','autocomplete-filters', 'transition', function(Y) {
    

    // This just makes sure that the href="#" attached to the <a> elements
    // don't scroll you back up the page.
    Y.one('body').delegate('click', function(e) {
        e.preventDefault();
    }, 'a[href="#"]');


    //Nav responsive behavior
        
        // Append the mobile icon nav
        
        Y.one('.nav').appendChild('<div class="nav-mobile" data-anijs="when: click, what: .nav-list li, how: bounceIn"></div>');

        Y.one('.nav-mobile').on('click', function(e){
            Y.one('.nav-list').toggleView();
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

    Y.one('#demowhen').plug(Y.Plugin.AutoComplete, {
        resultHighlighter: 'phraseMatch',
        resultFilters: 'phraseMatch',
        activateFirstItem: true,
        source: autocompleSources.when
    });

    //Autocomplete
    Y.one('#demowhere').plug(Y.Plugin.AutoComplete, {
        resultHighlighter: 'phraseMatch',
        resultFilters: 'phraseMatch',
        activateFirstItem: true,
        source: autocompleSources.where
    });

    //Autocomplete
    Y.one('#demowhat').plug(Y.Plugin.AutoComplete, {
        resultHighlighter: 'phraseMatch',
        resultFilters: 'phraseMatch',
        activateFirstItem: true,
        source: autocompleSources.where
    });

    //Autocomplete
    Y.one('#demohow').plug(Y.Plugin.AutoComplete, {
        resultHighlighter: 'phraseMatch',
        resultFilters: 'phraseMatch',
        activateFirstItem: true,
        source: autocompleSources.how
    });

    AniJS.getHelper().validateCommandExecution = function(e, animationContext){
        console.log('ejecutando funciones de retorno');
        var when = Y.one('#demowhen').get('value'),
            where = Y.one('#demowhere').get('value'),
            what = Y.one('#demowhat').get('value'),
            how = Y.one('#demohow').get('value');

        //TODO: Might be necessary to valid the fields

        //Clear the trigered event in every launch
        AniJS.purge(where);


        AniJS.createAnimation([{
            when: when,
            where: where,
            what: what,
            how: how
        }]);
        console.log(e);
        animationContext.run();
        
    };

    AniJS.run();

    // Y.one('#demotryit').on('click', function(e) {
    //     // var when = Y.one('#demowhen').get('value') || 'click',
    //     //     where = Y.one('#demowhere').get('value') || '.navbar',
    //     //     what = Y.one('#demowhat').get('value') || '#tryit',
    //     //     how = Y.one('#demohow').get('value') || 'bounceIn';

    //     // //TODO: Might be necessary to valid the fields

    //     // //Clear the trigered event in every launch
    //     // AniJS.purge(where);


    //     // AniJS.createAnimation([{
    //     //     when: when,
    //     //     where: where,
    //     //     what: what,
    //     //     how: how
    //     // }]);

    //     // //Ver que se pueda pasar una function en el callback en vez de un id

    //     // e.currentTarget.set('innerHTML', 'Ready');



    //     //e.currentTarget.fire('ready');
        

    //     // var event = new Event('build');

    //     // // Listen for the event.
    //     // Y.one('.navbar').getDOMNode().addEventListener('build', function (e) {
    //     //     console.log('listening');
    //     // }, false);

    //     // // Dispatch the event.
    //     // Y.one('.navbar').getDOMNode().dispatchEvent(event);
        



    //     // Y.one('.navbar').getDOMNode().dispatchEvent(event);


    //     // document.addEventListener('redblue', function(){
    //     //     console.log('I heart you');
    //     // });
    //     // Dispatch/Trigger/Fire the event
    //     //e.currentTarget.getDOMNode().dispatchEvent(event);
    // });

});
