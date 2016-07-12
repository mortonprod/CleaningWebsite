///Class to create animation.
var cleanAni = (function () {
    var sqrList = [];
    var edgeList = []; 
    var imageLoc = "/images/broom_crop.png";
    var classMud = "mud";
    var classSqr = "sqr";
    var classSweep = "sweep";
    var classExpose = "exposeMe";
    var classHide = "hideMe";
    var classWhite = "whiteSqr";
    var classBlack = "blackSqr";
    var classFoundation = "foundation";
    var classAnimation = "animation";
    var classWriting = "writing";
    var classText = "text"
    var num = 10;
    ///This is the fraction of time between the animation and the writing.
    var timeAnim = 5000;
    var timeWrit = 3000;
    var foundation, anim, writ, boxWidth, boxHeight, oImg, dirtySqr, htmlMaster, xDiv,yDiv;
    ///Called once resizing event done. Need to recompute some values and then re-run.
    var doneResizing = function () {
        boxWidth = $(anim).width() / xDiv;
        boxHeight = $(anim).height() / yDiv;
        angular.forEach(sqrList, function (sqr) {
            $(sqr).width(boxWidth).height(boxHeight);
        });
        //Must set to true to stop all animations in the queue.
        $(oImg).velocity('stop',true);
        updateElPos(dirtySqr);
        cleanFloorAnimation();
    }
    ///Create the base elements to attach everything to.
    var createDivEl = function() {
        foundation = document.createElement("div");
        anim = document.createElement("div");
        writ = document.createElement("div");
        foundation.classList.add(classFoundation);
        anim.classList.add(classAnimation);
        writ.classList.add(classWriting);
        $(foundation).append(anim);
        $(foundation).append(writ);
        $(htmlMaster).prepend(foundation);
    }
    ///Create all blocks to attach to animation. Also store the blocks which make up the edge of screen.
    var createBlocks = function () {
        for (i = 0; i < xDiv ; i++) {
            for (j = 0; j < yDiv ; j++) {
                if (i == 0 || j == 0 || i == (xDiv - 1) || j == (yDiv - 1)) {
                    edgeList.push(true);
                } else {
                    edgeList.push(false);
                }
                if ((j + i) % 2 == 0) {
                    //TODO: Must use this even though inside function which acting as class.
                    createSingleBlock(classBlack);
                } else {
                    createSingleBlock(classWhite);
                }
            }
        }
    }
    ///Create a single div block with a mud block attached.
    var createSingleBlock = function (className) {
        var sqr = document.createElement("div");
        var mud = document.createElement("div");
        mud.classList.add(classMud);
        $(sqr).append(mud);
        $(sqr).width(boxWidth).height(boxHeight);
        sqr.classList.add(classSqr);
        sqr.classList.add(className);
        $(anim).append(sqr);
        sqrList.push(sqr);
    }
    ///Create an array of positions.
    var getPosAndEl = function () {
        list = [];
        $(sqrList).each(function (idx, el) {
            var left = $(el).offset().left + ($(el).width() / 2);
            var top = $(el).offset().top + ($(el).height() / 2);
            list.push([top, left, el]);
        });
        return list;
    }
    ///Pick random elements which are not on the edge.
    var getRandEl = function () {
        list = [];
        for (i = 0; i < num ; i++) {
            var randNum = Math.floor(Math.random() * sqrList.length);
            if (edgeList[randNum]) {
                num= num + 1;
                continue;
            }
            var el = sqrList[randNum];
            var left = $(el).offset().left + ($(el).width() / 2 - 100)
            var top = $(el).offset().top + ($(el).height() / 2 - 200)
            list.push([top, left, el]);

        }
        return list;
    }
    ///Update positions if resized window.
    var updateElPos = function (list) {
        for (i = 0; i < list.length ; i++) {
            var left = $(list[i][2]).offset().left + ($(list[i][2]).width() / 2 - 100)
            var top = $(list[i][2]).offset().top + ($(list[i][2]).height() / 2 - 200)
            list[i][0] = top;
            list[i][1] = left;
        }
    }
    var textExpose = function(){
        var args = ["Clement Cleaning"];
        setTimeout(function () {
            var para = document.createElement("p");
            para.classList.add(classExpose, classText);
            for (i = 0; i < args.length; i++) {
                para.appendChild(document.createTextNode(args[i]));
                para.appendChild(document.createElement("br"));
            }
            $(writ).append(para);
        }, timeWrit);
        setTimeout(function () {
            $(foundation).fadeOut(1000);
        }, timeWrit+2000);
        ///TODO:Need to hide all other objects in div and then expose one by one.
        setTimeout(function () {
            $(foundation).remove();
            exposeChildren();
        }, timeWrit + 3000);
    }
    ///Cleaning animation which will return a promise to continue the rest of the animation.
    ///Need to keep checking for resize event during execution.
    var cleanFloorAnimation = function () {
        var singleSweep = (timeAnim) / num;
        angular.forEach(dirtySqr, function (el, idx) {
            $(oImg).velocity({ left: el[1], top: el[0] }, {
                duration: singleSweep, complete: function () {
                    ///Once cleaned remove element from list of dirty squares.
                    ///So we don't clean the old squares on resize event.
                    el[2].childNodes[0].classList.add(classHide);
                    dirtySqr.splice(idx, 1);
                }
            });
            var resizeID; //Variable to return timeout object.
            $(window).on('resize', function (e) {
                clearTimeout(resizeID);//stop execution of doneResizing
                resizeID = setTimeout(doneResizing, 500);///The call function after 500ms if not resize event called again.
            });
        });
        return $.Deferred().promise();
    }
    ///Expose element using css animation.
    var expose = function (list) {
        $(list).each(function (idx, el) {
            el[2].childNodes[0].classList.add("exposeMe");
        });
    }
    ///Hide all child elements BEFORE you add the animation over input element div. 
    var hideChildren = function(){
        $("#mainNav").hide();
    }
    ///Expose all child element one by one. Must remove animation so not to expose this again. 
    var exposeChildren = function () {
        $("#mainNav").fadeIn(1000);
    }
    ///Function to run animation class.
    /// @param domElement the dom element to create the animation over.
    /// @param xDiv the divisions in the x direction for grid.
    /// @param xDiv the divisions in the y direction for grid.
    /// @param time the duration of the full animation.
    var run = function (htmlMasterIn, xDivIn, yDivIn) {
        //TODO:Is there a better way to initialize these variables.
        htmlMaster = htmlMasterIn;
        xDiv = xDivIn;
        yDiv = yDivIn;
        hideChildren();
        createDivEl();
        boxWidth = $(anim).width() / xDiv;
        boxHeight = $(anim).height() / yDiv;
        createBlocks();
        oImg = document.createElement("img");
        oImg.src = imageLoc;
        oImg.classList.add(classSweep);
        $(anim).append(oImg);
        oImg.setAttribute('alt', 'no broom');
        dirtySqr = getRandEl();
        expose(dirtySqr);
        cleanFloorAnimation().done(textExpose());
    }

    return {
        run:run,
        animate:cleanFloorAnimation
    };
})();

$(document).ready(function () {
    cleanAni.run(document.body, 10, 10);
});
