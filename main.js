/* include main to show how we pause EVERYTHING in game when the billboard is up */
ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    /* I use Dominic's sample trigger code here */
	"game.entities.trigger",
	"game.entities.billboard",
	"game.entities.billboardst",
)
.defines(function(){

MyGame = ig.Game.extend({

    fBillboardPause: false,

	init: function() {
	    ig.input.bind( ig.KEY.SPACE, 'space' );
	},
	
	update: function() {
        /*
            if we've toggled the boolean for Pause
            AND we're pressing the billboard close button then we 
            can clear the billboard.

            Here, I make multiple use of "space" key -- it also is 
            player "fire" button.
        */
        if(this.fBillboardPause && ig.input.state("space")) {
            // get our billboard
            var ent = ig.game.getEntitiesByType(EntityBillboard)[0];
            if(ent == undefined ){
                // catch this if we somehow get a space bar press
                // before boolean flag is toggled BACK 
                console.log("billboard kill: ent undefined")
                return;
            };
           
            // destroy the entity
            ent.kill(); 
            // reset the flag
            this.fBillboardPause=false;

            // if you have a flag for music, wrap this with it 
            // assuming you want to toggle music
            //
            //ig.music.play();
        }

        /* 
            this next line catches the update loop while the billboard is 
            up on the screen.  If this weren't here, baddies would continue
            assault on player UNDER the billboard.  Effectively, this is 
            a Pause GAME.
        */
        if(this.fBillboardPause) { return;}
        this.parent();
	},
});

ig.main( '#canvas', MyGame, 60, 220, 200, 2 );

});
