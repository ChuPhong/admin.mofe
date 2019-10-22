export default function({ $auth, error }) {
    const can = $auth.can('management.login');

    if (!can) {
        return error({
            statusCode: 403
        });
    }
}
