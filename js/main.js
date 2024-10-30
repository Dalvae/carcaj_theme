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
document.addEventListener("DOMContentLoaded", function () {
  var tooltip = document.createElement("div");
  tooltip.className = "footnote-tooltip";
  document.body.appendChild(tooltip);
  function isMobile() {
    return window.innerWidth <= 1000;
  }
  function getFootnoteText(element) {
    var parent = element.parentNode;
    var clone = parent.cloneNode(true);
    var footnoteNumber = clone.querySelector("a[id^=\"sdfootnote\"], a[id^=\"_ftn\"]");
    if (footnoteNumber) footnoteNumber.remove();
    var returnLinks = clone.querySelectorAll("a[href^=\"#sdfootnote\"], a[href^=\"#_ftnref\"]");
    returnLinks.forEach(function (link) {
      return link.remove();
    });
    var supElement = clone.querySelector("sup");
    if (supElement) supElement.remove();
    return clone.innerHTML.trim().replace(/^\s*\[\d+\]\s*/, "").replace(/^\s*\d+\s*/, "");
  }
  function positionTooltip(element, tooltip) {
    var rect = element.getBoundingClientRect();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var left = rect.left;
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
    var tooltipWidth = tooltip.offsetWidth;
    var tooltipHeight = tooltip.offsetHeight;
    if (left + tooltipWidth > viewportWidth) {
      left = viewportWidth - tooltipWidth - 20;
    }
    left = Math.max(10, left);
    var spaceBelow = viewportHeight - rect.bottom;
    var spaceAbove = rect.top;
    var showAbove = spaceBelow < tooltipHeight && spaceAbove > tooltipHeight;
    var top = showAbove ? rect.top + scrollTop - tooltipHeight - 5 : rect.bottom + scrollTop + 5;
    tooltip.style.left = "".concat(left, "px");
    tooltip.style.top = "".concat(top, "px");
  }
  var footnoteLinks = document.querySelectorAll('.content-full sup a[href^="#sdfootnote"], .content-full a[href^="#_ftn"] sup');
  footnoteLinks.forEach(function (link) {
    var href = link.getAttribute("href") || link.parentNode.getAttribute("href");
    var targetId = href.substring(1);
    if (targetId.startsWith("sdfootnote")) {
      targetId = targetId.replace("anc", "sym");
    }
    var footnoteContent = document.getElementById(targetId);
    if (!footnoteContent) return;
    var eventTarget = link.tagName === "SUP" ? link.parentNode : link;

    // Verificar si estamos en las notas al pie
    var isInFootnotes = href.includes("_ftnref") || href.includes("sdfootnoteanc");
    if (isMobile() && !isInFootnotes) {
      eventTarget.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var nextElement = eventTarget.nextElementSibling;

        // Si ya existe una nota expandida, la removemos
        if (nextElement !== null && nextElement !== void 0 && nextElement.classList.contains("expanded-footnote")) {
          nextElement.classList.add("removing");
          nextElement.classList.remove("entering");
          // Removemos después de la animación de opacidad
          setTimeout(function () {
            return nextElement.remove();
          }, 200);
          return;
        }

        // Remover cualquier otra nota expandida
        document.querySelectorAll(".expanded-footnote").forEach(function (el) {
          el.classList.add("removing");
          el.classList.remove("entering");
          setTimeout(function () {
            return el.remove();
          }, 200);
        });

        // Crear y agregar la nueva nota
        var noteText = getFootnoteText(footnoteContent);
        var expandedNote = document.createElement("div");
        expandedNote.className = "expanded-footnote";
        expandedNote.innerHTML = noteText;

        // Insertar después del eventTarget
        eventTarget.insertAdjacentElement("afterend", expandedNote);

        // Forzar reflow
        expandedNote.offsetHeight;

        // Iniciar animación de entrada
        requestAnimationFrame(function () {
          expandedNote.classList.add("entering");
          expandedNote.style.maxHeight = expandedNote.scrollHeight + "px";
        });

        // Evento click para cerrar
        expandedNote.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          expandedNote.classList.add("removing");
          expandedNote.classList.remove("entering");
          setTimeout(function () {
            return expandedNote.remove();
          }, 200);
        });
      });
    } else if (!isMobile()) {
      // Comportamiento desktop sin cambios
      eventTarget.addEventListener("mouseover", function (e) {
        var noteText = getFootnoteText(footnoteContent);
        tooltip.innerHTML = noteText;
        tooltip.style.display = "block";
        positionTooltip(eventTarget, tooltip);
      });
      eventTarget.addEventListener("mouseout", function () {
        tooltip.style.display = "none";
      });
      eventTarget.addEventListener("click", function (e) {
        var target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: "smooth"
          });
        }
      });
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Remover barras existentes
  var existingBars = document.querySelectorAll(".progress-bar, .progress-bar-container");
  existingBars.forEach(function (bar) {
    var _bar$parentElement$ge;
    if ((_bar$parentElement$ge = bar.parentElement.getAttribute("style")) !== null && _bar$parentElement$ge !== void 0 && _bar$parentElement$ge.includes("position: fixed")) {
      bar.parentElement.remove();
    } else {
      bar.remove();
    }
  });

  // Obtener el ancho del viewport antes de crear la barra
  var viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
  console.log("Viewport width:", viewportWidth); // Debug

  // Crear la barra con el ancho máximo establecido
  var progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  progressBar.style.maxWidth = "".concat(viewportWidth, "px");
  document.body.insertBefore(progressBar, document.body.firstChild);
  function updateProgressBar() {
    requestAnimationFrame(function () {
      // Actualizar el ancho máximo en cada cambio
      var currentViewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
      progressBar.style.maxWidth = "".concat(currentViewportWidth, "px");
      var viewportHeight = window.innerHeight;
      var totalScroll = document.documentElement.scrollHeight - viewportHeight;
      var currentScroll = window.scrollY;
      var progress = currentScroll / totalScroll * 100;

      // Aplicar el progreso como porcentaje del viewport width
      var progressWidth = currentViewportWidth * Math.min(progress, 100) / 100;
      progressBar.style.width = "".concat(progressWidth, "px");

      // Debug
      console.log({
        viewportWidth: currentViewportWidth,
        progressWidth: progressWidth,
        progress: "".concat(progress, "%")
      });
    });
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateProgressBar();
        ticking = false;
      });
      ticking = true;
    }
  }, {
    passive: true
  });

  // Actualizar cuando cambie el tamaño de la ventana
  window.addEventListener("resize", updateProgressBar);
  window.addEventListener("orientationchange", updateProgressBar);

  // Usar VisualViewport API para mayor precisión en móviles
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", updateProgressBar);
    window.visualViewport.addEventListener("scroll", updateProgressBar);
  }
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