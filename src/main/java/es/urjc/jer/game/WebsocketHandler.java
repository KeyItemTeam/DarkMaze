package es.urjc.jer.game;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketHandler extends TextWebSocketHandler {
	
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>(); //guarda los websockets que se crean
	private ObjectMapper mapper = new ObjectMapper(); //hace posible la lectura de objetos json con jackson
	private Roca roca;
	private Player player;
	
	@Override //crea sesión cuando te conectas
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		sessions.put(session.getId(), session);
		
	}
	
	@Override //borra la sesión cuando te desconectas
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		synchronized (message) {		}
		System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		
		switch (node.get("protocolo").asText()) {
		//un case para cada tipo de mensaje y un default
		
		case "createPj_msg": //Crea la información de un jugador
			//lee el mensaje
			Player pj = new Player();
			player=pj;
			player.setX(node.get("thisposX").asInt());
			player.setY(node.get("thisposY").asInt());
			player.setDirection(node.get("thisDir").asInt());
			player.setAttacking(node.get("thisAtk").asBoolean());
			player.setRunning(node.get("thisRun").asBoolean());
			
			//le manda la respuesta al otro jugador
			ObjectNode newPjMsg = mapper.createObjectNode();
			newPjMsg.put("protocolo", "createPj_msg");
			newPjMsg.put("otherposX", player.getX());
			newPjMsg.put("otherposY", player.getY());
			newPjMsg.put("otherDir", player.getDirection());
			newPjMsg.put("otherAtk", player.isAttacking());
			newPjMsg.put("otherRun", player.isRunning());
			
			sendMessageToAllBut(newPjMsg, session);
			break;
			
		case "createRoca_msg": //Crea la roca en una determinada posición
			//lee el mensaje
			Roca pedrolo = new Roca();
			roca = pedrolo;
			roca.setX(node.get("thisposX").asInt());
			roca.setY(node.get("thisposY").asInt());
			
			//le manda la respuesta al otro jugador
			ObjectNode newRocaMsg = mapper.createObjectNode();
			newRocaMsg.put("protocolo", "createRoca_msg");
			newRocaMsg.put("otherposX", roca.getX());
			newRocaMsg.put("otherposY", roca.getY());
			sendMessageToAllBut(newRocaMsg, session);
			break;
			
		case "deleteRoca_msg": //Elimina la roca cuando su salud sea 0
			//lee el mensaje
			roca.setLife(node.get("vida").asInt());
			//le manda la respuesta al otro jugador
			ObjectNode oldRocaMsg = mapper.createObjectNode();
			oldRocaMsg.put("protocolo", "deleteRoca_msg");
			oldRocaMsg.put("vida", roca.getLife());
			sendMessageToAllBut(oldRocaMsg, session);
			if (roca.getLife() == 0) {
				roca = null; }
			break;
			
		case "createAntorcha_msg": //Crea la antorcha en una determinada posición
			//lee el mensaje
			int total = 0;
			if (total<2) {
			Antorcha torch = new Antorcha();
			torch.setX(node.get("thisposX").asInt());
			torch.setY(node.get("thisposY").asInt());
			total ++;
			
			//le manda la respuesta al otro jugador
			ObjectNode newAntorchaMsg = mapper.createObjectNode();
			newAntorchaMsg.put("protocolo", "createAntorcha_msg");
			newAntorchaMsg.put("otherposX", torch.getX());
			newAntorchaMsg.put("otherposY", torch.getY());
			sendMessageToAllBut(newAntorchaMsg, session);
			}	
			break;
		
		default:
			System.out.println("ERROR: Mensaje no soportado");
		}
		
	}
	
	private void sendMessageToAllBut (ObjectNode msg, WebSocketSession dont) throws IOException {
		for(WebSocketSession websocket : sessions.values()) {
			if(!websocket.getId().equals(dont.getId())) {
				websocket.sendMessage(new TextMessage(msg.toString()));
				System.out.println("Message sent: " + msg.toString());
			}
		}
	}
	
	private void sendMessageToAll (ObjectNode msg) throws IOException {
		for(WebSocketSession websocket : sessions.values()) {
			websocket.sendMessage(new TextMessage(msg.toString()));
			System.out.println("Message sent: " + msg.toString());
		}
	}

}
