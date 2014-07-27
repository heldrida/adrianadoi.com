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

            open: function( event ){

                console.log('open: ' + $(event.currentTarget).text() );

            },

            render: function(){
                
                return this;

            }

        }),

        AboutView: Backbone.View.extend({

            render: function(){

                var template = _.template( $('#aboutView').html(), {} );

                console.log( template );

                this.$el.html( template );

                return this;

            },

            initialize: function(){

                this.render();

            }

        })

    },

    Routers: {

        Router: Backbone.Router.extend({

            routes: {

                'about': 'about'

            },

            defaultRoute: function() {},

            initialize: function(){

                this.$content = $('#content');
                this.$main = $('#main');

            },

            about: function(){

                if ( typeof AdrianadoiCom.cached.aboutView === 'undefined' || !AdrianadoiCom.cached.aboutView ){

                    AdrianadoiCom.cached.aboutView = new AdrianadoiCom.Views.AboutView();

                }

                this.$main.html( AdrianadoiCom.cached.aboutView.el );

            }

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