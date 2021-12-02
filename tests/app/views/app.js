const { View } = require('@formidablejs/framework');

module.exports.App = class extends View {
    render() {
        const data = this.get('dataPage');

        return `
            <html>
                <body>
                    <div id="app" data-page="${data}"></div>
                </body>
            </html>
        `;
    }
}
