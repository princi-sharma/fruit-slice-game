let playing=false
let score
let trialLeft
let steps
let action
let fruits=["apple","banana","berry","cherries","grapes","mango","orange","peach","pear","pineapple","watermelon"]
$(()=>
{
    // click on start/reset button
    $("#start-reset").click(()=>
    {
        // if we are playing
        if(playing)
        {
            // reload the page
            location.reload()
            playing==false
        }
        else
        {
            // if we are not playing
            // hide the game over box
            $("#game-over").hide()
            // change the text to reset game
            $("#start-reset").html("Reset Game")
            // start playing game
            playing=true
            // score initialize to 0
            score=0
            $("#score-value").html(score)
            // show the trial or life left
            $("#trialLeft").show()
            // setting initial trial value
            trialLeft=3
            // adding trial hearts
            addHearts()
            // start sending fruits
            startAction()
        }
    })
    function addHearts()
    {
        // clear hearts
        $("#trialLeft").empty()
        // fill with hearts
        for(let i=0;i<trialLeft;i++)
        {
            $("#trialLeft").append('<img src="images/heart.png" class="heart">')
        }
    }
    // start sending fruits
    function startAction()
    {
        // generate fruits
        $("#fruits").show()
        // generate random fruits
        chooseFruit()
        // random position
        $("#fruits").css({"left":Math.round(650*Math.random()),"top":-50})
        // generate steps
        steps = 1 + Math.round(5*Math.random())
        // move fruit down by steps every 10 mili seconds
        action=setInterval(()=>
        {
            $("#fruits").css("top", $("#fruits").position().top + steps)
            // to check that fruit is too slow
            if($("#fruits").position().top > $("#fruitContainer").height())
            {
                // to check we have life left
                if(trialLeft > 1)
                {
                    $("#fruits").show()
                    chooseFruit()
                    $("#fruits").css({"left":Math.round(650 * Math.random()),"top":-50})
                    steps = 1 + Math.round(5 * Math.random())
                    // reduce the life or trial
                    trialLeft--
                    // populate hearts
                    addHearts()
                }
                else  // game over
                {
                    playing=false
                    // we are not playing
                    $("#start-reset").html("Start Game")
                    $("#game-over").show()
                    $("#game-over").html("<p>Game Over !</p><p >Your Score is " + score + "</p>")
                    // hide the trial or life left
                    $("#trialLeft").hide()
                    stopAction()
                }
            }
        },10)
    }
    // generate random fruit
    function chooseFruit()
    {
        let rand=fruits[Math.round(7*Math.random())]
        $("#fruits").attr("src","images/" + rand + ".png")
    }
    function stopAction()
    {
        clearInterval(action)
        // hide the fruits
        $("#fruits").hide()
    }
    // slice the fruits
    $("#fruits").mouseover(()=>
    {
        // increase the score by 1
        score++
        // update score value
        $("#score-value").html(score)
        // play the sound
        $("#sliceSound")[0].play()
        // stop fruit
        clearInterval(action)
        // hide fruit and animate
        $("#fruits").hide("explode",200)
        // send new fruit
        setTimeout(startAction,400)
    })
})