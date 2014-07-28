/*global AdrianadoiCom, $*/

'use strict';

window.AdrianadoiCom = {

    cached: {},

    Models: {},

    Collections: {},

    Views: {

        MenuView: Backbone.View.extend({

            el: '#menu',

            events: {

                'click li': 'open'

            },

            initialize: function(){

                this.render();

            },

            render: function(){
                
                return this;

            },

            open: function(event){
                
                event.preventDefault();

                window.location.href = $(event.currentTarget).children('.hash').attr('data-hash');

            }

        }),

        myView: Backbone.View.extend({

            render: function(){

                var template = _.template( $('#' + this.options.viewName + 'View').html(), {} );

                this.$el.html( template );

                return this;

            },

            initialize: function(options){

                this.options = options;
                this.render();

            }

        })

    },

    Routers: {

        Router: Backbone.Router.extend({

            routes: {

                ':param': 'openSection'

            },

            defaultRoute: function() {},

            initialize: function(){

                this.$content = $('#content');
                this.$main = $('#main');

            },

            openSection: function(viewName){
                
                console.log(viewName);

                if ( typeof AdrianadoiCom.cached[ viewName + 'View' ] === 'undefined' || !AdrianadoiCom.cached[ viewName + 'View' ] ){

                    AdrianadoiCom.cached[ viewName + 'View' ] = new AdrianadoiCom.Views.myView({ viewName: viewName });

                }

                this.$main.html( AdrianadoiCom.cached[ viewName + 'View' ].el );

            },

        })

    },

    init: function () {

        new AdrianadoiCom.Views.MenuView();
        new AdrianadoiCom.Routers.Router();

        Backbone.history.start();

    }

};

$(document).ready(function () {

    var $loader = $('#loader');
    var $spinner = $('.spinner');
    var imagesLoaded = window.imagesLoaded || false;
    var transitionend = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';
    
    if ( imagesLoaded ){

        var imgLoad = imagesLoaded( document.querySelector('body img') );

        imgLoad.on('always', function(){
            console.log('imgLoad always event!');
        });

        imgLoad.on('done', function(){

            console.log('imgLoad done event!');

            // allways delay at least 3s
            setTimeout(function(){

                // trigger fadeout anim
                $spinner.addClass('animation-go-up');

                $spinner.one(transitionend, function(event){

                    if (event.propertyName === 'top') {

                        $loader.addClass('animation-fade-out');

                        $loader.one(transitionend, function(){

                            $loader.hide();

                        });

                        AdrianadoiCom.init();

                    }

                });


            }, 3000);

        });

        imgLoad.on( 'progress', function( instance, image ) {

            var result = image.isLoaded ? 'loaded' : 'broken';
            console.log( 'image is ' + result + ' for ' + image.img.src );
        
        });

    }

});