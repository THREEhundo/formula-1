import { useEffect, useState } from 'react'
import '/node_modules/flag-icons/css/flag-icons.min.css'
import bottas from '../assets/bottas.avif'

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
									{standings.Driver.familyName.toUpperCase()}{' '}
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
								<p>
									{Object.keys(racingTeam).map(x =>
										x ===
										standings.Driver.familyName.toLowerCase()
											? racingTeam[x]
											: ''
									)}
								</p>
								<img src={bottas} alt='' />
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

const racingTeam = {
	verstappen: 'Red Bull Racing Honda RBPT',
	perez: 'Red Bull Racing Honda RBPT',
	alonso: 'Aston Martin Aramco Mercedes',
	hamilton: 'Mercedes',
	russel: 'Mercedes',
	sainz: 'Ferrari',
	leclerc: 'Ferrari',
	norris: 'McLaren Mercedes',
	stroll: 'Aston Martin Aramco Mercedes',
	ocon: 'Alpine Renault',
	piastri: 'McLaren Mercedes',
	gasly: 'Alpine Renault',
	albon: 'Williams Mercedes',
	hulkenberg: 'Haas Ferrari',
	bottas: 'Alfa Romeo Ferrari',
	zhou: 'Alfa Romeo Ferrari',
	tsunoda: 'Alphatauri Honda RBPT',
	magnussen: 'Haas Ferrari',
	sargeant: 'Williams Mercedes',
	'de vries': 'Alphatauri Honda RBPT',
	ricciardo: 'Alphatauri Honda RBPT'
}

const driverImg = {
	verstappen: '../assets/verstappen.avif',
	perez: '../../',
	alonso: 'Aston Martin Aramco Mercedes',
	hamilton: 'Mercedes',
	russel: 'Mercedes',
	sainz: 'Ferrari',
	leclerc: 'Ferrari',
	norris: 'McLaren Mercedes',
	stroll: 'Aston Martin Aramco Mercedes',
	ocon: 'Alpine Renault',
	piastri: 'McLaren Mercedes',
	gasly: 'Alpine Renault',
	albon: 'Williams Mercedes',
	hulkenberg: 'Haas Ferrari',
	bottas: 'Alfa Romeo Ferrari',
	zhou: 'Alfa Romeo Ferrari',
	tsunoda: 'Alphatauri Honda RBPT',
	magnussen: 'Haas Ferrari',
	sargeant: 'Williams Mercedes',
	'de vries': 'Alphatauri Honda RBPT',
	ricciardo: 'Alphatauri Honda RBPT'
}

export default Leaderboard
