export function saveToLocal(id, key, value) {
    let name = window.localStorage.__name__;
    if (!name) {
        name = {};
        name[id] = {};
    } else {
        name = JSON.parse(name);
        if (!name[id]) {
            name[id] = {};
        }
    }
    name[id][key] = value;
    window.localStorage.__name__ = JSON.stringify(name);
};

export function loadFromLocal(id, key, def) {
    let name = window.localStorage.__name__;
    if (!name) {
        return def;
    }
    name = JSON.parse(name)[id];
    if (!name) {
        return def;
    }
    let ret = name[key];
    return ret || def;
};
