declare class Collection{
    Collection (manager, options);
    prepareNipples();
    bindings();
    begin();
    createNipple(position, identifier);
    updateBox();
    bindNipple(nipple);
    pressureFn(touch, nipple, identifier);
    onstart(evt);
    processOnStart(evt);
    getOrCreate(identifier, position);
    processOnMove(evt);
    processOnEnd(evt);
    onDestroyed(evt, nipple);
    destroy();
}
declare class Manager{
    Manager(options);
    prepareCollections();
    create(options);
    createCollection(options);
    bindCollection(collection);
    bindDocument();
    unbindDocument(force);
    getIdentifier(evt);
    removeIdentifier(identifier);
    onmove(evt);
    onend(evt);
    onAny(which, evt);
    destroy();
    onDestroyed();
}
declare class Super{
    on(arg, cb);
    off(arg, cb);
    trigger(arg, data);
    config(options);
    bindEvt(el, type);
    unbindEvt(el, type);
}
declare class Nipple{
    Nipple(collection, options);
    buildEl(options);
    stylize();
    applyStyles(styles);
    addToDom();
    removeFromDom();
    destroy();
    show(cb);
    hide(cb);
    restPosition(cb);
    restCallback();
    computeDirection(obj);
    
}