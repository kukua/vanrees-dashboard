import React from 'react'
import config from '../config'

class Dashboard extends React.Component {
	constructor () {
		super()
		this.state = {
			station: 0,
			metric: 'temp',
		}
	}

	onChange (ev) {
		this.setState({ [ev.target.name]: ev.target.value })
	}
	onFetch (ev) {
		ev.preventDefault()
		console.log(this.state)
	}

	render () {
		return (
			<div class="container">
				<br />
				<div class="row">
					<div class="col-sm-5">
						<div class="form-group">
							<select
								class="form-control"
								name="station"
								value={this.state.udid}
								onChange={this.onChange.bind(this)}>
								<option>- Choose tea plantation -</option>
								{config.stations.map((station, i) => (
									<optgroup key={`${i}`} label={station.name}>
									{station.plantages.map((plantage, j) => (
										<option key={`${i}:${j}`} value={station.id}>{plantage}</option>
									))}
									</optgroup>
								))}
							</select>
						</div>
					</div>
					<div class="col-sm-5">
						<div class="form-group">
							<select
								class="form-control"
								name="metric"
								value={this.state.metric}
								onChange={this.onChange.bind(this)}>
								<option value="temp">Temperature</option>
								<option value="rain">Rainfall</option>
								<option value="solarIrrad">Solar radiation</option>
							</select>
						</div>
					</div>
					<div class="col-sm-2">
						<button class="btn btn-primary btn-block" onClick={this.onFetch.bind(this)}>
							Load
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Dashboard
