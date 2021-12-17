exports.Package = class Package {
    publish() {
        return {
            vendor: {
                paths: {
                    './': './formidable/vendor'
                }
            }
        }
    }
}
