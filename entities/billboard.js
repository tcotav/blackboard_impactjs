/*

Entity in center of screen 

Keys for Weltmeister:

name -- used by trigger to invoke
text.1, text.2, text.3 -- text to be written to billboard

*/

ig.module(
	'game.entities.billboard'
)
.requires(
	'impact.entity'
)
.defines(function(){
    EntityBillboard = ig.Entity.extend({
        size: {x: 150, y: 64},
        name: "billboard",
        textlist:[],

		animSheet: new ig.AnimationSheet("media/blackboard.png", 150, 64),
        init: function(x,y,settings) {
			// Add animations for the animation sheet from
            // Weltmeister settings
            if(settings.text) {
                this.textlist = settings.text;
            }
			this.addAnim("blank", 1, [0]);
            this.parent(x,y,settings);
        },
       draw: function(){
            this.parent();
            var offset=0;
            var ddrawX = this.pos.x - ig.game.screen.x + this.size.x/2;
            var ddrawY = this.pos.y - ig.game.screen.y + 10;
            for (x in this.textlist) {
                ig.game.font.draw( this.textlist[x], 
                    ddrawX, ddrawY+offset, 
                    ig.Font.ALIGN.CENTER );
                offset=offset+10;
            }
            // hardcoded for now/simplicity
            ig.game.font.draw( "[space] to continue",
                ddrawX, ddrawY+offset + 15, 
                ig.Font.ALIGN.CENTER );

            // flip this boolean in game -- this pauses all activity
            ig.game.fBillboardPause = true;

            // if you want music to pause too -- uncomment below (or 
            // add flags
            //
            // ig.music.pause();
        }
    });

});
