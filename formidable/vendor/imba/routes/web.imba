import { Inertia } from '@formidablejs/inertia'
import { Request } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

# --------------------------------------------------------------------------
# Web Routes
# --------------------------------------------------------------------------
#
# Here is where you can register web routes for your application. These
# routes are loaded by the RouteServiceResolver within a group which
# is assigned the "session" middleware group.

Route.get '/', do(request\Request)
	Inertia.render('Welcome', {
		formidableVersion: request.version
		nodeVersion: process.version
	}).withViewData({
		locale: request.locale!
	})
