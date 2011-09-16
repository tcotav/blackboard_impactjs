/*

Static (invisible) entity only used to spawn EntityBillboard via EntityTrigger.

Keys for Weltmeister:

name -- used by trigger to invoke
text.1, text.2, text.3 -- text to be written to billboard

*/

ig.module(
	'game.entities.billboardst'
)
.requires(
	'impact.entity',
	'game.entities.billboard'
)
.defines(function(){
    EntityBillboardst = ig.Entity.extend({
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(0, 0, 255, 0.7)',
        size: {x: 150, y: 64},
        name: null,
        settings:null,

        init: function(x,y,settings) {
            this.name = settings.name;
            this.settings = settings;
            this.parent(x,y,settings);
        },
        triggeredBy: function( entity, trigger ) {
            // pretty much all here for this
            ig.game.spawnEntity(EntityBillboard, 
                ig.game.screen.x + ig.system.width/2 - this.size.x/2,
                ig.game.screen.y + ig.system.height/2 - this.size.y/2,
                this.settings);
        },
        update: function(){}
    });

});
