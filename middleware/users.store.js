export default function({ $auth, error }) {
    const can = $auth.can('management.users.store');

    if (!can) {
        error({
            statusCode: 403
        });
    }
}
