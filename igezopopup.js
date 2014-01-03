function getsupportedprop(proparray){
    var root=document.documentElement //reference root element of document
    for (var i=0; i<proparray.length; i++){ //loop through possible properties
        if (typeof root.style[proparray[i]]=="string"){ //if the property value is a string (versus undefined)
            return proparray[i] //return that string
        }
    }
}



var igezoPOPUP = {
    baseurl: '',
    frame: null,
    height: 200,
    width: 300
};

igezoPOPUP.get_body = function() {
    if (navigator.userAgent.toLowerCase().indexOf('msie') >= 0) {
        return document.documentElement.clientWidth ? document.documentElement :
            document.body;
    } else {
        return (document.doctype && document.doctype.publicId && 
             (document.doctype.publicId.indexOf('XHTML') >= 0)) ?
            document.documentElement : document.body;
    }
};

igezoPOPUP.show = function(igehely, x, y) {
    var agent = navigator.userAgent.toLowerCase();
    var ie = agent.indexOf('msie') >= 0;
    var ie7 = agent.indexOf('msie 7') >= 0;
    var safari = agent.indexOf('safari') >= 0;

    if (!igezoPOPUP.baseurl) {
        var elms = document.getElementsByTagName('script');

        for (var i = 0; i < elms.length; i++) {
            if (elms[i].src && (elms[i].src.indexOf("igezopopup.js") >= 0)) {
                var src = elms[i].src;
                var qs = __decodeQS(src);
                igezoPOPUP.baseurl = src.substring(0, src.lastIndexOf('/')+1);
                if (qs.height)
                    igezoPOPUP.height = qs.height;
                if (qs.width)
                    igezoPOPUP.width = qs.width;
                break;
            }
        }
    }

    url = igezoPOPUP.baseurl + 'igekereso.html?igehely='+encodeURI(igehely);
    if (!igezoPOPUP.frame) {
        var frame = null;

        if (ie) {
            var html = '<iframe id="tart" frameborder="0" '+
                'src="'+url+'" style="position:absolute;top:'+y+
                'px;left:'+x+'px;" scrolling="no" marginheight="0" '+
                'marginwidth="0"></iframe>';
            document.body.insertAdjacentHTML('afterbegin', html);
            frame = document.getElementById('tart');
            frame.attachEvent('onblur', igezoPOPUP.hide);
            frame.style.filter = 'progid:DXImageTransform.Microsoft.Shadow'+
                '(color=#888888, Direction=135, Strength=5)';
            document.body.attachEvent('onmousedown', igezoPOPUP.hide);
        } else {
            var frame = document.createElement('IFRAME');
            document.body.appendChild(frame);
            frame.id = 'tart';
            frame.frameBorder = 0;
            frame.marginHeight = 0;
            frame.marginWidth = 0;
            frame.src = url;

            frame.style.position = 'absolute';

            frame.addEventListener('blur', igezoPOPUP.hide, false);
            window.addEventListener('mousedown', igezoPOPUP.hide, false);
        }

        if (!ie || ie7) {
		var boxshadowprop=getsupportedprop(['boxShadow', 'MozBoxShadow', 'WebkitBoxShadow'])
		var borderradiusprop=getsupportedprop(['borderRadius', 'MozBorderRadius', 'WebkitBorderRadius'])
		frame.style[boxshadowprop]="0px 0px 5px 0px #676767";
		frame.style[borderradiusprop]="2px";
        	frame.style.border = '#676767 solid 1px';
        	frame.style.zIndex="150"
        }
        frame.style.height = igezoPOPUP.height+'px';
        frame.style.width = igezoPOPUP.width+'px';
        
        igezoPOPUP.frame = frame;
    } else {
        igezoPOPUP.frame.src = url;
        igezoPOPUP.frame.style.display = '';
    }

    var b = igezoPOPUP.get_body();
    var dh = b.clientHeight;
    var dw = b.clientWidth;
    dh = (igezoPOPUP.frame.offsetHeight+y) - dh;
    dw = (igezoPOPUP.frame.offsetWidth+x) - dw;
    if (safari) {
        dh -= document.body.scrollTop;
        dw -= document.body.scrollLeft;
    } else {
        dh -= b.scrollTop;
        dw -= b.scrollLeft;
    }

    igezoPOPUP.frame.style.left = x-(dw>0?dw:0) + 'px';
    igezoPOPUP.frame.style.top  = y-(dh>0?dh:0) + 'px';
};

igezoPOPUP.onclick = function(e, igehely) {
    if (!e) e = window.event;

    var x = e.pageX;
    var y = e.pageY;
    if (isNaN(x)) {
        var b = igezoPOPUP.get_body();
        x = e.clientX + b.scrollLeft;
        y = e.clientY + b.scrollTop;
    }

    if (!igehely) {
        igehely = e.srcElement || e.target;
        igehely = igehely ? (igehely.innerText || igehely.textContent) : '';
    }
    igezoPOPUP.show(igehely, x, y);
};

igezoPOPUP.hide = function(event) {
    var f = igezoPOPUP.frame;
    if (f)
        f.style.display = 'none';
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
