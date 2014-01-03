var Reforbit = {
    element: 'content',
    max_nodes: 500,
    new_window: false,
    version: 'igezoPOPUP'
};

Reforbit.doElement = function(elm) {
    var vol = 'i|ii|iii|iv|v|1|2|3|4|5|i.|ii.|iii.|iv.|v.|1.|2.|3.|4.|5.';
    var bok = 'genezis|teremtes|ter|gen|mozes|moz|exodusz|exod|'+
        'jozsue|jozs|birak|bir|ruth|ru|kivonulas|'+
        'samuel|sam|kiraly?|kir|kronikak|kron|ezsdras|ezsd|'+
        'nehemias|neh|eszter|eszt|esz|job|jb|zsoltarok|zsolt|zsoltar|peldabeszedek|peld|'+
        'predikator|pred|enekek eneke|enekek|ezsaias|ezs|esaias|jeremias|'+
        'jer|jeremias siralmai|jersir|jsir|ezekiel|ez|ezek|daniel|dan|hoseas|'+
        'hos|joel|amos|am|abdias|abd|jonas|jon|mikeas|mik|nahum|nah|'+
        'habakkuk|habakuk|hab|habak|sofonias|sof|zofonias|aggeus|haggeus|agg|hag|zakarias|zak|'+
        'malakias|malak|mal|mate|mt|mat|mark|mk|lukacs|luk|lk|janos|jn|jan|'+
        'apostolok cselekedetei|apcsel|roma|rom|korintus|kor|galata|gal|'+
        'efezus|ef|efez|filippi|fil|kolosse|kol|zsidokhoz irott level|'+
        'thessalonika|thesszalonika|thess|thessz|timoteus|tim|titusz|tit|filemon|filem|'+
        'zsid|zsidok|zsido|zsidokhoz irt level|jakab|jak|peter|pt|pet|judas|jud|jelenesek|jelen|'+
        'jel';
    var ver = '\\d+(:\\d+)?(?:\\s?[-&]\\s?\\d+)?';
    var regex = '\\b(?:('+vol+')\\s?)?('+bok+')(.)?\\s?('+ver+'(?:\\s?\\s?,'+
        ver+')*)\\b';
    regex = new RegExp(regex, "m");
    
    var textproc = function(node) {
	strAccents = node.data;
	strAccents = strAccents.split('');
	    strAccentsOut = new Array();
	    strAccentsLen = strAccents.length;
	    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕŐÖØòóőõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚŰÜùúűüÑñŠšŸÿýŽž';
	    var accentsOut = ['A','A','A','A','A','A','a','a','a','a','a','a','O','O','O','O','O','O','O','o','o','o','o','o','o','E','E','E','E','e','e','e','e','e','C','c','D','I','I','I','I','i','i','i','i','U','U','U','U','u','u','u','u','N','n','S','s','Y','y','y','Z','z'];
	    for (var y = 0; y < strAccentsLen; y++) {
	        if (accents.indexOf(strAccents[y]) != -1) {
	            strAccentsOut[y] = accentsOut[accents.indexOf(strAccents[y])];
	        }
	        else
	            strAccentsOut[y] = strAccents[y];
	    }
	    tomatch = strAccentsOut.join('');
        var match = regex.exec(tomatch.toLowerCase());
        if (match) {
            var val = match[0];
            var node2 = node.splitText(match.index);
            var node3 = node2.splitText(val.length);
            var anchor = node.ownerDocument.createElement('A');
            anchor.setAttribute('href', '#');
            anchor.onclick = Reforbit.onclick;
            anchor.onmouseover = Reforbit.onmouseover;

            node.parentNode.replaceChild(anchor, node2);
            anchor.className = 'igehely';
            anchor.appendChild(node2);
            return anchor;
        } else {
            return node;
        }
    };

    __traverseDOM(elm.childNodes[0], 1, textproc);
};
var css = 'alap';

/**
 * Scripturize the current document.
 */
Reforbit.doDocument = function() {
    if ((Reforbit.element && 
         (e = document.getElementById(Reforbit.element))) ||
        (e = document.body))
    {
	Reforbit.doElement(e);
    }
};

/**
 * Initialise the module. It only needs to be done once to create/compile
 * regular expression object.
 */
