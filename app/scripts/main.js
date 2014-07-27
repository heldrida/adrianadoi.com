/*global AdrianadoiCom, $*/

'use strict';

window.AdrianadoiCom = {

    cached: {},

    Models: {},

    Collections: {},

    Views: {

        MenuView: Backbone.View.extend({

            el: '#menu',

            events: {},

            initialize: function(){

                this.render();

            },

            render: function(){
                
                return this;

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

    AdrianadoiCom.init();

});