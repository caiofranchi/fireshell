/**
 * User: cfranchi
 * Date: 04/11/13
 * Time: 17:19
 */
var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
            || this.searchVersion(navigator.appVersion)
            || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i=0;i<data.length;i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
    dataBrowser: [
        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
        {
            string: navigator.userAgent,
            subString: "CriOS",
            identity: "Chrome"
        },
        {   string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        },
        {
            prop: window.opera,
            identity: "Opera"
        },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        },
        {   // for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
        {     // for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
    ],
    dataOS : [
        {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        },
        {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone/iPod"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }
    ]

};
BrowserDetect.init();
$('html').addClass( BrowserDetect.browser );

// Mobile Tablet helpers
var isMobile = false;
var isTablet = false;
var userAgent = navigator.userAgent;

if ( (userAgent.indexOf('iPhone') !== -1) || (userAgent.indexOf('Android') !== -1 && userAgent.indexOf('Mobile') !== -1 ))  {
    $('html').addClass('mobile');
    isMobile = true;
} else if (userAgent.indexOf('iPad') !== -1 || userAgent.indexOf('Android') !== -1) {
    $('html').addClass('tablet');
    isTablet = true;
}

if ( userAgent.indexOf('Android') !== -1 )
    $('html').addClass('android');

// Portrait or Landscape
function onOrientationChange() {
    if (window.orientation === -90 || window.orientation === 90)
        $('html').addClass('landscape').removeClass('portrait');
    else
        $('html').addClass('portrait').removeClass('landscape');
}

if (Modernizr.touch) {
    window.addEventListener("orientationchange", function() {
        onOrientationChange();
    }, false);

    onOrientationChange();
}


// BASIC POLYFILLS

var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
        || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };

/* TRACKING */

Tracker = {

    init: function() {
        $('[data-track-act]').click(function(){
            Tracker.pushState($(this).data('track-act'), $(this).data('track-cat'), $(this).data('track-type'));
        });

    },

    pushState: function( _act, _cat, _type) {

        var cat = (!_cat ? "site" : _cat) + "_" + $("body").attr('class');
        var opt_label, opt_value, opt_noninteraction = "";


        if (_type === "view")
        {
//            _gaq.push(['_trackPageview', _act]);
                ga('send', 'pageview',_act);
        }
        else
        {
//            _gaq.push(['_trackEvent', cat, _act, opt_label, opt_value, opt_noninteraction]);
            ga('send', 'event', cat, _act, opt_label,opt_value);
        }
    }

};
