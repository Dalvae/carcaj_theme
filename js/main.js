function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function ($) {
  var config = {};
  function getConfig() {
    var currentUrl = location.host + location.pathname;
    var config = {
      //add your custom config here
    };
    return config;
  }
  function isMobile() {
    return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || window.innerWidth < 1024;
  }
  function debug(messages) {
    if (getQueryString('ads-debug') !== 'true') {
      return false;
    }
    if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === undefined) {
      return false;
    }
    typeof console.group === 'function' ? console.group('*** ADVERTISING DEBUG  *** ') : console.log('*** ADVERTISING DEBUG  *** ');
    messages.forEach(function (message) {
      typeof console.info === 'functon' ? console.info(message) : console.log(message);
    });
    typeof console.groupEnd === 'function' && console.groupEnd();
  }
  function createSlot(adunit, sizes, id, outOfPage) {
    if (outOfPage) {
      return googletag.defineOutOfPageSlot(adunit, id).addService(googletag.pubads());
    } else {
      return googletag.defineSlot(adunit, sizes, id).addService(googletag.pubads());
    }
  }
  function buildSlots(config, callback) {
    var slotsLoaded = [];
    var slots = {};
    googletag.cmd.push(function () {
      //add your slots here

      /*
      	slots.adTop = createSlot('123123123/SOME_AD_UNIT', [[320, 50], [320, 100]], 'ad-top');
      */

      /* add your targeting here too
      	googletag.pubads().setTargeting('demo', config.demo);
      googletag.pubads().setTargeting('seccion', config.pagetype);
      	*/

      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
      googletag.pubads().addEventListener('slotRenderEnded', function (e) {
        if (!e.isEmpty) {
          slotsLoaded.push(e.slot.getSlotElementId());
          debug([e.slot.getSlotElementId(), e.slot.getResponseInformation()]);
        } else {
          debug(['slot ' + e.slot.getSlotElementId() + ' came empty']);
        }
      });
    });
  }
  $(function () {
    config = getConfig();
    buildSlots(config);
  });
})(jQuery);
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
document.addEventListener("DOMContentLoaded", function () {
  var tooltip = document.createElement("div");
  tooltip.className = "footnote-tooltip";
  document.body.appendChild(tooltip);
  function isMobile() {
    return window.innerWidth <= 1000;
  }
  function getFootnoteText(element) {
    var _clone$querySelector, _clone$querySelector2;
    var clone = element.parentNode.cloneNode(true);
    (_clone$querySelector = clone.querySelector("a[id^=\"sdfootnote\"], a[id^=\"_ftn\"]")) === null || _clone$querySelector === void 0 || _clone$querySelector.remove();
    clone.querySelectorAll("a[href^=\"#sdfootnote\"], a[href^=\"#_ftnref\"]").forEach(function (link) {
      return link.remove();
    });
    (_clone$querySelector2 = clone.querySelector("sup")) === null || _clone$querySelector2 === void 0 || _clone$querySelector2.remove();
    return clone.innerHTML.trim().replace(/^\s*\[\d+\]\s*/, "").replace(/^\s*\d+\s*/, "");
  }
  function positionTooltip(element, tooltip) {
    var rect = element.getBoundingClientRect();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
    var left = Math.max(10, Math.min(rect.left, viewportWidth - tooltip.offsetWidth - 20));
    var top = rect.bottom + scrollTop + 5;
    if (rect.bottom + tooltip.offsetHeight > viewportHeight && rect.top > tooltip.offsetHeight) {
      top = rect.top + scrollTop - tooltip.offsetHeight - 5;
    }
    Object.assign(tooltip.style, {
      left: "".concat(left, "px"),
      top: "".concat(top, "px")
    });
  }
  function insertExpandedNote(eventTarget, expandedNote) {
    var supElement = eventTarget.closest("sup") || eventTarget.querySelector("sup");
    var nextNode = (supElement || eventTarget).nextSibling;
    if ((nextNode === null || nextNode === void 0 ? void 0 : nextNode.nodeType) === Node.TEXT_NODE && (nextNode.textContent.startsWith(".") || nextNode.textContent.startsWith(" "))) {
      var _nextNode$textContent = _toArray(nextNode.textContent),
        firstChar = _nextNode$textContent[0],
        rest = _nextNode$textContent.slice(1);
      var charNode = document.createTextNode(firstChar);
      var restNode = document.createTextNode(rest.join(""));
      nextNode.parentNode.replaceChild(charNode, nextNode);
      charNode.parentNode.insertBefore(expandedNote, charNode.nextSibling);
      expandedNote.parentNode.insertBefore(restNode, expandedNote.nextSibling);
    } else {
      (supElement || eventTarget).insertAdjacentElement("afterend", expandedNote);
    }
  }

  // Verificar si el elemento está después del separador de notas
  var footnoteSeparator = document.querySelector(".wp-block-separator");
  var isInFootnotes = function isInFootnotes(element) {
    return (footnoteSeparator === null || footnoteSeparator === void 0 ? void 0 : footnoteSeparator.compareDocumentPosition(element)) & Node.DOCUMENT_POSITION_FOLLOWING;
  };
  document.querySelectorAll('a[href*="_ftn"], a[href*="sdfootnote"]').forEach(function (link) {
    var href = link.getAttribute("href");
    var targetId = href.substring(1).replace(/^sdfootnoteanc/, "sdfootnotesym");
    var footnoteContent = document.getElementById(targetId);
    if (!footnoteContent) return;
    var isExpanded = false;

    // Links en la sección de notas al pie - funciona igual en mobile y desktop
    if (isInFootnotes(link)) {
      link.addEventListener("click", function (e) {
        var targetRef = document.getElementById(href.replace("_ftn", "_ftnref").substring(1));
        targetRef === null || targetRef === void 0 || targetRef.scrollIntoView({
          behavior: "smooth"
        });
      });
      return;
    }
    if (isMobile()) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (isExpanded) {
          var note = document.querySelector(".expanded-footnote");
          if (note) {
            note.classList.add("removing");
            note.classList.remove("entering");
            setTimeout(function () {
              return note.remove();
            }, 200);
          }
          isExpanded = false;
          return;
        }
        document.querySelectorAll(".expanded-footnote").forEach(function (el) {
          el.classList.add("removing");
          el.classList.remove("entering");
          setTimeout(function () {
            return el.remove();
          }, 200);
        });
        var expandedNote = document.createElement("div");
        expandedNote.className = "expanded-footnote";
        expandedNote.innerHTML = getFootnoteText(footnoteContent);
        insertExpandedNote(link, expandedNote);
        isExpanded = true;
        requestAnimationFrame(function () {
          expandedNote.classList.add("entering");
          expandedNote.style.maxHeight = expandedNote.scrollHeight + "px";
        });
        expandedNote.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          expandedNote.classList.add("removing");
          expandedNote.classList.remove("entering");
          setTimeout(function () {
            return expandedNote.remove();
          }, 200);
          isExpanded = false;
        });
      });
    } else {
      Object.assign(link, {
        onmouseover: function onmouseover(e) {
          tooltip.innerHTML = getFootnoteText(footnoteContent);
          tooltip.style.display = "block";
          positionTooltip(link, tooltip);
        },
        onmouseout: function onmouseout() {
          return tooltip.style.display = "none";
        },
        onclick: function onclick(e) {
          e.preventDefault();
          footnoteContent.scrollIntoView({
            behavior: "smooth"
          });
        }
      });
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var contentFull = document.querySelector(".content-full");

  // If there's no content-full div, don't create the progress bar
  if (!contentFull) {
    return;
  }

  // Remove any existing progress bars
  var existingBars = document.querySelectorAll(".progress-bar");
  existingBars.forEach(function (bar) {
    return bar.remove();
  });

  // Create the progress bar
  var progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  document.body.insertBefore(progressBar, document.body.firstChild);
  function updateProgressBar() {
    // Get the content dimensions
    var contentRect = contentFull.getBoundingClientRect();
    var contentTop = contentRect.top + window.pageYOffset;
    var contentHeight = contentRect.height;

    // Calculate visible portion of the content
    var viewportHeight = window.innerHeight;
    var currentScroll = window.pageYOffset;

    // Calculate progress based on content visibility
    var progress = 0;
    if (currentScroll > contentTop) {
      // Calculate how much of the content has been scrolled past
      var scrolledContent = currentScroll - contentTop;
      // The viewable content height is the content height minus one viewport
      var viewableContentHeight = contentHeight - viewportHeight;
      // Calculate progress percentage
      progress = scrolledContent / viewableContentHeight * 100;
      // Ensure progress stays between 0 and 100
      progress = Math.min(Math.max(progress, 0), 100);
    }
    requestAnimationFrame(function () {
      progressBar.style.width = "".concat(progress, "%");
    });
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateProgressBar();
        ticking = false;
      });
      ticking = true;
    }
  }, {
    passive: true
  });

  // Handle window resize and orientation changes
  window.addEventListener("resize", updateProgressBar);
  window.addEventListener("orientationchange", updateProgressBar);

  // Initial update
  updateProgressBar();
});
// remap jQuery to $
(function ($) {
  $(document).ready(function () {
    $("button#menuMore").click(function () {
      $("section.menu-desktop").slideToggle("fast", function () {});
      $("button#menuMore").find('i').toggleClass('fa-bars fa-times');
    });
    $("button#mobileNav").click(function () {
      $(".col.right").slideToggle("fast", function () {});
      $("button#mobileNav").find('i').toggleClass('fa-bars fa-times');
    });

    // HOME SLIDER
    $('.sliderHome').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      prevArrow: $('.prevArrow'),
      nextArrow: $('.nextArrow')
    });

    // COMMENTS TRICKS

    $('.comment-notes, .logged-in-as, .comment-form-comment').wrapAll($('<div>').addClass('wrap-left'));
    $('.comment-form-author, .comment-form-email, .comment-form-url, .comment-form-cookies-consent, .form-submit').wrapAll($('<div>').addClass('wrap-right'));
  });
  $(window).scroll(function () {});
  $(window).load(function () {});
  $(window).resize(function () {});
})(window.jQuery);