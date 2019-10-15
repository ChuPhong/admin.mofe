export default function({ $auth, error }) {
    const can = $auth.can('management.artists.all');

    if (!can) {
        error({
            statusCode: 403
        });
    }
}
