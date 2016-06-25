class RoleManager
{
    public static ROLES = ["man1","man2","man3","woman1","woman2","woman3"];

    private _roleDict:any = {};
    private _roleSex:any = {};
    public constructor()
    {
        this._roleSex["man1"] = 1;
        this._roleSex["man2"] = 1;
        this._roleSex["man3"] = 1;
        this._roleSex["woman1"] = 0;
        this._roleSex["woman2"] = 0;
        this._roleSex["woman3"] = 0;
    }
    
    public getRole(roleName:string):Role
    {
        console.log(roleName);
        if(this._roleDict[roleName] == null)
        {
            this._roleDict[roleName] = new Role(roleName,1);
        }
        return <Role>this._roleDict[roleName];
    }
    public getRoleSex(roleName:string):number
    {
        return this._roleSex[roleName];
    }
}