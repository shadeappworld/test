$("#control_sources").click(function() {
    return "none" == $("#sources").css("display") ? $("#sources").slideDown() : $("#sources").slideUp(),
        !1
}),
$("#sources a").click(function() {
    var e = parseInt($("#control_sources span").html());
    return "disabled" == $(this).attr("class") ? ($(this).attr("class", "enabled"), $("#control_sources span").html(e + 1)) : "enabled" == $(this).attr("class") && ($(this).attr("class", "disabled"), $("#control_sources span").html(e - 1)),
        !1
});
var api_file = [],
    j = 0;
function _setEmpty() {
    last = "",
        j = 0,
        $("#suggestions").html("").hide()
}
function update(e, t) {
    switch (e) {
        case "select":
            $("#suggestions #s_" + t).css("background-color", "#f0f0f0").css("font-weight", 600);
            break;
        case "deselect":
            $("#suggestions #s_" + t).css("background-color", "#ffffff").css("font-weight", 400);
            break;
        case "input":
            $("#query").val(t)
    }
}
function usingjson(e) {
    return JSON.parse(e)
}
function show_lang(){
    $("#menu-lang").toggle();
}
$(document).on("keyup", "#query",
    function(e) {
        var t = e.keyCode || e.which,
            a = [],
            i = $.trim($(this).val());
        return 13 != t && (i.length < 1 || 0 < i.indexOf("youtube.com/") || 0 < i.indexOf("youtu.be/") ? (_setEmpty(), !1) : (38 != t && 40 != t && $.ajax({
            url: "https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=" + i,
            dataType: "jsonp",
            success: function(e) {
                e = e.toString().split(",");
                var t = 1;
                $.each(e,
                    function(e, o) {
                        0 < (o = $.trim(o)).length && o != i && !$.isNumeric(o) && -1 == $.inArray(o, a) && "[object object]" != o.toLowerCase() && (a.push('<span id="s_' + t + '">' + o + "</span>"), t++)
                    }),
                    0 < a.length ? $("#suggestions").html(a).show() : _setEmpty()
            }
        }), void window.setTimeout(function() {
                var e = $("#suggestions span").length;
                40 == t ? (j < 1 ? j = 1 : (update("deselect", j), j < e ? j++:j = 0), 0 < j ? (update("select", j), update("input", $("#suggestions #s_" + j).html())) : update("input", last)) : 38 == t ? (j < 1 ? j = e: (update("deselect", j), 0 < j && j--), 0 < j ? (update("select", j), update("input", $("#suggestions #s_" + j).html())) : update("input", last)) : last = i
            },
            100)))
    }),
$(document).on("keypress", "#query",
    function(e) {
        var t = e.which || e.keyCode;
        8 != t && 32 != t && 39 != t || (j = 0)
    }),
$(document).on("mouseover", "#suggestions span",
    function() {
        var e = $(this).attr("id").split("_")[1];
        0 < j && update("deselect", j),
            update("select", e),
            j = parseInt(e)
    }),
$(document).on("click", "#suggestions span",
    function() {
        update("input", $("#suggestions #s_" + j).html()),
            $("form").submit()
    }),
