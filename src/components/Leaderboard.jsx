import { useEffect, useState } from 'react'

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
									<span>{standings.Driver.nationality}</span>
								</p>
								<p>{standings.Constructors[0].name}</p>
							</div>
						</li>
					))}
			</ul>
		</div>
	)
}

/**
 * UseEffect -> Call a list of current driver rankings
 */

export default Leaderboard
