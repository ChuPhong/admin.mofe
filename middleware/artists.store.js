export default function({ $auth, error }) {
    const can = $auth.can('management.artists.store');

    if (!can) {
        error({
            statusCode: 403
        });
    }
}