Reforbit.init = function() {
    var es = document.getElementsByTagName('script');
    var onload = 1; // Default to onload.
    for (i = 0; i < es.length; i ++) {
        var j, p;
        if ((j = es[i].src.indexOf('reforbit.js')) >= 0) {
            p = __decodeQS(es[i].src);
            if (p.element)
                Reforbit.element = p.element;
            if (p.new_window)
                Reforbit.new_window = p.new_window == '1';
            if (p.version)
                Reforbit.version = p.version;
            else if (p.onload)
                onload = parseInt(p.onload) || 1;
            break;
        }
    }
    return onload;
};

Reforbit.onclick = function(ev) {
    ev = ev || window.event;
    var verse = this.childNodes[0].data;

    // Check whether 'igezoPOPUP' variable has been initialised, i.e.
    // 'igezoPOPUP.js' has been loaded. If not, then we will fall back to
    // external linking to GNP.
    if (Reforbit.version == 'igezoPOPUP') {
        try {
            igezoPOPUP;
        } catch (e) {
            Reforbit.version = 'igezo';
        }
    }

    if (Reforbit.version == 'igezoPOPUP') {
        igezoPOPUP.onclick(ev, verse);
    } else {
        var tob = verse.replace(/ /g, '+');
        tob = tob.replace(/[,&;]/g, '%2C');
        tob = tob.replace(/:]/g, '%3A');

        switch (Reforbit.version) {
            case 'igezo':
                tob = atob('aHR0cDovL29ubGluZS1iaWJsaWEucm8vaWdla2VyZXNvLnBocD9jc3M9') + css + atob('JmlnZWhlbHk9') + tob;
                break;
            default:
                var bgver = Reforbit.translations[
                    Reforbit.version.toUpperCase()];
                tob = atob('aHR0cDovL29ubGluZS1iaWJsaWEucm8vaWdla2VyZXNvLnBocD9jc3M9') + css + atob('JmlnZWhlbHk9') + tob;
        }

        if (Reforbit.new_window)
            window.open(tob);
        else
            window.location.href = tob;
    }

    return false;
};

Reforbit.onmouseover = function(ev) {
    var title = this.childNodes[0].data;

    switch (Reforbit.version) {
        case 'igezoPOPUP':
            title += ' - online-biblia.ro';
            break;
        default:
            var bgver = Reforbit.translations[
                Reforbit.version.toUpperCase()];
            title += ' - online-biblia.ro';
    }

    if (Reforbit.version == 'igezoPOPUP')
        title += ' (pop-up)';
    else if (Reforbit.new_window)
        title += ' (new window)';

    this.setAttribute('title', title);
};

function __decodeQS(qs) {
    var k, v, i1, i2, r = {};
    i1 = qs.indexOf('?');
    i1 = i1 < 0 ? 0 : i1 + 1;
    while ((i1 >= 0) && ((i2 = qs.indexOf('=', i1)) >= 0)) {
        k = qs.substring(i1, i2);
        i1 = qs.indexOf('&', i2);
        v = i1 < 0 ? qs.substring(i2+1) : qs.substring(i2+1, i1++);
        r[unescape(k)] = unescape(v);
    }
    return r;
}

function __traverseDOM(node, depth, textproc) {
    var skipre = /^(a(?!rticle)|script|style|textarea)/i;
    var count = 0;
    while (node && depth > 0) {
        count ++;
        if (count >= Reforbit.max_nodes) {
            var handler = function() {
                __traverseDOM(node, depth, textproc);
            };
            setTimeout(handler, 50);
            return;
        }

        switch (node.nodeType) {
            case 1: // ELEMENT_NODE
                if (!skipre.test(node.tagName) && node.childNodes.length > 0) {
                    node = node.childNodes[0];
                    depth ++;
                    continue;
                }
                break;
            case 3: // TEXT_NODE
            case 4: // CDATA_SECTION_NODE
                node = textproc(node);
                break;
        }

        if (node.nextSibling) {
            node = node.nextSibling;
        } else {
            while (depth > 0) {
                node = node.parentNode;
                depth --;
                if (node.nextSibling) {
                    node = node.nextSibling;
                    break;
                }
            }
        }
    }
}

var __onload = Reforbit.init();
if (__onload > 0) {
    if (window.attachEvent) {
        window.attachEvent('onload', Reforbit.doDocument);
    } else if (window.addEventListener) {
        window.addEventListener('load', Reforbit.doDocument, false);
    } else {
        __onload = window.onload;
        window.onload = function() {
            Reforbit.doDocument();
            __onload();
        };
    }
} else if (__onload < 0) {
    Reforbit.doDocument();
}
