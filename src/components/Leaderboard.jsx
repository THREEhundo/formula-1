import { useEffect, useState } from 'react'
import '/node_modules/flag-icons/css/flag-icons.min.css'

const Leaderboard = () => {
	const [leaderboard, setLeaderboard] = useState()
	useEffect(() => {
		const requestOptions = {
			method: 'GET',
			redirectT: 'follow'
		}
		const table = async () =>
			await fetch(
				'http://ergast.com/api/f1/current/driverStandings.json',
				requestOptions
			)
				.then(res => res.json())
				.then(data =>
					setLeaderboard(
						data.MRData.StandingsTable.StandingsLists[0]
							.DriverStandings
					)
				)
				.catch(err => console.error(err))
		table()
	}, [])

	return (
		<div>
			<h1>Leaderboard</h1>
			<ul>
				{leaderboard &&
					leaderboard.map(standings => (
						<li key={standings.Driver.driverId}>
							<div>
								<p>
									<span>{standings.position} </span>
									{standings.Driver.givenName}{' '}
									{standings.Driver.familyName}{' '}
									<span>
										{standings.Driver.permanentNumber}{' '}
									</span>
									{nationalities[
										standings.Driver.nationality
									] ? (
										<span
											className={`fi fi-${
												nationalities[
													standings.Driver.nationality
												]
											}`}></span>
									) : (
										<span className='fi fi-flag'></span>
									)}
								</p>
								<p>{standings.Constructors[0].name}</p>
							</div>
						</li>
					))}
			</ul>
		</div>
	)
}

const nationalities = {
	Dutch: 'nl',
	Mexican: 'mx',
	Spanish: 'es',
	British: 'gb',
	Monegasque: 'mc',
	Canadian: 'ca',
	French: 'fr',
	German: 'de',
	Australian: 'au',
	Finnish: 'fi',
	Chinese: 'cn',
	Japanese: 'jp',
	Danish: 'dk',
	Thai: 'th',
	American: 'us'
}

export default Leaderboard
