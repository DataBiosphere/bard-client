import Config from './config'

// since es6 imports are static and we run unit tests from the console, window won't be defined when importing this file
var window$1;
if (typeof(window) === 'undefined') {
    var loc = {
        hostname: ''
    };
    window$1 = {
        navigator: { userAgent: '' },
        document: {
            location: loc,
            referrer: ''
        },
        screen: { width: 0, height: 0 },
        location: loc
    };
} else {
    window$1 = window;
}


var ArrayProto = Array.prototype;
var FuncProto = Function.prototype;
var ObjProto = Object.prototype;
var slice = ArrayProto.slice;
var toString = ObjProto.toString;
var hasOwnProperty = ObjProto.hasOwnProperty;
var navigator$1 = window$1.navigator;
var document$1 = window$1.document;
var windowOpera = window$1.opera;
var screen = window$1.screen;
var userAgent = navigator$1.userAgent;
var nativeBind = FuncProto.bind;
var nativeForEach = ArrayProto.forEach;
var nativeIndexOf = ArrayProto.indexOf;
var nativeMap = ArrayProto.map;
var nativeIsArray = Array.isArray;
var breaker = {};


var _ = {
  trim: function(str) {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
      return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }
};



  // UNDERSCORE
  // Embed part of the Underscore Library
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) {
        return nativeBind.apply(func, slice.call(arguments, 1));
    }
    if (!_.isFunction(func)) {
        throw new TypeError();
    }
    args = slice.call(arguments, 2);
    bound = function() {
        if (!(this instanceof bound)) {
            return func.apply(context, args.concat(slice.call(arguments)));
        }
        var ctor = {};
        ctor.prototype = func.prototype;
        var self = new ctor();
        ctor.prototype = null;
        var result = func.apply(self, args.concat(slice.call(arguments)));
        if (Object(result) === result) {
            return result;
        }
        return self;
    };
    return bound;
};

_.bind_instance_methods = function(obj) {
    for (var func in obj) {
        if (typeof(obj[func]) === 'function') {
            obj[func] = _.bind(obj[func], obj);
        }
    }
};

/**
 * @param {*=} obj
 * @param {function(...*)=} iterator
 * @param {Object=} context
 */
_.each = function(obj, iterator, context) {
    if (obj === null || obj === undefined) {
        return;
    }
    if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
            if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
                return;
            }
        }
    } else {
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                if (iterator.call(context, obj[key], key, obj) === breaker) {
                    return;
                }
            }
        }
    }
};

_.escapeHTML = function(s) {
    var escaped = s;
    if (escaped && _.isString(escaped)) {
        escaped = escaped
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
    return escaped;
};

_.extend = function(obj) {
    _.each(slice.call(arguments, 1), function(source) {
        for (var prop in source) {
            if (source[prop] !== void 0) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
};

_.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
};

// from a comment on http://dbj.org/dbj/?p=286
// fails on only one very rare and deliberate custom object:
// var bomb = { toString : undefined, valueOf: function(o) { return "function BOMBA!"; }};
_.isFunction = function(f) {
    try {
        return /^\s*\bfunction\b/.test(f);
    } catch (x) {
        return false;
    }
};

_.isArguments = function(obj) {
    return !!(obj && hasOwnProperty.call(obj, 'callee'));
};

_.toArray = function(iterable) {
    if (!iterable) {
        return [];
    }
    if (iterable.toArray) {
        return iterable.toArray();
    }
    if (_.isArray(iterable)) {
        return slice.call(iterable);
    }
    if (_.isArguments(iterable)) {
        return slice.call(iterable);
    }
    return _.values(iterable);
};

_.map = function(arr, callback) {
    if (nativeMap && arr.map === nativeMap) {
        return arr.map(callback);
    } else {
        var results = [];
        _.each(arr, function(item) {
            results.push(callback(item));
        });
        return results;
    }
};

_.keys = function(obj) {
    var results = [];
    if (obj === null) {
        return results;
    }
    _.each(obj, function(value, key) {
        results[results.length] = key;
    });
    return results;
};

_.values = function(obj) {
    var results = [];
    if (obj === null) {
        return results;
    }
    _.each(obj, function(value) {
        results[results.length] = value;
    });
    return results;
};

_.identity = function(value) {
    return value;
};

_.include = function(obj, target) {
    var found = false;
    if (obj === null) {
        return found;
    }
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
        return obj.indexOf(target) != -1;
    }
    _.each(obj, function(value) {
        if (found || (found = (value === target))) {
            return breaker;
        }
    });
    return found;
};

_.includes = function(str, needle) {
    return str.indexOf(needle) !== -1;
};

// Underscore Addons
_.inherit = function(subclass, superclass) {
    subclass.prototype = new superclass();
    subclass.prototype.constructor = subclass;
    subclass.superclass = superclass.prototype;
    return subclass;
};

_.isObject = function(obj) {
    return (obj === Object(obj) && !_.isArray(obj));
};

_.isEmptyObject = function(obj) {
    if (_.isObject(obj)) {
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                return false;
            }
        }
        return true;
    }
    return false;
};

