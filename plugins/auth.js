export default function({ $auth }) {
    $auth.can = function(permission) {
        const permissions = $auth.user && $auth.user.permissions;

        if (!permissions) {
            return undefined;
        }

        if (Array.isArray(permissions)) {
            return $auth.user.permissions.includes(permission);
        }

        return permissions === permission;
    };
}
