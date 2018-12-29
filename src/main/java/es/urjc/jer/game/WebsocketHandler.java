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
		
		case "createRoca_msg":
			//lee el mensaje
			Roca pedrolo = new Roca();
			pedrolo.setX(node.get("thisposX").asInt());
			pedrolo.setY(node.get("thisposY").asInt());
			
			//le manda la respuesta al otro jugador
			ObjectNode newRocaMsg = mapper.createObjectNode();
			newRocaMsg.put("protocolo", "createRoca_msg");
			newRocaMsg.put("otherposX", pedrolo.getX());
			newRocaMsg.put("otherposY", pedrolo.getY());
			sendMessageToAllBut(newRocaMsg, session);
			break;
			
		case "breakRoca_msg":
			//lee el mensaje
			
			//le manda la respuesta al otro jugador
			
			break;
			
		//CASES PARA GESTIONAR LAS RONDAS
			
		/*case "CREATE_RONDA":
			gameController.createRonda();
			break;
		case "UPDATE_RONDA":
			gameController.updateRonda();
			break;
		case "GET_RONDA":
			gameController.getRonda();
			break; */
			
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
