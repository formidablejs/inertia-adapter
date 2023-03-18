exports.Package = class Package {
    publish(language = 'imba') {
        const path = language.toLowerCase() == 'imba'
            ? 'imba' : (
                language.toLowerCase() == 'typescript' ? 'ts' : 'imba'
            )

        return {
            common: {
                paths: {
                    './': './formidable/common'
                }
            },
            vendor: {
                paths: {
                    './': `./formidable/vendor/${path}`,
                }
            }
        }
    }
}
