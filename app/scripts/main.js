/*global AdrianadoiCom, $*/

'use strict';

window.AdrianadoiCom = {

    Models: {},

    Collections: {},

    Views: {

        MenuView: Backbone.View.extend({

            el: '#menu',

            events: {

                'click li': 'open'

            },

            initialize: function(){

                console.log('foo');

                this.render();

            },

            open: function( event ){

                console.log('open: ' + $(event.currentTarget).text() );

            },

            render: function(){
                
                return this;

            }

        }),

        HomeView: Backbone.View.extend({

            render: function(){

                var template = _.template( $('#homeView').html(), {} );

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

                'home': 'home'

            },

            defaultRoute: function() {

                //this.home();

            },

            initialize: function(){

                this.$content = $('#content');

            },

            home: function(){

                var template = new AdrianadoiCom.Views.HomeView();

                this.$content.html( template.el );

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