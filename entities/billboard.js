/*

Entity in center of screen 

Keys for Weltmeister:

name -- used by trigger to invoke
text -- written to billboard

*/

ig.module(
	'game.entities.billboard'
)
.requires(
	'impact.entity'
)
.defines(function(){
    EntityBillboard = ig.Entity.extend({
        size: {x: 32, y: 32},
        name: "billboard",

        // size of rectangle
        /* 
            bit of philosophical debate here -- we could make this dynamic 
            such that it changed with text.  I argue that aethetically, we're
            better served with a fixed size.  Dynamic though would just be
            some tweaks to drawing below:  finding area of text first, then 
            drawing rectangles based on that, then drawing text */
        rectHeight: 100,
        rectWidth: 150,

        // difference between white and black frames
        billboardFrame:5,
        text:"",
        textFooter:"press [space] to continue",
        fontString:"12px Courier",
        // extra padding between edge of text and border of rect
        textPadding: 5,

        // space between lines of text
        textLeading: 20, 

        init: function(x,y,settings) {
			// Add animations for the animation sheet from
            // Weltmeister settings
            if(settings.text) {
                this.text = settings.text;
            }
            this.parent(x,y,settings);
        },
        _drawText: function(ctx) {
            // break text string up into words
            var lwords = this.text.split(" ");

            ctx.font = this.fontString;
            
            var currentLine="";
            var linecount=0;
            var lineList=[]

            var maxwidth = this.rectWidth - (this.textPadding *2);
            var maxheight = this.rectHeight - (this.textPadding * 2);
       
            // tick through list of words
            for(x=0; x<lwords.length; x++) {
                // if line + newest word < maxw, then append and continue
                if (ctx.measureText(currentLine + " "+ lwords[x]).width <= maxwidth) {
                    currentLine = currentLine + " " + lwords[x];
                }
                else { // past end of row -- save off and create new row
                    linecount+=1;
                    lineList.push(currentLine);
                    // what if lwords is greater than width????
                    currentLine = lwords[x];
                }
                if(x == lwords.length-1) {
                    lineList.push(currentLine);
                    break;
                }
            }

            if(this.textFooter) {
                lineList.push("");
                lineList.push(this.textFooter);
            }

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            widthDraw=ig.system.realWidth/2;
            ctx.fillStyle="white";

            // need to center text vertically
            totalTextHeight = this.textPadding * 2 
                + this.textLeading * (lineList.length-1);
            startDraw = (ig.system.realHeight - totalTextHeight)/2;
            
            for(var x=0; x< lineList.length; x++) {
                ctx.fillText(lineList[x], widthDraw, startDraw + this.textLeading*x);
            }
       },
       draw: function(){
           // no call to this.parent() -- we're doing all the drawing here
            var ctx = ig.system.context;
           
            var wwidth=this.rectWidth * ig.system.scale; 
            var hheight=this.rectHeight * ig.system.scale;

            var offsetX = ig.system.realWidth/2-wwidth/2;
            var offsetY = ig.system.realHeight/2-hheight/2;

            // first draw the white frame
            ctx.fillStyle="white";
            ctx.fillRect(
                offsetX, 
                offsetY,
                wwidth, hheight);

            // then plop the black drawing area inside of that
            ctx.fillStyle="black";
            ctx.fillRect(
                offsetX + this.billboardFrame, 
                offsetY + this.billboardFrame, 
                wwidth-(this.billboardFrame * 2), 
                hheight-(this.billboardFrame * 2));

            this._drawText(ctx);

            // flip this boolean in game -- this pauses all activity
            ig.game.fBillboardPause = true;

            // if you want music to pause too -- uncomment below (or 
            // add flags
            //
            // ig.music.pause();
        }
    });

});
