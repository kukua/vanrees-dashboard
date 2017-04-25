import moment from 'moment-timezone'
import qs from 'qs'
import config from '../config'
import { checkStatus, parseJSON } from '../helpers/fetch'

export default {
	// Doesn't use Redux reducers
	fetchByUDID (udid) {
		const to = moment().add(1, 'day').startOf('day')
		const from = to.clone().subtract(5, 'years')
		const parameters = {
			devices: udid,
			fields: 'timestamp,temp:avg,rain:sum',
			from: from.toISOString(),
			to: to.toISOString(),
			interval: '1d',
			sort: 'timestamp',
		}

		return fetch(config.apiUrl + '/measurements?' + qs.stringify(parameters), {
			headers: {
				'X-Auth-Token': config.authToken,
				'Accept': 'application/json',
			},
		})
			.then(checkStatus)
			.then(parseJSON)
	},
}
