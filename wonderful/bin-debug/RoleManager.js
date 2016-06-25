var RoleManager = (function () {
    function RoleManager() {
        this._roleDict = {};
        this._roleSex = {};
        this._roleSex["man1"] = 1;
        this._roleSex["man2"] = 1;
        this._roleSex["man3"] = 1;
        this._roleSex["woman1"] = 0;
        this._roleSex["woman2"] = 0;
        this._roleSex["woman3"] = 0;
    }
    var d = __define,c=RoleManager,p=c.prototype;
    p.getRole = function (roleName) {
        console.log(roleName);
        if (this._roleDict[roleName] == null) {
            this._roleDict[roleName] = new Role(roleName, 1);
        }
        return this._roleDict[roleName];
    };
    p.getRoleSex = function (roleName) {
        return this._roleSex[roleName];
    };
    RoleManager.ROLES = ["man1", "man2", "man3", "woman1", "woman2", "woman3"];
    return RoleManager;
}());
egret.registerClass(RoleManager,'RoleManager');
//# sourceMappingURL=RoleManager.js.map