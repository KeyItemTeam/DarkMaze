package es.urjc.jer.game;

import java.util.Collection;
import java.util.Vector;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import es.urjc.jer.game.Player.Type;

@RestController
public class GameController {

	Map<Long, Player> players = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);
	Roca roca = null;
	Ronda ronda;
	Map<int[], Antorcha> antorchas = new ConcurrentHashMap<>();
	
	// Con POST creamos una ronda
	@PostMapping(value = "/ronda")
	@ResponseStatus(HttpStatus.CREATED)
	public Ronda createRonda(@RequestBody Ronda ronda) {
		this.ronda = ronda;
		return ronda;
	}

	// Con PUT actualizamos el número de ronda y reiniciamos el tiempo
	@PutMapping(value = "/ronda")
	@ResponseStatus(HttpStatus.CREATED)
	public Ronda updateRonda(@RequestBody Ronda ronda) {
		this.ronda = ronda;
		return ronda;
	}

	// Con GET recuperamos el número y el tiempo de ronda
	@GetMapping(value = "/ronda")
	public Ronda getRonda() {
		return ronda;
	}
	
	// Con GET recuperamos el número de jugadores
	@GetMapping(value = "/game")
	public Collection<Player> getPlayers() {
		return players.values();
	}

	// Con POST creamos un nuevo jugador
	@PostMapping(value = "/game")
	@ResponseStatus(HttpStatus.CREATED)
	public Player newPlayer() {
		Player player = new Player();
		long id = nextId.incrementAndGet();
		if (id == 1) {
			player.setType(Type.MINOTAURO);
		} else {
			player.setType(Type.TESEO);
		}
		player.setId(id);
		players.put(player.getId(), player);
		return player;
	}

	// Con este GET, podemos recuperar la información particular de cada uno de los
	// jugadores
	@GetMapping(value = "/game/{id}")
	public ResponseEntity<Player> getPlayer(@PathVariable long id) {
		Player player = players.get(id);
		if (player != null) {
			return new ResponseEntity<>(player, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Con este PUT actualizamos la información del jugador con ID = id
	@PutMapping(value = "/game/{id}")
	public ResponseEntity<Player> updatePlayer(@PathVariable long id, @RequestBody Player player) {
		Player savedPlayer = players.get(player.getId());
		if (savedPlayer != null) {
			players.put(id, player);
			return new ResponseEntity<>(player, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Con este DELETE borramos el jugador con ID = id
	@DeleteMapping(value = "/game/{id}")
	public ResponseEntity<Player> deleteJugador(@PathVariable long id) {
		Player savedPlayer = players.get(id);
		if (savedPlayer != null) {
			players.remove(savedPlayer.getId());
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Con POST creamos una nueva roca
	@PostMapping(value = "/roca")
	@ResponseStatus(HttpStatus.CREATED)
	public Roca createRoca(@RequestBody Roca roca) {
		this.roca = roca;
		return roca;
	}

	// Con PUT actualizamos la roca
	@PutMapping(value = "/roca")
	@ResponseStatus(HttpStatus.CREATED)
	public Roca updateRoca(@RequestBody Roca roca) {
		this.roca = roca;
		return roca;
	}

	// Con GET recuperamos la roca
	@GetMapping(value = "/roca")
	public Roca getRoca() {
		return roca;
	}

	// Con este DELETE borramos la roca
	@DeleteMapping(value = "/roca")
	public ResponseEntity<Roca> deleteRoca() {
		if (this.roca != null) {
			Roca current = this.roca;
			this.roca = null;
			return new ResponseEntity<>(current, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Con POST creamos una nueva antorcha
	@PostMapping(value = "/antorcha")
	@ResponseStatus(HttpStatus.CREATED)
	public Antorcha createAntorcha(@RequestBody Antorcha antorcha) {
		int[] pos = new int[2];
		pos[0] = antorcha.getX();
		pos[1] = antorcha.getY();
		antorchas.put(pos, antorcha);
		return antorcha;
	}

	// Con GET recuperamos la antorcha
	@GetMapping(value = "/antorchas")
	public Vector<Object> getAntorcha() {
		Vector<Object> vector = new Vector<>();
		if (!antorchas.isEmpty()) {
			Object[] array = antorchas.values().toArray();
			for (int i = 0; i < antorchas.size(); i++) {
				vector.add(array[i]);
			}
		}
		//System.out.println(vector.toString());
		return vector;
	}

	// Con este DELETE borramos la antorcha
	@DeleteMapping(value = "/antorcha/{x}/{y}")
	public ResponseEntity<Antorcha> deleteAntorcha(@PathVariable int x, @PathVariable int y) {
		int[] pos = new int[2];
		pos[0] = x;
		pos[1] = y;
		Antorcha current = antorchas.get(pos);
		if (current != null) {
			antorchas.remove(pos);
			return new ResponseEntity<>(current, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
