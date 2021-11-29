const { View } = require('@formidablejs/framework');

export class Welcome extends View {
    render() {
        return '<h1>Hello world</h1>';
    }
}