_.isUndefined = function(obj) {
    return obj === void 0;
};

_.isString = function(obj) {
    return toString.call(obj) == '[object String]';
};

_.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
};

_.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
};

_.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
};

_.encodeDates = function(obj) {
    _.each(obj, function(v, k) {
        if (_.isDate(v)) {
            obj[k] = _.formatDate(v);
        } else if (_.isObject(v)) {
            obj[k] = _.encodeDates(v); // recurse
        }
    });
    return obj;
};

_.strip_empty_properties = function(p) {
  var ret = {};
  _.each(p, function(v, k) {
      if (_.isString(v) && v.length > 0) {
          ret[k] = v;
      }
  });
  return ret;
};

_.info = {
  campaignParams: function() {
      var campaign_keywords = 'utm_source utm_medium utm_campaign utm_content utm_term'.split(' '),
          kw = '',
          params = {};
      _.each(campaign_keywords, function(kwkey) {
          kw = _.getQueryParam(document$1.URL, kwkey);
          if (kw.length) {
              params[kwkey] = kw;
          }
      });

      return params;
  },

  searchEngine: function(referrer) {
      if (referrer.search('https?://(.*)google.([^/?]*)') === 0) {
          return 'google';
      } else if (referrer.search('https?://(.*)bing.com') === 0) {
          return 'bing';
      } else if (referrer.search('https?://(.*)yahoo.com') === 0) {
          return 'yahoo';
      } else if (referrer.search('https?://(.*)duckduckgo.com') === 0) {
          return 'duckduckgo';
      } else {
          return null;
      }
  },

  searchInfo: function(referrer) {
      var search = _.info.searchEngine(referrer),
          param = (search != 'yahoo') ? 'q' : 'p',
          ret = {};

      if (search !== null) {
          ret['$search_engine'] = search;

          var keyword = _.getQueryParam(referrer, param);
          if (keyword.length) {
              ret['mp_keyword'] = keyword;
          }
      }

      return ret;
  },

  /**
   * This function detects which browser is running this script.
   * The order of the checks are important since many user agents
   * include key words used in later checks.
   */
  browser: function(user_agent, vendor, opera) {
      vendor = vendor || ''; // vendor is undefined for at least IE9
      if (opera || _.includes(user_agent, ' OPR/')) {
          if (_.includes(user_agent, 'Mini')) {
              return 'Opera Mini';
          }
          return 'Opera';
      } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
          return 'BlackBerry';
      } else if (_.includes(user_agent, 'IEMobile') || _.includes(user_agent, 'WPDesktop')) {
          return 'Internet Explorer Mobile';
      } else if (_.includes(user_agent, 'SamsungBrowser/')) {
          // https://developer.samsung.com/internet/user-agent-string-format
          return 'Samsung Internet';
      } else if (_.includes(user_agent, 'Edge') || _.includes(user_agent, 'Edg/')) {
          return 'Microsoft Edge';
      } else if (_.includes(user_agent, 'FBIOS')) {
          return 'Facebook Mobile';
      } else if (_.includes(user_agent, 'Chrome')) {
          return 'Chrome';
      } else if (_.includes(user_agent, 'CriOS')) {
          return 'Chrome iOS';
      } else if (_.includes(user_agent, 'UCWEB') || _.includes(user_agent, 'UCBrowser')) {
          return 'UC Browser';
      } else if (_.includes(user_agent, 'FxiOS')) {
          return 'Firefox iOS';
      } else if (_.includes(vendor, 'Apple')) {
          if (_.includes(user_agent, 'Mobile')) {
              return 'Mobile Safari';
          }
          return 'Safari';
      } else if (_.includes(user_agent, 'Android')) {
          return 'Android Mobile';
      } else if (_.includes(user_agent, 'Konqueror')) {
          return 'Konqueror';
      } else if (_.includes(user_agent, 'Firefox')) {
          return 'Firefox';
      } else if (_.includes(user_agent, 'MSIE') || _.includes(user_agent, 'Trident/')) {
          return 'Internet Explorer';
      } else if (_.includes(user_agent, 'Gecko')) {
          return 'Mozilla';
      } else {
          return '';
      }
  },

  /**
   * This function detects which browser version is running this script,
   * parsing major and minor version (e.g., 42.1). User agent strings from:
   * http://www.useragentstring.com/pages/useragentstring.php
   */
  browserVersion: function(userAgent, vendor, opera) {
      var browser = _.info.browser(userAgent, vendor, opera);
      var versionRegexs = {
          'Internet Explorer Mobile': /rv:(\d+(\.\d+)?)/,
          'Microsoft Edge': /Edge?\/(\d+(\.\d+)?)/,
          'Chrome': /Chrome\/(\d+(\.\d+)?)/,
          'Chrome iOS': /CriOS\/(\d+(\.\d+)?)/,
          'UC Browser' : /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
          'Safari': /Version\/(\d+(\.\d+)?)/,
          'Mobile Safari': /Version\/(\d+(\.\d+)?)/,
          'Opera': /(Opera|OPR)\/(\d+(\.\d+)?)/,
          'Firefox': /Firefox\/(\d+(\.\d+)?)/,
          'Firefox iOS': /FxiOS\/(\d+(\.\d+)?)/,
          'Konqueror': /Konqueror:(\d+(\.\d+)?)/,
          'BlackBerry': /BlackBerry (\d+(\.\d+)?)/,
          'Android Mobile': /android\s(\d+(\.\d+)?)/,
          'Samsung Internet': /SamsungBrowser\/(\d+(\.\d+)?)/,
          'Internet Explorer': /(rv:|MSIE )(\d+(\.\d+)?)/,
          'Mozilla': /rv:(\d+(\.\d+)?)/
      };
      var regex = versionRegexs[browser];
      if (regex === undefined) {
          return null;
      }
      var matches = userAgent.match(regex);
      if (!matches) {
          return null;
      }
      return parseFloat(matches[matches.length - 2]);
  },

  os: function() {
      var a = userAgent;
      if (/Windows/i.test(a)) {
          if (/Phone/.test(a) || /WPDesktop/.test(a)) {
              return 'Windows Phone';
          }
          return 'Windows';
      } else if (/(iPhone|iPad|iPod)/.test(a)) {
          return 'iOS';
      } else if (/Android/.test(a)) {
          return 'Android';
      } else if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
          return 'BlackBerry';
      } else if (/Mac/i.test(a)) {
          return 'Mac OS X';
      } else if (/Linux/.test(a)) {
          return 'Linux';
      } else if (/CrOS/.test(a)) {
          return 'Chrome OS';
      } else {
          return '';
      }
  },

  device: function(user_agent) {
      if (/Windows Phone/i.test(user_agent) || /WPDesktop/.test(user_agent)) {
          return 'Windows Phone';
      } else if (/iPad/.test(user_agent)) {
          return 'iPad';
      } else if (/iPod/.test(user_agent)) {
          return 'iPod Touch';
      } else if (/iPhone/.test(user_agent)) {
          return 'iPhone';
      } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
          return 'BlackBerry';
      } else if (/Android/.test(user_agent)) {
          return 'Android';
      } else {
          return '';
      }
  },

  referringDomain: function(referrer) {
      var split = referrer.split('/');
      if (split.length >= 3) {
          return split[2];
      }
      return '';
  },

  properties: function() {
      return _.extend(_.strip_empty_properties({
          'os': _.info.os(),
          'browser': _.info.browser(userAgent, navigator$1.vendor, windowOpera),
          'referrer': document$1.referrer,
          'referring_domain': _.info.referringDomain(document$1.referrer),
          'device': _.info.device(userAgent)
      }), {
          'browser_version': _.info.browserVersion(userAgent, navigator$1.vendor, windowOpera),
          'screen_height': screen.height,
          'screen_width': screen.width,
          'bard_client_version': Config.LIB_VERSION,
      });
  }
};

export {_}
