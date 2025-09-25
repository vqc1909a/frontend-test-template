import { Game } from "@/services/getGames"

interface GamesListProps {
  games: Game[]
}

export const GamesList = ({ games }: GamesListProps) => {
  return (
		<div>
      <pre>
        {JSON.stringify(games, null, 2)}
      </pre>
    </div>
  )
}
