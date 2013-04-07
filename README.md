Blackboard Entity for impactJS

This is a simple rather limited means to draw text on the screen.  My game
requires text description during the tutorial phases so this was my
solution to that.

The limitations are primarily that the "writing" area is limited at design
time.  You have a fixed blackboard on which to write.  You input as a 
weltmeister parameter "text" containing your full text.  The entity will
reflow the text to fit the blackboard.

Tunable parameters of the entity:

rectHeight, rectWidth - the billboard size
billboardFrame - white frame around black billboard
textFooter - I use this to tell user how to remove pause and billboard
fontString - css style font string.  default "14px Courier
textPadding - space between text and inner edge of rectanagle
textLeading - space between lines of text

I'd change these in the javascript entity as I can't imagine you'll vary 
them over the game's life.  If I'm wrong, then connect them to settings :D


To use:

1) Add the lines from this project's main.js into your own main.js.  For
the update function, it is important that the billboard code come in right
at the beginning as its purpose is to stop all other events from happening
while we've got our billboard up (and blocking).  I commented up the
main.js pretty heavily with more details.

2) Drop an EntityTrigger at the point where you want a player's presence to
kick off a blackboard.  This trigger is an entity from the sample code that
comes with impactJS.

3) Drop an EntityBlackboardst anywhere on the level.  (I may have noticed
some odd interactions with overlapping on other Entities, so you might want
to move it all the way to the edge -- more experimentation may be required
on this point).  Set the name of the Blackboardst using the entity
settings.  We'll call it "bb_example1".  Also set the text.1... as needed.

4) Click back to the trigger.  Set target.1 for this entity and give it the
same name as your blackboard, "bb_example1".  You should see a line
connecting the two entities now.


That should be it.  You may have to tune your text (and possibly your
billboard graphic) to work properly.  There's probably some programmatic
way to have a couple of different sizes of graphic work with various
lengths of text, but I haven't needed it (yet).
