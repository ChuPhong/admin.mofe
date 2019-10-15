export default function({ $auth, error }) {
    const can = $auth.can('management.users.all');

    if (!can) {
        error({
            statusCode: 403
        });
    }
}
