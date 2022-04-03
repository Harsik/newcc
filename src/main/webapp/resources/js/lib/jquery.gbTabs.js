;(function($) {
    $.fn.gbTabs = function(control){
        var element = $(this);
        control = $(control);

        element.delegate("li", "click", function(){
            var tabName = $(this).attr("data-tab");
            element.trigger("change.tabs", tabName);
        });

        element.bind("change.tabs", function(e, tabName){
            element.find("li").removeClass("active");
            element.find(">[data-tab='" + tabName + "']").addClass("active");
            control.find(">[data-tab]").removeClass("active");
            control.find(">[data-tab='" + tabName + "']").addClass("active");
        });

        var firstName = element.find("li:first").attr("data-tab");
        element.trigger("change.tabs", firstName);

        return this;
    };
})(jQuery);