export const hasPermission = (permissions = [], required) => {
    return permissions.includes(required);
};
