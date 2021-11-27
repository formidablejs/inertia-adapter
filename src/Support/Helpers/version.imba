import { config } from '@formidablejs/framework/lib/Support/Helpers'
import { createHash } from 'crypto'
import { encrypt } from '@formidablejs/framework/lib/Support/Helpers'
import { existsSync } from 'fs'
import { join } from 'path'
import { readFileSync } from 'fs'
import type { Hash } from 'crypto'

export def version
	const manifest\String = join(process.cwd!, 'public', 'mix-manifest.json')

	if !existsSync(manifest) then return encrypt(config('app.url'))

	const buffer\Buffer = readFileSync(manifest)
	const hashSum\Hash = createHash('sha256')

	hashSum.update(buffer)

	hashSum.digest('hex')
