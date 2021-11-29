const { View } = require('@formidablejs/framework');

module.exports.App = class extends View {
    render() {
        return `
            <html>
                <body>
                    <div id="app"></div>
                </body>
            </html>
        `;
    }
}
