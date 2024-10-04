$(".tooltip").each(function(index, element) {
    const href = $(this).attr("href");
    var loadKey = href.split("#");
    $(".tooltiptext:eq(" + index + ")").load(loadKey[0] + " #" + loadKey[1], function() {
        $(".tooltiptext:eq(" + index + ")").append('<div class="arrow" data-popper-arrow></div>');
    });
    var tooltip = $(".tooltiptext")[index];
    const popperInstance = Popper.createPopper(element, tooltip, {modifiers: [{name: 'offset', options: {offset: [0, 8],},},],});
    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];
    showEvents.forEach((event) => {
        element.addEventListener(event, function(){
            tooltip.setAttribute('data-show', '');
            popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: true },
            ],
            }));
            popperInstance.update();
        });
    });
    hideEvents.forEach((event) => {
        element.addEventListener(event, function(){
            tooltip.removeAttribute('data-show');
            popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: false },
            ],
            }));
        });
    });
});