import React from 'react'
import config from '../config'
import measurementActions from '../actions/measurement'
import ReactHighcharts from 'react-highcharts'

// http://stackoverflow.com/a/17853889/1453912
ReactHighcharts.Highcharts.dateFormats = {
	W: function (timestamp) {
		var date = new Date(timestamp)
		var day = date.getUTCDay() == 0 ? 7 : date.getUTCDay()
		var dayNumber
		date.setDate(date.getUTCDate() + 4 - day)
		dayNumber = Math.floor((date.getTime() - new Date(date.getUTCFullYear(), 0, 1, -6)) / 86400000)
		return 1 + Math.floor(dayNumber / 7)
	}
}

class Dashboard extends React.Component {
	constructor () {
		super()
		this.state = {
			udid: undefined,
			data: undefined,
			isLoading: false,
		}
	}

	onUDIDChange (ev) {
		const udid = ev.target.value

		if (udid === this.state.udid) return

		this.setState({ udid, data: undefined, isLoading: true })

		measurementActions.fetchByUDID(udid)
			.then((data) => this.setState({ data, isLoading: false }))
	}

	getConfig (title) {
		return {
			title: {
				text: title,
				align: 'left',
				style: {
					fontSize: '14px',
					fontWeight: 'bold',
					fontFamily: '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
				},
			},
			tooltip: {
				shared: true,
				useHTML: true,
				valueSuffix: '',
				dateTimeLabelFormats: {
					millisecond: '%d-%m-%Y',
					second: '%d-%m-%Y',
					minute: '%d-%m-%Y',
					hour: '%d-%m-%Y',
					day: '%d-%m-%Y',
					week: '%d-%m-%Y',
					month: '%d-%m-%Y',
					year: '%d-%m-%Y',
				},
			},
			legend: {
				enabled: false,
			},
			chart: {
				height: 400,
				style: {
					fontFamily: 'Trebuchet MS',
				},
				zoomType: 'x',
			},
			plotOptions: {
				series: {
					cropTreshhold: 5000,
					states: {
						hover: {
							enabled: false,
						},
					},
				},
				line: {
					turboThreshold: 5000,
					lineWidth: 1,
					marker: {
						enabled: false,
					},
				},
			},
			credits: {
				enabled: false,
			},
			xAxis: {
				type: 'datetime',
				labels: {
					rotation: -45,
					align: 'right',
				},
				title: {
					text: '',
				},
				crosshair: true,
				alternateGridColor: '#f7f7f7',
				dateTimeLabelFormats: {
					millisecond: '%H:%M:%S.%L',
					second: '%H:%M:%S',
					minute: '%H:%M',
					hour: '%H:%M',
					day: '%d-%m-%Y',
					week: 'week %W / %Y',
					month: '%m-%Y',
					year: '%Y',
				},
			},
			yAxis: {
				title: {
					text: '',
				},
			},
		}
	}

	renderTemperatureGraph () {
		var config = this.getConfig('Average temperature (°C)')
		config.series = [{
			data: this.state.data.values.map((row) => row.slice(0, 2).map((value, i) => {
				if (i === 0) return value * 1000
				if (value === null) return null
				return Math.round(value * 100) / 100
			})).filter((row) => row[1] !== null),
		}]
		return (<ReactHighcharts config={config} />)

	}
	renderRainfallGraph () {
		var config = this.getConfig('Rainfall (mm)')
		config.chart.type = 'column'
		config.series = [{
			data: this.state.data.values.map((row) => row.splice(1, 1) && row.map((value, i) => {
				if (i === 0) return value * 1000
				if (value === null) return null
				return Math.round(value * 100) / 100
			})).filter((row) => row[1] !== null),
		}]
		return (<ReactHighcharts config={config} />)
	}

	render () {
		return (
			<div class="container">
				<div class="row">
					<div class="col-sm-12">
						<br />
						<div class="well">
							<select
								class="form-control"
								name="udid"
								value={this.state.udid}
								onChange={this.onUDIDChange.bind(this)}>
								<option>- Choose tea plantation -</option>
								{config.stations.map((station, i) => (
									<optgroup key={`${i}`} label={station.title}>
										<option value={station.udid}>{station.subtitle}</option>
									</optgroup>
								))}
							</select>
							<br />
							<div>Dates in GMT/UTC.</div>
						</div>
						<br />
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
					{this.state.isLoading && 'Loading…'}
					{this.state.data && (
						<div>
							<div class="col-sm-12">{this.renderTemperatureGraph()}</div>
							<div class="col-sm-12">{this.renderRainfallGraph()}</div>
						</div>
					)}
					</div>
				</div>
			</div>
		)
	}
}

export default Dashboard
