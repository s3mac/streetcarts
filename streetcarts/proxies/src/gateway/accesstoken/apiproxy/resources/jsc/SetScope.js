/**
 * Create a scope value based on which groups the authenticating user
 * belongs to.
 */
var userGroups = JSON.parse(context.getVariable("streetcarts.user.groups"));
var userScope = "";

if (userGroups.user_groups && userGroups.user_groups.length > 0) {
    for (var i = 0; i < userGroups.user_groups.length; i++) {
        var groupName = userGroups.user_groups[i].name;
        if (groupName === "owners") {
            userScope = userScope + "owner.read owner.create owner.delete owner.update ";
        }
        if (groupName.indexOf("/managers/menus") > 0) {
            userScope = userScope + "manager.read manager.update ";
        }
        if (groupName === "members") {
            userScope = userScope + "reviewer.read reviewer.create ";
        }
    }
}

userScope = userScope.replace(/(^[,\s]+)|([,\s]+$)/g, '');
context.setVariable("streetcarts.user.scope", userScope);