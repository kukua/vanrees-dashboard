import _ from 'underscore'
import s from 'underscore.string'
import moment from 'moment-timezone'
import assign from 'es6-object-assign'
import { render } from 'react-dom'
import Router from './components/router'

import 'whatwg-fetch'
import 'array.prototype.fill'
import '../css/main.css'

_.mixin(s.exports())
assign.polyfill()

moment.tz.setDefault('UTC')

render(Router, document.getElementById('app'))