$(document).on("submit", "form",
    function() {
        return _setEmpty(),
            function() {
                $("#results").remove(),
                    $("#error").remove(),
                    result = {},
                    n = "";
                var e = $.trim($("#query").val().replace(/\s{2,}/g, " "));
                if (e.length < 1 || "please enter a valid artist name or song name" == e.toLowerCase()) return $("#query").val("Please enter a valid artist name or song name");
                var t = function(e) {
                    if ( - 1 < e.indexOf("youtube.com/")) var t = !!(t = /v=[a-zA-Z0-9\-_]{11}/.exec(e)) && t.toString().substr(2);
                    else - 1 < e.indexOf("youtu.be/") && (t = !!(t = /\/[a-zA-Z0-9\-_]{11}/.exec(e)) && t.toString().substr(1));
                    return t
                } (e);
                if (t) {

                    $("#load").show();
                    $("#result_box").hide();
                    $("#mainfrm").attr('src','/convert-all?url=https://www.youtube.com/watch?v='+t);
                    setTimeout(function () {
                        $("#result_box").show();
                        $("#load").hide();
                    },1000);

                } else {

                    if(e.indexOf('http')!==-1){
                        console.log('other');
                        $("#load").show();
                        $("#result_box").hide();
                        $("#mainfrm").attr('src','/convert-all?url='+e);
                        setTimeout(function () {
                            $("#result_box").show();
                            $("#load").hide();
                        },1500);

                    }else{

                        $("#load").show();
                        $("#result_box").hide();
                        a = "";
                        $.ajax({
                            url: "/grab/json.php",
                            data: {
                                q: e.replace(/\s_/g, "_")
                            },
                            dataType: "json",
                            success: function(e) {
                                var t = e.items,
                                    o = e.query;
                                if ($("#load").hide(), 0 < t.length) {
                                    for (i = 0; i < t.length; i++) a = a + '<div id="result_' + i + '" class="result"> <div class="name">' + t[i].title + '</div> <div class="properties">Source: YouTube • Channel: ' + t[i].channel + ' • Bitrate: 192 kbps</div> <div class="options"><a data-down="' + t[i].id + '" data-title="' + t[i].title + '" href="#" rel="nofollow" target="_self" class="download">Download</a><a data-play="' + t[i].id + '" href="#" rel="nofollow" class="player">Play</a></div> </div>',
                                        i++;
                                    $("#text").before('<div id="results"><p>Here you can find all search results for your search query &bdquo;{Q}&rdquo;. We\'ve found {C} matching results. Now you have the opportunity to listen to each result before downloading it. If you wish to do so, click on the &bdquo;Play&rdquo; button.</p>{R}</div>'.replace(/{Q}/, o).replace(/{C}/, t.length).replace(/{R}/, a))
                                } else $("#text").before('<div id="error">' + t + "</div>");
                                $("html, body").animate({
                                    scrollTop: $("form").offset().top
                                })
                            }
                        });
                    }



                }
            } (),
            !1
}),
$(document).ready(function() {
    $("#clicksearch").click(function(e) {
        e.preventDefault();
        var t = $(".valku").val();
        console.log("Search " + t)
    }),
    $(document).on("click", ".download",
        function(e) {
            var t = $(this).data("down"),
                a = $(this).data("title");
            console.log(t),
                "Download" == $(this).text() ? ($(this).text("Close"), $(this).parent().parent().after('<div id="initiaze-' + t + '" class="file margin">Initiliazing downloader <i class="fa fa-cog fa-spin"></i></div>'), setTimeout(function() {
                        $("#initiaze-" + t).html('\n\n    <div id="download" class="file margin">\n    <div class="name">' + a + '</div><div class="progress">The file is ready. Please click the download button to start the download.</div><hr>\n    <div class="options" style="display: block;">\n    <a href="#" rel="nofollow" data-frame="' + t + '" id="iframeku" class="url">Download MP3</a>\n    <a href="#" rel="nofollow" data-frame="' + t + '" id="iframeku" class="vidurl">Download MP4</a>\n <br>\n\t<a href="https://www.facebook.com/sharer/sharer.php?u=' + window.location.href + '" rel="nofollow" target="_blank">Share on <i class="fa fa-facebook-official"></i></a>\n    <a href="https://twitter.com/intent/tweet?text=' + window.location.href + '" rel="nofollow" target="_blank">Share on <i class="fa fa-twitter"></i></a>\n    </div>\n    ')
                    },
                    500)) : ($("#initiaze-" + t).remove(), $(this).text("Download")),
                e.preventDefault()
        }),
    $(document).on("click", ".player",
        function(e) {
            var t = $(this).data("play");
            console.log(t),
                "Play" == $(this).text() ? ($(this).text("Stop"), $("#player-" + t).remove(), $(this).parent().parent().before('<div id="player-' + t + '" class="file margin">Loading player <i class="fa fa-cog fa-spin"></i></div>'), setTimeout(function() {
                        $("#player-" + t).html('\n    <div id="player"><iframe src="https://www.youtube.com/embed/' + t + '" width="100%" height="315" scrolling="no" frameborder="none" allow="autoplay"></iframe></div>\n    ')
                    },
                    500)) : ($("#player-" + t).remove(), $(this).text("Play")),
                e.preventDefault()
        }),
    $(document).on("click", ".url",
        function(e) {
            var t = $(this).data("frame");
            "Download MP3" == $(this).text() ? ($(this).text("Close"), $(this).parent().parent().prepend('<div class="frameme" id="fra-' + t + '"><iframe class="button-api-frame" src="/convert-mp3?url=https://www.youtube.com/watch?v=' + t + '" width="100%" height="100%" allowtransparency="true" style="border:none"></iframe></div>')) : ($("#fra-" + t).remove(), $("#loader-" + t).remove(), $(this).text("Download MP3")),
                e.preventDefault()
        }),
    $(document).on("click", ".vidurl",
        function(e) {
            var t = $(this).data("frame");
            "Download MP4" == $(this).text() ? ($(this).text("Close"), $(this).parent().parent().prepend('<div class="frameme" id="vfra-' + t + '"><iframe class="button-api-frame" src="/convert-mp4?url=https://www.youtube.com/watch?v=' + t + '" width="100%" height="100%" allowtransparency="true" style="border:none"></iframe></div>')) : ($("#vfra-" + t).remove(), $("#loader-" + t).remove(), $(this).text("Download MP4")),
                e.preventDefault()
        })
});
$(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() > 1000)
            $('div.top').show();
        else
            $('div.top').hide();
    });
    $('div.top').click(function() {
        $('html, body').animate({scrollTop: 0}, 1000);
    });
});